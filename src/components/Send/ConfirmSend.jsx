// import React, { useState } from "react";
// import { ChevronLeft } from "lucide-react";
// import { useNetwork } from "../../Context/NetworkContext";
// import { ethers } from "ethers";

// export default function ConfirmSend({ onBack, txData }) {
//   const { selectedNetwork } = useNetwork();
//   const [sending, setSending] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleConfirm = async () => {
//     try {
//       setSending(true);
//       setMessage(null);

//       const { to, amount } = txData;
//       const wallet = JSON.parse(localStorage.getItem("wallet"));
//       if (!wallet || !wallet.privateKey || !to || !amount) {
//         throw new Error("Missing data to send transaction.");
//       }

//       const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.rpcUrl);
//       const signer = new ethers.Wallet(wallet.privateKey, provider);

//       const tx = await signer.sendTransaction({
//         to,
//         value: ethers.utils.parseEther(amount),
//       });

//       await tx.wait();
//       setMessage("✅ Transaction successful!");
//     } catch (err) {
//       console.error("Send Error:", err);
//       setMessage(`❌ ${err.message}`);
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 text-white z-50 max-w-md mx-auto flex flex-col min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-center p-4 border-b border-gray-700 relative">
//         <button onClick={onBack}>
//           <ChevronLeft className="absolute left-4 w-5 h-5 text-gray-400" />
//         </button>
//         <h1 className="text-lg font-medium">Confirm</h1>
//       </div>

//       {/* Details */}
//       <div className="p-6 space-y-4 flex-1 overflow-y-auto">
//         <div>
//           <div className="text-sm text-gray-400">From</div>
//           <div className="text-white font-medium">
//             {JSON.parse(localStorage.getItem("wallet"))?.address}
//           </div>
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
//           <div className="text-white font-medium">{txData.amount} {selectedNetwork.symbol}</div>
//         </div>

//         {message && (
//           <div className={`text-sm mt-4 ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
//             {message}
//           </div>
//         )}
//       </div>

//       {/* Buttons */}
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

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNetwork } from "../../Context/NetworkContext";
import { useTransactions } from "../../Context/TransactionContext";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function ConfirmSend({ onBack, txData }) {
  const { selectedNetwork } = useNetwork();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const handleConfirm = async () => {
    try {
      setSending(true);
      setMessage(null);

      const { to, amount } = txData;
      const wallet = JSON.parse(localStorage.getItem("wallet"));
      if (!wallet || !wallet.privateKey || !to || !amount) {
        throw new Error("Missing data to send transaction.");
      }

      const provider = new ethers.providers.JsonRpcProvider(
        selectedNetwork.rpcUrl
      );
      const signer = new ethers.Wallet(wallet.privateKey, provider);

      const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();

      // ✅ Save to localStorage as transaction history
      const txHistory = JSON.parse(localStorage.getItem("transactions")) || [];
      txHistory.push({
        from: wallet.address,
        to: to,
        amount: amount,
        symbol: selectedNetwork.symbol,
        network: selectedNetwork.name,
        date: new Date().toLocaleString(),
        status: "Confirmed",
        type: "Send",
      });
      // localStorage.setItem("transactions", JSON.stringify(txHistory));

      addTransaction({
        from: wallet.address,
        to,
        amount,
        symbol: selectedNetwork.symbol,
        network: selectedNetwork.name,
        date: new Date().toLocaleString(),
        status: "Confirmed",
        type: "Send",
      });

      setMessage("✅ Transaction successful!");

      // Navigate after short delay
      setTimeout(() => {
        navigate("/wallet");
      }, 1500);
      
    } catch (err) {
      console.error("Send Error:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setSending(false);
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

      {/* Details */}
      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div>
          <div className="text-sm text-gray-400">From</div>
          <div className="text-white font-medium">
            {JSON.parse(localStorage.getItem("wallet"))?.address}
          </div>
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

        {message && (
          <div
            className={`text-sm mt-4 ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Footer Buttons */}
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
