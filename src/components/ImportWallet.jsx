
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";

// export default function ImportWallet() {
//   const [mnemonic, setMnemonic] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleImport = async () => {
//     try {
//       const cleaned = mnemonic.trim().toLowerCase().replace(/\s+/g, " ");

//       if (!ethers.utils.isValidMnemonic(cleaned)) {
//         throw new Error("Invalid mnemonic format");
//       }

//       const wallet = ethers.Wallet.fromMnemonic(cleaned);

//       // Get existing wallets from chrome.storage.local
//       const existingWallets = await new Promise((resolve) =>
//         chrome.storage.local.get(["wallets"], (res) => resolve(res.wallets || []))
//       );

//       const alreadyExists = existingWallets.some(
//         (w) => w.address.toLowerCase() === wallet.address.toLowerCase()
//       );

//       if (alreadyExists) {
//         throw new Error("Wallet already imported.");
//       }

//       const newWallet = {
//         name: `Account ${existingWallets.length + 1}`,
//         address: wallet.address,
//         mnemonic: wallet.mnemonic.phrase,
//         privateKey: wallet.privateKey,
//       };

//       const updatedWallets = [...existingWallets, newWallet];

//       // ✅ Store in chrome.storage.local
//       chrome.storage.local.set({
//         wallets: updatedWallets,
//         wallet: newWallet,
//         walletAddress: newWallet.address,
//       });

//       // ✅ Store in localStorage (for fallback or compatibility)
//       localStorage.setItem("wallets", JSON.stringify(updatedWallets));
//       localStorage.setItem("wallet", JSON.stringify(newWallet));
//       localStorage.setItem("walletAddress", newWallet.address);

//       // Navigate to wallet screen
//       navigate("/wallet", { state: { address: newWallet.address } });
//     } catch (err) {
//       console.error("Import failed:", err.message || err);
//       setError("❌ " + err.message);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Import Wallet</h1>
//         <p className="text-gray-400 mb-4 text-sm">
//           Enter your 12 or 24-word recovery phrase to restore your wallet.
//         </p>

//         <textarea
//           rows={3}
//           className="w-full bg-gray-700 p-3 rounded text-sm text-white outline-none resize-none"
//           placeholder="e.g. equip canyon accident lion lava lawn canoe dune alley medal fever narrow"
//           value={mnemonic}
//           onChange={(e) => setMnemonic(e.target.value)}
//         />

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         <button
//           onClick={handleImport}
//           className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
//         >
//           Import Wallet
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

export default function ImportWallet() {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isChromeExtension = typeof chrome !== "undefined" && chrome.storage;

  const handleImport = async () => {
    try {
      const cleaned = mnemonic.trim().toLowerCase().replace(/\s+/g, " ");

      if (!ethers.utils.isValidMnemonic(cleaned)) {
        throw new Error("Invalid mnemonic format");
      }

      const wallet = ethers.Wallet.fromMnemonic(cleaned);

      // Fetch existing wallets
      let existingWallets = [];

      if (isChromeExtension) {
        existingWallets = await new Promise((resolve) =>
          chrome.storage.local.get(["wallets"], (res) => resolve(res.wallets || []))
        );
      } else {
        const stored = localStorage.getItem("wallets");
        existingWallets = stored ? JSON.parse(stored) : [];
      }

      const alreadyExists = existingWallets.some(
        (w) => w.address.toLowerCase() === wallet.address.toLowerCase()
      );

      if (alreadyExists) {
        throw new Error("Wallet already imported.");
      }

      const newWallet = {
        name: `Account ${existingWallets.length + 1}`,
        address: wallet.address,
        mnemonic: wallet.mnemonic.phrase,
        privateKey: wallet.privateKey,
      };

      const updatedWallets = [...existingWallets, newWallet];

      // Save to storage
      if (isChromeExtension) {
        chrome.storage.local.set({
          wallets: updatedWallets,
          wallet: newWallet,
          walletAddress: newWallet.address,
        });
      }

      // Save to localStorage (always)
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      localStorage.setItem("wallet", JSON.stringify(newWallet));
      localStorage.setItem("walletAddress", newWallet.address);

      // Navigate
      navigate("/wallet", { state: { address: newWallet.address } });
    } catch (err) {
      console.error("Import failed:", err.message || err);
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Import Wallet</h1>
        <p className="text-gray-400 mb-4 text-sm">
          Enter your 12 or 24-word recovery phrase to restore your wallet.
        </p>

        <textarea
          rows={3}
          className="w-full bg-gray-700 p-3 rounded text-sm text-white outline-none resize-none"
          placeholder="e.g. equip canyon accident lion lava lawn canoe dune alley medal fever narrow"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleImport}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
        >
          Import Wallet
        </button>
      </div>
    </div>
  );
}
