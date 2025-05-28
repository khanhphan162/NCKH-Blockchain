import { ethers } from "ethers";
import dotenv from "dotenv";
import db from "@/db/drizzle";
import { transactions, userProgress } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// Load environment variables
dotenv.config();

console.log("✅ DATABASE_URL:", process.env.DATABASE_URL);

// RPC Provider
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Contract & ABI
const rewardAddress = process.env.LEARNING_REWARD_ADDRESS!;
const rewardAbi = [
  "event LessonRewarded(address indexed to, uint256 amount)",
  "event CourseCompleted(address indexed to, uint256 tokenId, string uri)"
];

const rewardInterface = new ethers.Interface(rewardAbi);
const rewardContract = new ethers.Contract(rewardAddress, rewardAbi, provider);

// Block scan config
const BATCH_SIZE = 100;
let currentFromBlock = 8418572;

async function scanBatch() {
  const latestBlock = await provider.getBlockNumber();
  const toBlock = Math.min(currentFromBlock + BATCH_SIZE - 1, latestBlock);

  console.log(`🔍 Scanning blocks ${currentFromBlock} → ${toBlock}`);

  // --- 1. LessonRewarded ---
  const rewardLogs = await rewardContract.queryFilter("LessonRewarded", currentFromBlock, toBlock);
  for (const log of rewardLogs) {
    const txHash = log.transactionHash;

    //  Skip if txHash already exists
    const existing = await db.query.transactions.findFirst({
      where: (t, { eq }) => eq(t.txHash, txHash),
    });
    if (existing) continue;

    const decoded = rewardInterface.decodeEventLog("LessonRewarded", log.data, log.topics);
    const to = decoded.to as string;
    const amount = decoded.amount as bigint;
    const points = Number(amount) / 1e18;

    console.log("🎉 LessonRewarded:", to, points.toString());

    await db.insert(transactions).values({
      userWallet: to.toLowerCase(),
      type: "REWARD",
      txHash,
      blockNumber: Number(log.blockNumber),
      amount: amount.toString(),
      timestamp: new Date().toISOString(),
    });


    const user = await db.query.userProgress.findFirst({
      where: eq( sql`lower(${userProgress.walletAddress})`, to.toLowerCase()),
    });

     if (user) {
      await db
        .update(userProgress)
        .set({ points: user.points + points})
        .where(eq(userProgress.userId, user.userId));
    } else {
      console.log(`⚠️ No user found with wallet address ${to}`);
    }


  }

  // --- 2. CourseCompleted ---
  const courseLogs = await rewardContract.queryFilter("CourseCompleted", currentFromBlock, toBlock);
  for (const log of courseLogs) {
    const txHash = log.transactionHash;

    // Skip if txHash already exists
    const existing = await db.query.transactions.findFirst({
      where: (t, { eq }) => eq(t.txHash, txHash),
    });
    if (existing) continue;

    const decoded = rewardInterface.decodeEventLog("CourseCompleted", log.data, log.topics);
    const to = decoded.to as string;
    const tokenId = decoded.tokenId as bigint;
    const uri = decoded.uri as string;

    console.log("🏁 CourseCompleted (NFT Mint):", to, tokenId.toString(), uri);

    await db.insert(transactions).values({
      userWallet: to.toLowerCase(),
      type: "NFT",
      txHash,
      blockNumber: Number(log.blockNumber),
      amount: tokenId.toString(),
      timestamp: new Date().toISOString(),
      uri: uri,
    });

    const user = await db.query.userProgress.findFirst({
      where: eq(  sql`lower(${userProgress.walletAddress})`, to.toLowerCase()),
    });

    if (user) {
      await db
        .update(userProgress)
        .set({ points: 0 })
        .where(eq(userProgress.userId, user.userId));

      console.log(`🔁 Reset points of ${user.userId} (${to}) to 0`);
    } else {
      console.log(`⚠️ No user found with wallet address ${to}`);
    }

  }

  currentFromBlock = toBlock + 1;
}


async function start() {
  console.log("🚀 Starting block scanner...");
  await scanBatch();

  setInterval(async () => {
    try {
      await scanBatch();
    } catch (e) {
      console.error("❌ Scan error:", e);
    }
  }, 30_000);
}

start().catch((e) => console.error("❌ Startup error:", e));