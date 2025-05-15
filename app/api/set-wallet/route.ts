import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId, walletAddress } = await req.json();

  await db.update(userProgress)
    .set({ walletAddress })
    .where(eq(userProgress.userId, userId));

  return new Response("ok");
}
