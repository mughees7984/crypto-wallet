


// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { useNavigate } from "react-router-dom";
// import WalletCreated from "../components/WalletCreated";

// export default function CreateWallet() {
//   const [walletInfo, setWalletInfo] = useState(null);
//   const [mnemonicInput, setMnemonicInput] = useState("");
//   const [showImport, setShowImport] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Save wallet using chrome.storage.local
//   const saveWallet = async (walletObj) => {
//     const existing = await new Promise((resolve) =>
//       chrome.storage.local.get(["wallets"], (res) => resolve(res.wallets || []))
//     );

//     const accountName = `Account ${existing.length + 1}`;
//     const newWallet = {
//       name: accountName,
//       ...walletObj,
//     };

//     const updatedWallets = [...existing, newWallet];

//     chrome.storage.local.set({
//       wallets: updatedWallets,
//       wallet: newWallet, // active wallet
//       walletAddress: newWallet.address,
//     });

//     setWalletInfo(newWallet);
//   };

//   // 👉 Create a new wallet
//   const createNewWallet = () => {
//     const wallet = ethers.Wallet.createRandom();

//     const walletObj = {
//       address: wallet.address,
//       mnemonic: wallet.mnemonic.phrase,
//       privateKey: wallet.privateKey,
//     };

//     saveWallet(walletObj);
//   };

//   // 👉 Import existing wallet
//   const importWallet = async () => {
//     try {
//       const cleaned = mnemonicInput.trim().toLowerCase().replace(/\s+/g, " ");
//       if (!ethers.utils.isValidMnemonic(cleaned)) {
//         alert("❌ Invalid recovery phrase.");
//         return;
//       }

//       const wallet = ethers.Wallet.fromMnemonic(cleaned);

//       const existing = await new Promise((resolve) =>
//         chrome.storage.local.get(["wallets"], (res) => resolve(res.wallets || []))
//       );

//       const alreadyExists = existing.some((w) => w.address === wallet.address);
//       if (alreadyExists) {
//         alert("❌ Wallet already exists.");
//         return;
//       }

//       const walletObj = {
//         address: wallet.address,
//         mnemonic: wallet.mnemonic.phrase,
//         privateKey: wallet.privateKey,
//       };

//       saveWallet(walletObj);
//     } catch (error) {
//       alert("❌ Failed to import wallet. Please check your phrase.");
//     }
//   };

//   // 👉 Continue to main UI
//   const handleContinue = () => {
//     navigate("/wallet", { state: { address: walletInfo.address } });
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
//         <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
//           {!walletInfo ? (
//             <>
//               <h1 className="text-2xl font-bold mb-4">
//                 {showImport ? "Import Wallet" : "Create a New Wallet"}
//               </h1>

//               {!showImport ? (
//                 <>
//                   <p className="text-gray-400 mb-6">
//                     This will generate a new wallet with a secret recovery phrase.
//                   </p>
//                   <button
//                     onClick={createNewWallet}
//                     className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white font-semibold mb-4"
//                   >
//                     Create New Wallet
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-gray-400 mb-4">
//                     Enter your recovery phrase (12 or 24 words) to import your wallet.
//                   </p>
//                   <textarea
//                     rows="3"
//                     className="w-full p-2 rounded bg-gray-700 text-sm text-white mb-4"
//                     placeholder="e.g. equip canyon accident lion lava lawn canoe dune alley medal fever narrow"
//                     value={mnemonicInput}
//                     onChange={(e) => setMnemonicInput(e.target.value)}
//                   />
//                   <button
//                     onClick={importWallet}
//                     className="bg-green-600 hover:bg-green-700 w-full py-2 rounded text-white font-semibold mb-4"
//                   >
//                     Import Wallet
//                   </button>
//                 </>
//               )}

//               <p
//                 onClick={() => setShowImport(!showImport)}
//                 className="text-sm text-blue-400 text-center cursor-pointer hover:underline"
//               >
//                 {showImport
//                   ? "← Back to Create New Wallet"
//                   : "Already have a wallet? Import"}
//               </p>
//             </>
//           ) : (
//             <WalletCreated walletInfo={walletInfo} onContinue={handleContinue} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import WalletCreated from "../components/WalletCreated";

// 📦 Helper to get/set storage depending on environment
const storage = {
  async get(key) {
    if (window.chrome?.storage?.local) {
      return new Promise((resolve) =>
        chrome.storage.local.get([key], (res) => resolve(res[key]))
      );
    } else {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }
  },

  async set(obj) {
    if (window.chrome?.storage?.local) {
      return new Promise((resolve) =>
        chrome.storage.local.set(obj, resolve)
      );
    } else {
      for (const key in obj) {
        localStorage.setItem(key, JSON.stringify(obj[key]));
      }
    }
  },
};

export default function CreateWallet() {
  const [walletInfo, setWalletInfo] = useState(null);
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [showImport, setShowImport] = useState(false);
  const navigate = useNavigate();

  // ✅ Save wallet to storage
  const saveWallet = async (walletObj) => {
    const existing = (await storage.get("wallets")) || [];

    const accountName = `Account ${existing.length + 1}`;
    const newWallet = {
      name: accountName,
      ...walletObj,
    };

    const updatedWallets = [...existing, newWallet];

    await storage.set({
      wallets: updatedWallets,
      wallet: newWallet,
      walletAddress: newWallet.address,
    });

    setWalletInfo(newWallet);
  };

  // 🎯 Create a new wallet
  const createNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    const walletObj = {
      address: wallet.address,
      mnemonic: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey,
    };

    saveWallet(walletObj);
  };

  // 🎯 Import existing wallet
  const importWallet = async () => {
    try {
      const cleaned = mnemonicInput.trim().toLowerCase().replace(/\s+/g, " ");
      if (!ethers.utils.isValidMnemonic(cleaned)) {
        alert("❌ Invalid recovery phrase.");
        return;
      }

      const wallet = ethers.Wallet.fromMnemonic(cleaned);
      const existing = (await storage.get("wallets")) || [];

      const alreadyExists = existing.some((w) => w.address === wallet.address);
      if (alreadyExists) {
        alert("❌ Wallet already exists.");
        return;
      }

      const walletObj = {
        address: wallet.address,
        mnemonic: wallet.mnemonic.phrase,
        privateKey: wallet.privateKey,
      };

      saveWallet(walletObj);
    } catch (error) {
      alert("❌ Failed to import wallet. Please check your phrase.");
    }
  };

  const handleContinue = () => {
    navigate("/wallet", { state: { address: walletInfo.address } });
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          {!walletInfo ? (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {showImport ? "Import Wallet" : "Create a New Wallet"}
              </h1>

              {!showImport ? (
                <>
                  <p className="text-gray-400 mb-6">
                    This will generate a new wallet with a secret recovery phrase.
                  </p>
                  <button
                    onClick={createNewWallet}
                    className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white font-semibold mb-4"
                  >
                    Create New Wallet
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-400 mb-4">
                    Enter your recovery phrase (12 or 24 words) to import your wallet.
                  </p>
                  <textarea
                    rows="3"
                    className="w-full p-2 rounded bg-gray-700 text-sm text-white mb-4"
                    placeholder="e.g. equip canyon accident lion lava lawn canoe dune alley medal fever narrow"
                    value={mnemonicInput}
                    onChange={(e) => setMnemonicInput(e.target.value)}
                  />
                  <button
                    onClick={importWallet}
                    className="bg-green-600 hover:bg-green-700 w-full py-2 rounded text-white font-semibold mb-4"
                  >
                    Import Wallet
                  </button>
                </>
              )}

              <p
                onClick={() => setShowImport(!showImport)}
                className="text-sm text-blue-400 text-center cursor-pointer hover:underline"
              >
                {showImport
                  ? "← Back to Create New Wallet"
                  : "Already have a wallet? Import"}
              </p>
            </>
          ) : (
            <WalletCreated walletInfo={walletInfo} onContinue={handleContinue} />
          )}
        </div>
      </div>
    </div>
  );
}
