// "use client";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>;
      isMetaMask?: boolean;
    };
  }
}


// import { useEffect, useState } from "react";
// import { useSession } from "@clerk/nextjs";
// import { toast } from "sonner";

// export const ConnectWalletModal = () => {
//   const { isSignedIn, session } = useSession();
//   const userId = session?.user.id;

//   const [hasWallet, setHasWallet] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!isSignedIn || !userId) return;

//     fetch(`/api/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setHasWallet(!!data.walletAddress);
//       })
//       .catch(() => {
//         toast.error("Lỗi khi kiểm tra ví.");
//       });
//   }, [isSignedIn, userId]);

//   const handleConnectWallet = async () => {
//     if (!window.ethereum) {
//       toast.error("Vui lòng cài đặt MetaMask!");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });

//       const walletAddress = accounts[0];

//       const res = await fetch("/api/set-wallet", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ walletAddress, userId }), 
//       });

//       if (!res.ok) {
//         throw new Error("Lỗi lưu địa chỉ ví");
//       }

//       setHasWallet(true);
//       toast.success("Kết nối ví thành công!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Kết nối ví thất bại.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (hasWallet) return null;

//   return (
//     <div className="p-6 border rounded-lg shadow-md bg-white max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Kết nối ví để bắt đầu</h2>
//       <button
//         onClick={handleConnectWallet}
//         disabled={isLoading}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {isLoading ? "Đang kết nối..." : "Kết nối MetaMask"}
//       </button>
//     </div>
//   );
// };



"use client";

import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { toast } from "sonner";

export const ConnectWalletButton = () => {
  const { isSignedIn, session } = useSession();
  const userId = session?.user.id;

  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !userId) return;

    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setHasWallet(!!data.walletAddress && data.walletAddress !== "0x");
      })
      .catch(() => {
        toast.error("Lỗi khi kiểm tra ví.");
      });
  }, [isSignedIn, userId]);

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Vui lòng cài đặt MetaMask!");
      return;
    }

    try {
      setIsLoading(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAddress = accounts[0];

      const res = await fetch("/api/set-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, userId }),
      });

      if (!res.ok) throw new Error("Lỗi lưu địa chỉ ví");

      setHasWallet(true);
      toast.success("Kết nối ví thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Kết nối ví thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSignedIn || hasWallet) return null;

  return (
    <button
      onClick={handleConnectWallet}
      disabled={isLoading}
      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Đang kết nối..." : "Kết nối ví"}
    </button>
  );
};
