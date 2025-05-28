import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { transactions, userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function TransactionsPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-4">Unauthorized</div>;
  }

  // Tìm user theo userId trong bảng userProgress
  const user = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
  });

  if (!user) {
    return <div className="p-4">No transactions found</div>;
  }

  const txs = await db.query.transactions.findMany({
    where: eq(transactions.userWallet, user.walletAddress.toLowerCase()),
    orderBy: (tx, { desc }) => [desc(tx.blockNumber)],
  });

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
//       <div className="space-y-4">
//         {txs.map((tx) => (
//           <div
//             key={tx.txHash}
//             className="border rounded-md p-4 shadow-sm bg-white"
//           >
//             <div className="text-sm text-gray-600">
//               <span className="font-medium">{tx.type}</span> •{" "}
//               <span>{tx.amount}</span>
//             </div>
//             <div className="text-xs text-gray-500 mt-1">
//               Tx Hash: {tx.txHash}          • Block: {tx.blockNumber}
//             </div>
//             <div className="text-xs text-gray-400">
//               {new Date(tx.timestamp).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

  return (
  <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
    <div className="space-y-4">
      {txs.map((tx) => (
        <div
          key={tx.txHash}
          className="border rounded-md p-4 shadow-sm bg-white"
        >
          <div className="text-sm text-gray-600">
            <span className="font-medium">{tx.type}</span> •{" "}
            <span>
              {tx.type === "REWARD"
                ? `${(parseFloat(tx.amount) / 1e18).toFixed(2)} LTK`
                : `NFT #${tx.amount}`}
            </span>
          </div>
           <div className="text-xs text-gray-500 mt-1">
            Tx Hash:{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {tx.txHash}...{tx.txHash.slice(-4)}
            </a>{" "}
            • Block: {tx.blockNumber}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(tx.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
