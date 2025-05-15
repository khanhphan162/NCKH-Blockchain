import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import {ERC20_ABI} from '../erc20abi'
import { NextResponse } from "next/server";

const ERC20_ADDRESS = "0xE593c6aD174F2bE65dF1B314444c35b414e53421";

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

  const amount = BigInt(20 * 1e18);
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
