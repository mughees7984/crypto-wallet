


// import React, { useState, useEffect } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useNetwork } from "../Context/NetworkContext";
// import { ethers } from "ethers";
// import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

// export default function Balance() {
//   const [showBalance, setShowBalance] = useState(true);
//   const [balance, setBalance] = useState(null);
//   const [address, setAddress] = useState(null);

//   const { selectedNetwork } = useNetwork();

//   useEffect(() => {
//     const stored = localStorage.getItem("showBalance");
//     if (stored !== null) setShowBalance(stored === "true");

//     const wallet = JSON.parse(localStorage.getItem("wallet"));
//     if (wallet?.address) {
//       setAddress(wallet.address);
//     }
//   }, []);

//   useEffect(() => {
//     if (!selectedNetwork || !address) return;

//     const fetchBalance = async () => {
//       try {
//         if (["ethereum", "bsc"].includes(selectedNetwork.id)) {
//           const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.rpcUrl);
//           const raw = await provider.getBalance(address);
//           const eth = ethers.utils.formatEther(raw);
//           setBalance(`${parseFloat(eth).toFixed(4)} ${selectedNetwork.symbol}`);
//         } else if (selectedNetwork.id === "solana") {
//           const connection = new Connection(selectedNetwork.cluster);
//           const publicKey = new PublicKey(address);
//           const raw = await connection.getBalance(publicKey);
//           const sol = raw / LAMPORTS_PER_SOL;
//           setBalance(`${sol.toFixed(4)} ${selectedNetwork.symbol}`);
//         } else if (selectedNetwork.id === "bitcoin") {
//           // Placeholder for Unisat or Blockstream balance fetch
//           setBalance(`0.0000 ${selectedNetwork.symbol}`);
//         }
//       } catch (err) {
//         console.error("Error fetching balance:", err);
//         setBalance(`0.0000 ${selectedNetwork.symbol}`);
//       }
//     };

//     fetchBalance();
//   }, [selectedNetwork, address]);

//   const toggleBalance = () => {
//     const newValue = !showBalance;
//     setShowBalance(newValue);
//     localStorage.setItem("showBalance", newValue.toString());
//   };

//   return (
//     <div className="p-6 flex flex-col items-start">
//       <div className="flex items-center space-x-2 mb-2">
//         <h1 className="text-3xl font-light">
//           {showBalance ? balance || "0.0000" : "****"}
//         </h1>
//         <button onClick={toggleBalance}>
//           {showBalance ? (
//             <Eye className="w-5 h-5 text-gray-400" />
//           ) : (
//             <EyeOff className="w-5 h-5 text-gray-400" />
//           )}
//         </button>
//       </div>

//       <div className="flex items-center space-x-2 text-sm text-gray-400">
//         <span>{showBalance ? "$0.00 USD" : "****"}</span>
//         <span className="text-blue-400 underline">Portfolio ↗</span>
//       </div>
//     </div>
//   );
// }

// src/components/Balance.jsx

// import React, { useEffect, useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { ethers } from "ethers";
// import { useNetwork } from "../Context/NetworkContext";

// export default function Balance() {
//   const [showBalance, setShowBalance] = useState(true);
//   const [balance, setBalance] = useState("Loading...");
//   const [usd, setUsd] = useState("");

//   const { selectedNetwork } = useNetwork();

//   const fetchBalance = async () => {
//     const wallet = JSON.parse(localStorage.getItem("wallet"));
//     if (!wallet || !selectedNetwork?.rpcUrl) {
//       setBalance("0.0000");
//       return;
//     }

//     try {
//       const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.rpcUrl);
//       const raw = await provider.getBalance(wallet.address);
//       const ethBalance = ethers.utils.formatEther(raw);
//       setBalance(`${parseFloat(ethBalance).toFixed(4)} ${selectedNetwork.symbol}`);

//       // Optional: You can fetch live prices via CoinGecko if needed
//       setUsd("+$0.00");
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//       setBalance("Error");
//     }
//   };

//   useEffect(() => {
//     fetchBalance();
//   }, [selectedNetwork]);

//   useEffect(() => {
//     const stored = localStorage.getItem("showBalance");
//     if (stored !== null) setShowBalance(stored === "true");
//   }, []);

//   const toggleBalance = () => {
//     const newVal = !showBalance;
//     setShowBalance(newVal);
//     localStorage.setItem("showBalance", newVal.toString());
//   };

//   return (
//     <div className="p-6 flex flex-col items-start">
//       <div className="flex items-center space-x-2 mb-2">
//         <h1 className="text-3xl font-light">
//           {showBalance ? balance : "****"}
//         </h1>
//         <button onClick={toggleBalance}>
//           {showBalance ? (
//             <Eye className="w-5 h-5 text-gray-400" />
//           ) : (
//             <EyeOff className="w-5 h-5 text-gray-400" />
//           )}
//         </button>
//       </div>

//       <div className="flex items-center space-x-2 text-sm text-gray-400">
//         <span>{showBalance ? usd : "****"}</span>
//         <span className="text-blue-400 underline">Portfolio ↗</span>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useNetwork } from "../Context/NetworkContext";
import { ethers } from "ethers";

export default function Balance() {
  const { selectedNetwork } = useNetwork();
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const selectedWallet = JSON.parse(localStorage.getItem("wallet"));

  const fetchBalance = async () => {
    if (!selectedWallet || !selectedWallet.address || !selectedNetwork?.rpcUrl) return;

    try {
      setLoading(true);

      if (selectedNetwork.type === "evm") {
        const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.rpcUrl);
        const rawBalance = await provider.getBalance(selectedWallet.address);
        const ethBalance = ethers.utils.formatEther(rawBalance);
        const formattedBalance = parseFloat(ethBalance).toFixed(4);
        setBalance(formattedBalance);

        // Example USD price mapping (can be dynamic with CoinGecko API later)
        const fakePrices = {
          ETH: 1800,
          BNB: 240,
          MATIC: 0.65,
          AVAX: 12,
          FTM: 0.4,
        };

        const price = fakePrices[selectedNetwork.symbol] || 0;
        setUsdValue(`$${(parseFloat(ethBalance) * price).toFixed(2)}`);
      } else {
        setBalance("0.0000");
        setUsdValue("$0.00");
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching balance:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load on mount and refresh every 10 seconds
  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [selectedNetwork]);

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
        <div className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated}</div>
      )}
    </div>
  );
}
