import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import {ERC20_ABI} from '../erc20abi'
import { NextResponse } from "next/server";

const ERC20_ADDRESS = "0xbbfb2aa40ee6c2a1fdfdb9dd528f78f607d8effe";

export async function POST(req: Request) {
  const { userAddress } = await req.json();

  const admin = privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY as `0x${string}`);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http('https://ethereum-sepolia.rpc.subquery.network/public'),
  });

  const walletClient = createWalletClient({
    account: admin,
    chain: sepolia,
    transport: http('https://ethereum-sepolia.rpc.subquery.network/public'),
  });

  console.log("Transferring to:", userAddress)
  try {
    const txHash = await walletClient.writeContract({
      address: ERC20_ADDRESS,
      abi: ERC20_ABI,
      functionName: "rewardLesson",
      args: [userAddress as `0x${string}`],
    });
    console.log("✅ Transaction sent:", txHash);
    return NextResponse.json({ txHash });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Transfer failed" }, { status: 500 });
  }
}
