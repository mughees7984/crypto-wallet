import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Balance() {
  const [showBalance, setShowBalance] = useState(true);

  const balance = "0.0000 SepoliaETH";
  const dollarEquivalent = "+$0 (+0.00%)";

  // Load persisted state on mount
  useEffect(() => {
    const stored = localStorage.getItem("showBalance");
    if (stored !== null) {
      setShowBalance(stored === "true");
    }
  }, []);

  // Save to localStorage whenever showBalance changes
  const toggleBalance = () => {
    const newValue = !showBalance;
    setShowBalance(newValue);
    localStorage.setItem("showBalance", newValue.toString());
  };

  return (
    <div className="p-6 flex flex-col items-start">
      <div className="flex items-center space-x-2 mb-2">
        <h1 className="text-3xl font-light">
          {showBalance ? balance : "****"}
        </h1>
        <button onClick={toggleBalance}>
          {showBalance ? (
            <Eye className="w-5 h-5 text-gray-400" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>{showBalance ? dollarEquivalent : "****"}</span>
        <span className="text-blue-400 underline">Portfolio ↗</span>
      </div>
    </div>
  );
}
