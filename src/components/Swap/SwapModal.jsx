
// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown, ArrowLeft, ArrowDown, Settings } from "lucide-react";
// import { ethers } from "ethers";
// import {
//   Token,
//   CurrencyAmount,
//   TradeType,
//   Percent,
// } from "@uniswap/sdk-core";
// import {
//   Pool,
//   Route,
//   Trade,
//   SwapRouter,
//   TICK_SPACINGS,
// } from "@uniswap/v3-sdk";
// import { toast } from "react-hot-toast";

// import { getSignerFromLocalStorage } from "../../utils/getSignerFromLocalStorage";
// import IUniswapV3PoolABI from "../../abis/IUniswapV3Pool.json";
// import { TOKENS } from "../../utils/tokenList";
// import { useBalance } from "../../Context/BalanceContext";
// import { useTransactions } from "../../Context/TransactionContext";

// const FEE = 3000;
// const POOL_ADDRESS = "0x9799b5edc1aa7d3fad350309b08df3f64914e244";
// const USD_PER_ETH = 1800;

// export default function SwapModal({ onClose }) {
//   const [fromToken, setFromToken] = useState(TOKENS.WETH);
//   const [toToken, setToToken] = useState(TOKENS.USDC);
//   const [amount, setAmount] = useState("");
//   const [isSwapping, setIsSwapping] = useState(false);
//   const [outputAmount, setOutputAmount] = useState("");
//   const [fromBalance, setFromBalance] = useState("0");
//   const [toBalance, setToBalance] = useState("0");

//   const { fetchBalance } = useBalance();
//   const { addTransaction } = useTransactions();

//   const fromRef = useRef();
//   const toRef = useRef();
//   const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
//   const [toDropdownOpen, setToDropdownOpen] = useState(false);

//   useEffect(() => {
//     getBalances();
//   }, [fromToken, toToken]);

//   useEffect(() => {
//     if (amount && parseFloat(amount) > 0) {
//       estimateSwapOutput();
//     } else {
//       setOutputAmount("");
//     }
//   }, [amount, fromToken, toToken]);

//   const getBalances = async () => {
//     const signer = getSignerFromLocalStorage();
//     const address = await signer.getAddress();
//     const provider = signer.provider;

//     const balance1 = await provider.getBalance(address);
//     setFromBalance(ethers.utils.formatEther(balance1));

//     const tokenContract = new ethers.Contract(
//       toToken.address,
//       ["function balanceOf(address) view returns (uint256)"],
//       provider
//     );
//     const bal = await tokenContract.balanceOf(address);
//     setToBalance(ethers.utils.formatUnits(bal, toToken.decimals));
//   };

//   const estimateSwapOutput = async () => {
//     try {
//       const signer = getSignerFromLocalStorage();
//       const provider = signer.provider;
//       const poolContract = new ethers.Contract(POOL_ADDRESS, IUniswapV3PoolABI, provider);
//       const [slot0, liquidity] = await Promise.all([
//         poolContract.slot0(),
//         poolContract.liquidity(),
//       ]);

//       const pool = new Pool(
//         fromToken,
//         toToken,
//         FEE,
//         slot0.sqrtPriceX96.toString(),
//         liquidity.toString(),
//         slot0.tick
//       );

//       const route = new Route([pool], fromToken, toToken);
//       const amountIn = ethers.utils.parseUnits(amount, fromToken.decimals);
//       const currencyAmountIn = CurrencyAmount.fromRawAmount(fromToken, amountIn.toString());

//       const dummyOut = CurrencyAmount.fromRawAmount(toToken, "1");

//       const uncheckedTrade = Trade.createUncheckedTrade({
//         route,
//         inputAmount: currencyAmountIn,
//         outputAmount: dummyOut,
//         tradeType: TradeType.EXACT_INPUT,
//       });

//       setOutputAmount(uncheckedTrade.outputAmount.toExact());
//     } catch (error) {
//       console.warn("Estimation failed:", error.message);
//       setOutputAmount("");
//     }
//   };

//   const handleSwap = async () => {
//     try {
//       setIsSwapping(true);
//       const signer = getSignerFromLocalStorage();
//       const provider = signer.provider;
//       const address = await signer.getAddress();

//       const poolContract = new ethers.Contract(POOL_ADDRESS, IUniswapV3PoolABI, provider);
//       const [slot0, liquidity] = await Promise.all([
//         poolContract.slot0(),
//         poolContract.liquidity(),
//       ]);

//       const pool = new Pool(
//         fromToken,
//         toToken,
//         FEE,
//         slot0.sqrtPriceX96.toString(),
//         liquidity.toString(),
//         slot0.tick
//       );

//       const route = new Route([pool], fromToken, toToken);
//       const amountIn = ethers.utils.parseUnits(amount, fromToken.decimals);
//       const currencyAmountIn = CurrencyAmount.fromRawAmount(fromToken, amountIn.toString());

//       const dummyOut = CurrencyAmount.fromRawAmount(toToken, "1");

//       const uncheckedTrade = Trade.createUncheckedTrade({
//         route,
//         inputAmount: currencyAmountIn,
//         outputAmount: dummyOut,
//         tradeType: TradeType.EXACT_INPUT,
//       });

//       const options = {
//         slippageTolerance: new Percent(50, 10_000),
//         recipient: address,
//         deadline: Math.floor(Date.now() / 1000) + 60 * 10,
//       };

//       const methodParameters = SwapRouter.swapCallParameters(
//         [uncheckedTrade],
//         options
//       );

//       const tx = {
//         to: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
//         data: methodParameters.calldata,
//         value: methodParameters.value,
//       };

//       const receipt = await signer.sendTransaction(tx);
//       toast.success("Swap submitted! View in Activity Tab");
//       addTransaction({
//         hash: receipt.hash,
//         type: "Swap",
//         symbol: fromToken.symbol,
//         amount,
//         status: "Pending",
//         date: new Date().toLocaleString(),
//       });

//       setTimeout(() => {
//         fetchBalance();
//         getBalances();
//       }, 7000);
//     } catch (err) {
//       toast.error("Swap failed");
//       console.error("Swap Error:", err);
//     } finally {
//       setIsSwapping(false);
//     }
//   };

//   const swapTokens = () => {
//     const temp = fromToken;
//     setFromToken(toToken);
//     setToToken(temp);
//     setAmount("");
//     setOutputAmount("");
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-gray-900 text-white rounded-xl w-96 p-6 relative shadow-xl">
//         <button
//           className="absolute top-3 left-3 text-gray-400 hover:text-white"
//           onClick={onClose}
//         >
//           <ArrowLeft size={22} />
//         </button>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-bold mt-3">Swap</h2>
//           <Settings className="w-5 h-5 text-gray-400" />
//         </div>

//         {/* From Token Input */}
//         <div className="mb-2">
//           <div className="flex items-center justify-between">
//             <div className="font-medium">{fromToken.symbol}</div>
//             <div className="text-xs text-gray-400">
//               Balance: {parseFloat(fromBalance).toFixed(4)}
//             </div>
//           </div>
//           <input
//             type="number"
//             placeholder="0.0"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full mt-1 bg-gray-800 p-2 rounded-lg text-lg"
//           />
//           {amount && (
//             <div className="text-xs text-gray-400 mt-1">
//               ≈ ${(parseFloat(amount) * USD_PER_ETH).toFixed(2)} USD
//             </div>
//           )}
//         </div>

//         {/* Swap Button */}
//         <div className="flex justify-center my-4">
//           <button
//             onClick={swapTokens}
//             className="bg-gray-800 rounded-full p-2 hover:bg-blue-600 transition"
//             title="Swap tokens"
//           >
//             <ArrowDown className="w-4 h-4 text-gray-300" />
//           </button>
//         </div>

//         {/* To Token Output */}
//         <div className="mb-2">
//           <div className="flex items-center justify-between">
//             <div className="font-medium">{toToken.symbol}</div>
//             <div className="text-xs text-gray-400">
//               Balance: {parseFloat(toBalance).toFixed(4)}
//             </div>
//           </div>
//           <div className="w-full mt-1 bg-gray-800 p-2 rounded-lg text-lg text-right">
//             {outputAmount || "0.0"}
//           </div>
//         </div>

//         <button
//           className={`w-full py-2 mt-4 rounded-lg font-semibold transition ${
//             amount && parseFloat(amount) > 0
//               ? "bg-blue-600 hover:bg-blue-700 text-white"
//               : "bg-gray-700 text-gray-400 cursor-not-allowed"
//           }`}
//           disabled={!amount || parseFloat(amount) <= 0 || isSwapping}
//           onClick={handleSwap}
//         >
//           {isSwapping ? "Swapping..." : "Swap"}
//         </button>
//       </div>
//     </div>
//   );
// }


// components/Swap/SwapModal.jsx
import React, { useState, useEffect, useRef } from "react";
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
import { TOKENS } from "../../utils/tokenList";
import { toast } from "react-hot-toast";
import { getSignerFromLocalStorage } from "../../utils/getSignerFromLocalStorage";
import IUniswapV3PoolABI from "../../abis/IUniswapV3Pool.json";
import { useTransactions } from "../../Context/TransactionContext";
import { useBalance } from "../../Context/BalanceContext";

const FEE = 3000;
const POOL_ADDRESS = "0x9799b5edc1aa7d3fad350309b08df3f64914e244";

export default function SwapModal({ onClose }) {
  const [fromToken, setFromToken] = useState(TOKENS.WETH);
  const [toToken, setToToken] = useState(TOKENS.USDC);
  const [amount, setAmount] = useState("");
  const [estimatedOutput, setEstimatedOutput] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [fromBalance, setFromBalance] = useState("-");
  const [toBalance, setToBalance] = useState("-");
  const [usdRate, setUsdRate] = useState(1800); // Dummy rate for now

  const { addTransaction } = useTransactions();
  const { fetchBalance } = useBalance();

  const fromRef = useRef();
  const toRef = useRef();

  const getTokenBalance = async (token) => {
    try {
      const signer = getSignerFromLocalStorage();
      const address = await signer.getAddress();
      const provider = signer.provider;
      const erc20 = new ethers.Contract(
        token.address,
        ["function balanceOf(address) view returns (uint256)"],
        provider
      );
      const raw = await erc20.balanceOf(address);
      return ethers.utils.formatUnits(raw, token.decimals);
    } catch {
      return "0";
    }
  };

  const fetchBalances = async () => {
    if (fromToken && toToken) {
      const from = await getTokenBalance(fromToken);
      const to = await getTokenBalance(toToken);
      setFromBalance(parseFloat(from).toFixed(4));
      setToBalance(parseFloat(to).toFixed(4));
    }
  };

  const fetchEstimatedOutput = async () => {
    try {
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
      const amountIn = ethers.utils.parseUnits(amount || "0", fromToken.decimals);
      const currencyAmountIn = CurrencyAmount.fromRawAmount(fromToken, amountIn.toString());
      const outputAmount = pool.getOutputAmount(currencyAmountIn, false)[0];
      setEstimatedOutput(ethers.utils.formatUnits(outputAmount.quotient.toString(), toToken.decimals));
    } catch (err) {
      setEstimatedOutput("0");
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [fromToken, toToken]);

  useEffect(() => {
    if (amount && parseFloat(amount) > 0) fetchEstimatedOutput();
    else setEstimatedOutput("");
  }, [amount, fromToken, toToken]);

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
      const input = CurrencyAmount.fromRawAmount(fromToken, amountIn.toString());
      const dummyOut = CurrencyAmount.fromRawAmount(toToken, "1");

      const uncheckedTrade = Trade.createUncheckedTrade({
        route,
        inputAmount: input,
        outputAmount: dummyOut,
        tradeType: TradeType.EXACT_INPUT,
      });

      const options = {
        slippageTolerance: new Percent(50, 10_000),
        recipient: await signer.getAddress(),
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      };

      const methodParams = SwapRouter.swapCallParameters([uncheckedTrade], options);
      const tx = await signer.sendTransaction({
        to: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        data: methodParams.calldata,
        value: methodParams.value,
      });

      toast.success("Swap submitted! View in Activity.");
      const newTx = {
        type: "Swap",
        amount,
        symbol: fromToken.symbol,
        status: "Pending",
        date: new Date().toLocaleString(),
        hash: tx.hash,
      };
      addTransaction(newTx);

      // Wait for confirmation
      await provider.waitForTransaction(tx.hash);

      fetchBalance(); // refresh native balance
      fetchBalances(); // refresh token balances

      addTransaction({
        ...newTx,
        status: "Confirmed",
      });

      toast.success("Swap confirmed ✅");
      setAmount("");
    } catch (err) {
      toast.error("Swap failed ❌");
      console.error("Swap error:", err);
    } finally {
      setIsSwapping(false);
    }
  };

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount("");
    setEstimatedOutput("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl w-96 p-6 relative shadow-xl">
        <button className="absolute top-3 left-3 text-gray-400 hover:text-white" onClick={onClose}>
          <ArrowLeft size={22} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold mt-3">Swap</h2>
          <Settings className="w-5 h-5 text-gray-400" />
        </div>

        {/* From Token */}
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold">{fromToken.symbol}</div>
            <div className="text-xs text-gray-400">Balance: {fromBalance}</div>
          </div>
          <input
            className="w-full mt-2 px-4 py-2 bg-gray-800 rounded-lg outline-none text-right text-lg"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && (
            <div className="text-xs text-gray-400 mt-1">
              ≈ ${(parseFloat(amount || 0) * usdRate).toFixed(2)}
            </div>
          )}
        </div>

        {/* Swap arrow */}
        <div className="flex justify-center my-4">
          <button onClick={swapTokens} className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <ArrowDown />
          </button>
        </div>

        {/* To Token */}
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold">{toToken.symbol}</div>
            <div className="text-xs text-gray-400">Balance: {toBalance}</div>
          </div>
          <input
            disabled
            value={estimatedOutput}
            placeholder="0.0"
            className="w-full mt-2 px-4 py-2 bg-gray-800 rounded-lg outline-none text-right text-lg text-gray-300"
          />
          {estimatedOutput && (
            <div className="text-xs text-gray-400 mt-1">
              ≈ ${(parseFloat(estimatedOutput || 0) * usdRate).toFixed(2)} (est.)
            </div>
          )}
        </div>

        <button
          onClick={handleSwap}
          disabled={!amount || parseFloat(amount) <= 0 || isSwapping}
          className={`w-full mt-4 py-2 rounded-lg font-semibold ${
            isSwapping || !amount ? "bg-gray-600 text-gray-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSwapping ? "Swapping..." : "Swap"}
        </button>
      </div>
    </div>
  );
}
