import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { NextResponse } from "next/server";
import {ERC20_ABI} from '../erc20abi'
import { z } from "zod";

const CONTRACT_ADDRESS = "0xbbfb2aa40ee6c2a1fdfdb9dd528f78f607d8effe";

export async function POST(req: Request) {
  const body = await req.json();
  const schema = z.object({
    userAddress: z.string().startsWith("0x"),
    uri: z.string(),
  });

  const parse = schema.safeParse(body);
  if (!parse.success) {
    return new Response("Invalid input", { status: 400 });
  }

  const { userAddress, uri } = parse.data;

  const admin = privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY as `0x${string}`);


  const client = createWalletClient({
    account: admin,
    chain: sepolia,
    transport: http('https://ethereum-sepolia.rpc.subquery.network/public'),
  });
  console.log("erc20addres>>>>>>>", CONTRACT_ADDRESS);
  try {
    const txHash = await client.writeContract({
      address: CONTRACT_ADDRESS,
      abi: ERC20_ABI,
      functionName: "completeCourse",
      args: [userAddress as `0x${string}`, uri],
    });

    return NextResponse.json({ txHash });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Minting failed" }, { status: 500 });
  }
}
