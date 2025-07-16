

// import React, { useEffect, useState } from "react";
// import { Eye, EyeOff, RefreshCcw } from "lucide-react";
// import { useNetwork } from "../Context/NetworkContext";
// import { useWallet } from "../Context/WalletContext";
// import { ethers } from "ethers";

// export default function Balance() {
//   const { selectedNetwork } = useNetwork();
//   const { selectedWallet } = useWallet();

//   const [showBalance, setShowBalance] = useState(true);
//   const [balance, setBalance] = useState(null);
//   const [usdValue, setUsdValue] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const fetchBalance = async () => {
//     if (
//       !selectedWallet ||
//       !selectedWallet.address ||
//       !selectedNetwork?.rpcUrl
//     )
//       return;

//     try {
//       setLoading(true);

//       if (selectedNetwork.type === "evm") {
//         const provider = new ethers.providers.JsonRpcProvider(
//           selectedNetwork.rpcUrl
//         );
//         const rawBalance = await provider.getBalance(selectedWallet.address);
//         const ethBalance = ethers.utils.formatEther(rawBalance);
//         setBalance(parseFloat(ethBalance).toFixed(4));

//         const dummyPrice = 1800; // Replace with CoinGecko API if needed
//         setUsdValue(`$${(ethBalance * dummyPrice).toFixed(2)}`);
//       }

//       setLastUpdated(new Date().toLocaleTimeString());
//     } catch (err) {
//       console.error("Error fetching balance:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBalance();
//   }, [selectedNetwork, selectedWallet]);

//   const toggleBalance = () => {
//     const newVal = !showBalance;
//     setShowBalance(newVal);
//     localStorage.setItem("showBalance", newVal.toString());
//   };

//   return (
//     <div className="p-6 flex flex-col items-start">
//       <div className="flex items-center space-x-3 mb-2">
//         <h1 className="text-3xl font-light">
//           {showBalance
//             ? loading
//               ? "Loading..."
//               : balance !== null
//               ? `${balance} ${selectedNetwork.symbol}`
//               : "0.0000"
//             : "****"}
//         </h1>
//         <button onClick={toggleBalance}>
//           {showBalance ? (
//             <Eye className="w-5 h-5 text-gray-400" />
//           ) : (
//             <EyeOff className="w-5 h-5 text-gray-400" />
//           )}
//         </button>
//         <button onClick={fetchBalance}>
//           <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
//         </button>
//       </div>

//       <div className="flex items-center space-x-2 text-sm text-gray-400">
//         <span>{showBalance ? usdValue ?? "$0.00" : "****"}</span>
//         <span className="text-blue-400 underline">Portfolio ↗</span>
//       </div>

//       {lastUpdated && (
//         <div className="text-xs text-gray-500 mt-1">
//           Last updated: {lastUpdated}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useBalance } from "../Context/BalanceContext";
import { useNetwork } from "../Context/NetworkContext";

export default function Balance() {
  const { balance, usdValue, loading, lastUpdated, fetchBalance } = useBalance();
  const { selectedNetwork } = useNetwork();

  const [showBalance, setShowBalance] = useState(true);

  const toggleBalance = () => {
    const newVal = !showBalance;
    setShowBalance(newVal);
    localStorage.setItem("showBalance", newVal.toString());
  };

  return (
    <div className="p-6 flex flex-col items-start">
      <div className="flex items-center space-x-3 mb-2">
        <h1 className="text-3xl font-light">
          {showBalance
            ? loading
              ? "Loading..."
              : balance !== null
              ? `${balance} ${selectedNetwork.symbol}`
              : "0.0000"
            : "****"}
        </h1>
        <button onClick={toggleBalance}>
          {showBalance ? (
            <Eye className="w-5 h-5 text-gray-400" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-400" />
          )}
        </button>
        <button onClick={fetchBalance}>
          <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>{showBalance ? usdValue ?? "$0.00" : "****"}</span>
        <span className="text-blue-400 underline">Portfolio ↗</span>
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-500 mt-1">
          Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
}
