


// import React, { useState } from "react";
// import { ChevronLeft, CheckCircle } from "lucide-react";
// import { useNetwork } from "../../Context/NetworkContext";
// import { useTransactions } from "../../Context/TransactionContext";
// import { useBalance } from "../../Context/BalanceContext";

// export default function ConfirmSend({ onBack, txData, onSuccess }) {
//   const { selectedNetwork } = useNetwork();
//   const { addTransaction } = useTransactions();
//   const { fetchBalance } = useBalance();

//   const [sending, setSending] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [txHash, setTxHash] = useState(null);

//   const getSelectedWallet = () => {
//     if (typeof chrome !== "undefined" && chrome.storage?.local) {
//       return new Promise((resolve) => {
//         chrome.storage.local.get(["selectedWallet"], (result) => {
//           resolve(result.selectedWallet);
//         });
//       });
//     } else {
//       return Promise.resolve(
//         JSON.parse(localStorage.getItem("selectedWallet"))
//       );
//     }
//   };

//   const handleConfirm = async () => {
//     setSending(true);
//     setMessage(null);
//     setTxHash(null);

//     try {
//       const selectedWallet = await getSelectedWallet();
//       if (!selectedWallet?.address) {
//         setMessage("❌ No selected wallet found.");
//         setSending(false);
//         return;
//       }

//       const messagePayload = {
//         type: "SEND_TRANSACTION",
//         from: selectedWallet.address,
//         to: txData.to,
//         amount: txData.amount,
//         rpcUrl: selectedNetwork.rpcUrl,
//       };

//       const isExtension =
//         typeof chrome !== "undefined" &&
//         chrome.runtime?.sendMessage &&
//         chrome.runtime?.id;

//       if (isExtension) {
//         chrome.runtime.sendMessage(messagePayload, (response) => {
//           if (chrome.runtime.lastError) {
//             setMessage(`❌ ${chrome.runtime.lastError.message}`);
//             setSending(false);
//             return;
//           }

//           handleResponse(response, selectedWallet.address);
//         });
//       } else {
//         // Simulate response for browser fallback/testing
//         setTimeout(() => {
//           const fakeResponse = { success: true, hash: "0xFAKE_HASH_123" };
//           handleResponse(fakeResponse, selectedWallet.address);
//         }, 1000);
//       }
//     } catch (err) {
//       console.error("Send Error:", err);
//       setMessage(`❌ ${err.message}`);
//       setSending(false);
//     }
//   };

//   const handleResponse = async (response, fromAddress) => {
//     setSending(false);

//     if (response?.success) {
//       const txEntry = {
//         from: fromAddress,
//         to: txData.to,
//         amount: txData.amount,
//         symbol: selectedNetwork.symbol,
//         network: selectedNetwork.name,
//         date: new Date().toLocaleString(),
//         status: "Confirmed",
//         type: "Send",
//         hash: response.hash || "",
//       };

//       const txHistory =
//         JSON.parse(localStorage.getItem("transactions")) || [];
//       txHistory.push(txEntry);
//       localStorage.setItem("transactions", JSON.stringify(txHistory));
//       addTransaction(txEntry);

//       setTxHash(response.hash || "N/A");
//       setMessage("✅ Transaction successful!");

//       // ✅ Update balance on global context and main UI
//       await fetchBalance();

//       // Trigger UI update/callback
//       if (typeof onSuccess === "function") {
//         setTimeout(() => onSuccess(), 1000);
//       }
//     } else {
//       setMessage(`❌ ${response?.error || "Transaction failed."}`);
//     }
//   };

//   const [fromAddress] = useState(() => {
//     const selected = JSON.parse(localStorage.getItem("selectedWallet"));
//     return selected?.address || "N/A";
//   });

//   return (
//     <div className="fixed inset-0 bg-gray-900 text-white z-50 max-w-md mx-auto flex flex-col min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-center p-4 border-b border-gray-700 relative">
//         <button onClick={onBack}>
//           <ChevronLeft className="absolute left-4 w-5 h-5 text-gray-400" />
//         </button>
//         <h1 className="text-lg font-medium">Confirm</h1>
//       </div>

//       {/* Body */}
//       <div className="p-6 space-y-4 flex-1 overflow-y-auto">
//         <div>
//           <div className="text-sm text-gray-400">From</div>
//           <div className="text-white font-medium">{fromAddress}</div>
//         </div>

//         <div>
//           <div className="text-sm text-gray-400">To</div>
//           <div className="text-white font-medium">{txData.to}</div>
//         </div>

//         <div>
//           <div className="text-sm text-gray-400">Network</div>
//           <div className="text-white font-medium">{selectedNetwork.name}</div>
//         </div>

//         <div>
//           <div className="text-sm text-gray-400">Amount</div>
//           <div className="text-white font-medium">
//             {txData.amount} {selectedNetwork.symbol}
//           </div>
//         </div>

//         {/* ✅ Success Message with Tx Hash */}
//         {txHash && (
//           <div className="mt-4 p-3 bg-green-600/10 text-green-400 rounded-lg border border-green-700 space-y-1">
//             <div className="flex items-center gap-2">
//               <CheckCircle size={18} />
//               <span>Transaction successful!</span>
//             </div>
//             <div className="text-xs break-all text-green-300">
//               Tx Hash: {txHash}
//             </div>
//           </div>
//         )}

//         {/* ✅ Error/Status Message */}
//         {message && !txHash && (
//           <div
//             className={`text-sm mt-4 ${message.startsWith("✅") ? "text-green-400" : "text-red-400"
//               }`}
//           >
//             {message}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="p-4 flex space-x-3 bg-gray-900">
//         <button
//           onClick={onBack}
//           disabled={sending}
//           className="flex-1 py-3 px-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleConfirm}
//           disabled={sending}
//           className="flex-1 py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
//         >
//           {sending ? "Sending..." : "Confirm"}
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useNetwork } from "../../Context/NetworkContext";
import { useTransactions } from "../../Context/TransactionContext";
import { useBalance } from "../../Context/BalanceContext";

export default function ConfirmSend({ onBack, txData, onSuccess }) {
  const { selectedNetwork } = useNetwork();
  const { addTransaction } = useTransactions();
  const { fetchBalance } = useBalance();

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [fromAddress, setFromAddress] = useState("N/A");

  // 🔄 Get selected wallet (from chrome.storage or localStorage)
  const getSelectedWallet = () => {
    return new Promise((resolve) => {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        chrome.storage.local.get(["selectedWallet"], (result) => {
          resolve(result.selectedWallet || null);
        });
      } else {
        const local = JSON.parse(localStorage.getItem("selectedWallet"));
        resolve(local || null);
      }
    });
  };

  // 🧠 Load wallet address on mount
  useEffect(() => {
    (async () => {
      const selected = await getSelectedWallet();
      if (selected?.address) setFromAddress(selected.address);
    })();
  }, []);

  const handleConfirm = async () => {
    setSending(true);
    setMessage(null);
    setTxHash(null);

    try {
      const selectedWallet = await getSelectedWallet();
      if (!selectedWallet?.address) {
        setMessage("❌ No selected wallet found.");
        setSending(false);
        return;
      }

      const payload = {
        type: "SEND_TRANSACTION",
        from: selectedWallet.address,
        to: txData.to,
        amount: txData.amount,
        rpcUrl: selectedNetwork.rpcUrl,
      };

      const isExtension =
        typeof chrome !== "undefined" &&
        chrome.runtime?.sendMessage &&
        chrome.runtime?.id;

      if (isExtension) {
        chrome.runtime.sendMessage(payload, (response) => {
          if (chrome.runtime.lastError) {
            setMessage(`❌ ${chrome.runtime.lastError.message}`);
            setSending(false);
            return;
          }
          handleResponse(response, selectedWallet.address);
        });
      } else {
        // Web fallback simulation
        setTimeout(() => {
          const fakeResponse = { success: true, hash: "0xFAKE_HASH_123456" };
          handleResponse(fakeResponse, selectedWallet.address);
        }, 1000);
      }
    } catch (err) {
      console.error("Send Error:", err);
      setMessage(`❌ ${err.message}`);
      setSending(false);
    }
  };

  const handleResponse = async (response, fromAddress) => {
    setSending(false);

    if (response?.success) {
      const txEntry = {
        from: fromAddress,
        to: txData.to,
        amount: txData.amount,
        symbol: selectedNetwork.symbol,
        network: selectedNetwork.name,
        date: new Date().toLocaleString(),
        status: "Confirmed",
        type: "Send",
        hash: response.hash || "",
      };

      // Save to localStorage & context
      const txHistory = JSON.parse(localStorage.getItem("transactions")) || [];
      txHistory.push(txEntry);
      localStorage.setItem("transactions", JSON.stringify(txHistory));
      addTransaction(txEntry);

      setTxHash(response.hash || "N/A");
      setMessage("✅ Transaction successful!");

      await fetchBalance();

      if (typeof onSuccess === "function") {
        setTimeout(() => onSuccess(), 1000);
      }
    } else {
      setMessage(`❌ ${response?.error || "Transaction failed."}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-50 max-w-md mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-700 relative">
        <button onClick={onBack}>
          <ChevronLeft className="absolute left-4 w-5 h-5 text-gray-400" />
        </button>
        <h1 className="text-lg font-medium">Confirm</h1>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div>
          <div className="text-sm text-gray-400">From</div>
          <div className="text-white font-medium">{fromAddress}</div>
        </div>

        <div>
          <div className="text-sm text-gray-400">To</div>
          <div className="text-white font-medium">{txData.to}</div>
        </div>

        <div>
          <div className="text-sm text-gray-400">Network</div>
          <div className="text-white font-medium">{selectedNetwork.name}</div>
        </div>

        <div>
          <div className="text-sm text-gray-400">Amount</div>
          <div className="text-white font-medium">
            {txData.amount} {selectedNetwork.symbol}
          </div>
        </div>

        {/* ✅ Success Message */}
        {txHash && (
          <div className="mt-4 p-3 bg-green-600/10 text-green-400 rounded-lg border border-green-700 space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} />
              <span>Transaction successful!</span>
            </div>
            <div className="text-xs break-all text-green-300">
              Tx Hash: {txHash}
            </div>
          </div>
        )}

        {/* ❌ Error or Info Message */}
        {message && !txHash && (
          <div
            className={`text-sm mt-4 ${message.startsWith("✅")
              ? "text-green-400"
              : "text-red-400"
              }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 flex space-x-3 bg-gray-900">
        <button
          onClick={onBack}
          disabled={sending}
          className="flex-1 py-3 px-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={sending}
          className="flex-1 py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
        >
          {sending ? "Sending..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
