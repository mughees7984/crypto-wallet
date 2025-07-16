import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowLeft, ArrowDown, Settings } from "lucide-react";
import { ethers } from "ethers";
import {
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk-core";
import {
  Pool,
  Route,
  Trade,
  SwapRouter,
} from "@uniswap/v3-sdk";
import { getSignerFromLocalStorage } from "../../utils/getSignerFromLocalStorage";
import IUniswapV3PoolABI from "../../abis/IUniswapV3Pool.json";
import { TOKENS } from "../../utils/tokenList";
import { toast } from "react-hot-toast";
import { useTransactions } from "../../Context/TransactionContext";

const FEE = 3000;
const POOL_ADDRESS = "0x9799b5edc1aa7d3fad350309b08df3f64914e244"; // Replace with your actual pool address

export default function SwapModal({ onClose }) {
  const [fromToken, setFromToken] = useState(TOKENS.WETH);
  const [toToken, setToToken] = useState(TOKENS.USDC);
  const [amount, setAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const fromRef = useRef();
  const toRef = useRef();
  const { addTransaction } = useTransactions();

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
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSwap = async () => {
    try {
      setIsSwapping(true);
      const signer = getSignerFromLocalStorage();
      const provider = signer.provider;

      const poolContract = new ethers.Contract(
        POOL_ADDRESS,
        IUniswapV3PoolABI,
        provider
      );
      const [slot0, liquidity] = await Promise.all([
        poolContract.slot0(),
        poolContract.liquidity(),
      ]);

      const pool = new Pool(
        fromToken,
        toToken,
        FEE,
        slot0.sqrtPriceX96.toString(),
        liquidity.toString(),
        slot0.tick
      );

      const route = new Route([pool], fromToken, toToken);
      const amountIn = ethers.utils.parseUnits(amount, fromToken.decimals);
      const currencyAmountIn = CurrencyAmount.fromRawAmount(
        fromToken,
        amountIn.toString()
      );

      // Dummy output to satisfy SDK
      const dummyOut = CurrencyAmount.fromRawAmount(toToken, "1");

      const uncheckedTrade = Trade.createUncheckedTrade({
        route,
        inputAmount: currencyAmountIn,
        outputAmount: dummyOut,
        tradeType: TradeType.EXACT_INPUT,
      });

      const options = {
        slippageTolerance: new Percent(50, 10_000),
        recipient: await signer.getAddress(),
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      };

      const methodParameters = SwapRouter.swapCallParameters(
        [uncheckedTrade],
        options
      );

      const tx = {
        to: "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap v3 router
        data: methodParameters.calldata,
        value: methodParameters.value,
      };

      const receipt = await signer.sendTransaction(tx);

      toast.success("Swap Successful! View in Activity Tab.");

      // ✅ Log to Activity tab
      addTransaction({
        type: "Swap",
        amount,
        symbol: fromToken.symbol,
        status: "Success",
        date: new Date().toLocaleString(),
        hash: receipt.hash,
      });
    } catch (err) {
      console.error("❌ Swap Error:", err);
      toast.error("Swap failed. See console.");
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl w-96 p-6 relative shadow-xl">
        <button
          className="absolute top-3 left-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold mt-3">Swap</h2>
          <Settings className="w-5 h-5 text-gray-400" />
        </div>

        {/* From Token */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="relative" ref={fromRef}>
            <button
              className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg"
              onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
            >
              <span className="font-semibold">{fromToken.symbol}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {fromDropdownOpen && (
              <div className="absolute top-10 left-0 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50 w-36 py-2">
                {Object.values(TOKENS).map((token, idx) => (
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
          Balance: <span className="font-mono">-</span>
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
              onClick={() => setToDropdownOpen(!toDropdownOpen)}
            >
              <span className="font-semibold">{toToken.symbol}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {toDropdownOpen && (
              <div className="absolute top-10 left-0 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50 w-36 py-2">
                {Object.values(TOKENS).map((token, idx) => (
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

        <div className="mt-4">
          <button
            className={`w-full py-2 rounded-lg font-semibold mt-4 transition ${
              amount && parseFloat(amount) > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!amount || parseFloat(amount) <= 0 || isSwapping}
            onClick={handleSwap}
          >
            {isSwapping ? "Swapping..." : "Swap"}
          </button>
        </div>
      </div>
    </div>
  );
}
