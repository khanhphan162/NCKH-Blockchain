"use client";

import { useEffect, useState } from "react";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { transactions, userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

type NFT = {
  amount: string;
  uri: string;
  txHash: string;
  blockNumber: number;
  timestamp: string;
};

const CertificateCard = ({ nft }: { nft: NFT }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!nft.uri) return;
      try {
        const res = await fetch(nft.uri);
        const data = await res.json();
        if (data?.image) {
          setImageUrl(data.image);
        }
      } catch (error) {
        console.error("❌ Failed to fetch NFT metadata:", error);
      }
    };
    fetchImage();
  }, [nft.uri]);

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white mb-4">
      <h2 className="font-medium mb-1">Certificate #{nft.amount}</h2>

<p className="text-xs text-green-600 mb-2">
  View on{" "}
  <a
    href={`https://testnets.opensea.io/assets/sepolia/0xceb6864b91169ec3a36ce0d42917c04d9ac15839/${nft.amount}`}
    target="_blank"
    rel="noopener noreferrer"
    className="underline"
  >
    OpenSea
  </a>
</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Certificate ${nft.amount}`}
          className="w-full rounded-md border mb-2"
        />
      )}

      <p className="text-xs text-blue-600 truncate">
        Tx:{" "}
        <a
          href={`https://sepolia.etherscan.io/tx/${nft.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {nft.txHash}
        </a>
      </p>

      <p className="text-xs text-gray-500">
        Minted at block {nft.blockNumber} —{" "}
        {new Date(nft.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default function CertificatesPage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      const res = await fetch("/api/certificates"); // 🔄 Bạn cần có API route này
      const data = await res.json();
      setNfts(data);
      setLoading(false);
    };
    fetchNFTs();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Certificates</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && nfts.length === 0 && (
        <p className="text-gray-500">No certificates found.</p>
      )}
      {nfts.map((nft) => (
        <CertificateCard key={nft.txHash} nft={nft} />
      ))}
    </div>
  );
}
