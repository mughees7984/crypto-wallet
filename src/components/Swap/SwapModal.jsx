import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ArrowDown, ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNetwork } from "../../Context/NetworkContext";
import { useWallet } from "../../Context/WalletContext";
import { useBalance } from "../../Context/BalanceContext";

import UniswapV3FactoryABI from "../../abis/UniswapV3FactoryABI.json";
import IUniswapV3PoolABI from "../../abis/IUniswapV3PoolABI.json";

const WETH_ADDRESS = "0xFFf9976782d46Cc05630D1f6Ebab18B2324d6B14"; // Sepolia WETH
const USDC_ADDRESS = "0x51fCe89b9f6D4c530698f181167043e1bB4abf89"; // Custom USDC
const UNISWAP_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984"; // Uniswap V3 Factory
const FEE = 3000; // 0.3%

const SwapModal = ({ onClose }) => {
  const { selectedWallet } = useWallet();
  const { selectedNetwork } = useNetwork();
  const { fetchBalance } = useBalance();

  const [fromAmount, setFromAmount] = useState("");
  const [estimatedOutput, setEstimatedOutput] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  const ethBalance = 1.234; // Dummy - you can get this from context
  const usdcBalance = 2389.12; // Dummy - you can get this from context

  // Estimate output whenever user types
  useEffect(() => {
    const calculateOutput = async () => {
      if (!fromAmount || isNaN(fromAmount)) {
        setEstimatedOutput("");
        return;
      }
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          selectedNetwork.rpcUrl
        );
        const factory = new ethers.Contract(
          UNISWAP_FACTORY,
          UniswapV3FactoryABI,
          provider
        );
        const poolAddress = await factory.getPool(
          WETH_ADDRESS,
          USDC_ADDRESS,
          FEE
        );
        if (poolAddress === ethers.constants.AddressZero) {
          toast.error("Uniswap pool not found.");
          return;
        }
        const pool = new ethers.Contract(
          poolAddress,
          IUniswapV3PoolABI,
          provider
        );
        const slot0 = await pool.slot0();
        const sqrtPriceX96 = slot0.sqrtPriceX96;
        const price = (Number(sqrtPriceX96) / 2 ** 96) ** 2;
        const output = (parseFloat(fromAmount) * price * 1e6) / 1e18; // Convert ETH to USDC
        setEstimatedOutput(output.toFixed(2));
      } catch (error) {
        console.error("Failed to estimate:", error);
        setEstimatedOutput("");
      }
    };
    calculateOutput();
  }, [fromAmount, selectedNetwork]);

  const handleSwap = async () => {
    if (!fromAmount || isNaN(fromAmount)) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setIsSwapping(true);

      const provider = new ethers.providers.JsonRpcProvider(
        selectedNetwork.rpcUrl
      );
      const signer = new ethers.Wallet(selectedWallet.privateKey, provider);

      // TODO: Replace this with full Uniswap Router logic
      // For now, simulate swap
      toast.success("Swap transaction submitted!");
      setTimeout(async () => {
        toast.success("Swap successful!");
        setFromAmount("");
        setEstimatedOutput("");
        fetchBalance();
        setIsSwapping(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Swap failed:", err);
      toast.error("Swap failed!");
      setIsSwapping(false);
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-2xl w-full max-w-md mx-auto text-white shadow-xl relative">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-400 hover:text-white"
      >
        <ChevronLeft size={24} />
      </button>

      <h2 className="text-xl font-semibold mb-6 text-center">Swap</h2>

      {/* From Input */}
      <div className="mb-4 p-4 bg-[#2c2c2c] rounded-xl">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>From</span>
          <span>Balance: {ethBalance.toFixed(4)} ETH</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.00"
            className="bg-transparent text-white text-2xl font-medium focus:outline-none w-full"
          />
          <div className="text-right text-lg font-bold pl-4">ETH</div>
        </div>
      </div>

      <div className="flex justify-center my-2">
        <ArrowDown className="text-gray-500" size={20} />
      </div>

      {/* To Output */}
      <div className="mb-6 p-4 bg-[#2c2c2c] rounded-xl">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>To</span>
          <span>Balance: {usdcBalance.toFixed(2)} USDC</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            readOnly
            value={estimatedOutput}
            placeholder="Estimated"
            className="bg-transparent text-white text-2xl font-medium focus:outline-none w-full"
          />
          <div className="text-right text-lg font-bold pl-4">USDC</div>
        </div>
      </div>

      <button
        onClick={handleSwap}
        disabled={!fromAmount || isSwapping}
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-semibold disabled:opacity-50"
      >
        {isSwapping ? "Swapping..." : "Swap"}
      </button>
    </div>
  );
};

export default SwapModal;
