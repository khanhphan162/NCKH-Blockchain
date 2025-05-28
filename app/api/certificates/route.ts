import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { transactions, userProgress } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const user = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
  });

  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

  const nftTxs = await db.query.transactions.findMany({
    where: and(
      eq(transactions.userWallet, user.walletAddress.toLowerCase()),
      eq(transactions.type, "NFT")
    ),
  });

  return NextResponse.json(nftTxs);
}
