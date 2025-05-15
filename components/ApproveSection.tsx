"use client";
import { toast } from "sonner";
import { BrowserProvider, Contract } from "ethers";

export const ApproveSection = () => {
  const requestApproval = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new Contract(
      "0x6F80b76a01431879e7c0CeFF2C77DFAFDF3f26Bd",
      ["function approve(address spender, uint256 amount) public returns (bool)"],
      signer
    );

    try {
      const tx = await contract.approve(
        "0xE593c6aD174F2bE65dF1B314444c35b414e53421",
        100000000000000000000000000000000n
      );
      await tx.wait();
      toast.success("Approval successful!");
      const walletAddress = await signer.getAddress();
      await fetch("/api/reward/complete-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress: walletAddress,
          uri: "https://gateway.pinata.cloud/ipfs/bafkreia2mkr5gtx3xoaupkprqgoy2cotzmbn73z5ler7wgge66cioj5ybm", 
        }),
//https://gateway.pinata.cloud/ipfs/bafybeib2hvtiguxnd2shxckbdk2fkzzbtjvb765nqm2auuv6gbyhcrzzsi

      });
      toast.success("NFT minted!");

    } catch (err) {
      toast.error("Approval failed.");
    }
  };

  return (
    <div className="text-center text-green-500 font-bold text-xl">
      Congratulations! You have completed the course.
      <div className="mt-4">
        <button
          onClick={requestApproval}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Approve ERC20 Token
        </button>
      </div>
    </div>
  );
};
