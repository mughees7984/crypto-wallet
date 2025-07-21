import React, { useState, useEffect } from "react";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useNetwork } from "../Context/NetworkContext";
import { useBalance } from "../Context/BalanceContext";

export default function Balance() {
  const { selectedNetwork } = useNetwork();
  const { balance, usdValue, loading, lastUpdated, fetchBalance } =
    useBalance();

  const [showBalance, setShowBalance] = useState(true);

  // Restore user preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("showBalance");
    if (stored !== null) {
      setShowBalance(stored === "true");
    }
  }, []);

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
        <span className="text-blue-400 underline cursor-pointer">
          Portfolio ↗
        </span>
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-500 mt-1">
          Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
}
