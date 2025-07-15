import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowLeft, ArrowDown, Settings } from "lucide-react";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum", balance: "0" },
  { symbol: "USDC", name: "USD Coin", balance: "0" },
  { symbol: "USDT", name: "Tether", balance: "0" },
  { symbol: "DAI", name: "Dai Stablecoin", balance: "0" },
];

export default function SwapModal({ onClose }) {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const fromRef = useRef();
  const toRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setFromDropdownOpen(false);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setToDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl w-96 p-6 relative shadow-xl">
        {/* Back Button */}
        <button
          className="absolute top-3 left-3 pb-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <ArrowLeft size={22} />
        </button>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold mt-3">Swap</h2>
          <Settings className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>

        {/* From Token */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="relative" ref={fromRef}>
            <button
              className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg"
              onClick={() => setFromDropdownOpen((open) => !open)}
            >
              <span className="font-semibold">{fromToken.symbol}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {fromDropdownOpen && (
              <div className="absolute top-10 left-0 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50 w-36 py-2">
                {TOKENS.map((token, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setFromToken(token);
                      setFromDropdownOpen(false);
                    }}
                  >
                    {token.symbol}{" "}
                    <span className="text-xs text-gray-400">{token.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="bg-gray-800 rounded-lg px-2 py-1 w-24 text-right text-white outline-none ml-2"
          />
        </div>
        <div className="text-xs text-gray-400 mb-2">
          Balance: <span className="font-mono">{fromToken.balance}</span>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center my-4">
          <button
            onClick={swapTokens}
            className="bg-gray-800 rounded-full p-2 hover:bg-blue-600 transition"
            title="Swap tokens"
          >
            <ArrowDown className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* To Token */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="relative" ref={toRef}>
            <button
              className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg"
              onClick={() => setToDropdownOpen((open) => !open)}
            >
              <span className="font-semibold">{toToken.symbol}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {toDropdownOpen && (
              <div className="absolute top-10 left-0 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50 w-36 py-2">
                {TOKENS.map((token, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setToToken(token);
                      setToDropdownOpen(false);
                    }}
                  >
                    {token.symbol}{" "}
                    <span className="text-xs text-gray-400">{token.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="bg-gray-800 rounded-lg px-3 py-1 w-24 text-right text-gray-400 ml-2">
            0
          </span>
        </div>

        {/* Swap Button */}
        <button
          className={`w-full py-2 rounded-lg font-semibold mt-4 transition ${
            amount && parseFloat(amount) > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          {amount && parseFloat(amount) > 0 ? "Swap" : "Enter an amount"}
        </button>
      </div>
    </div>
  );
}
