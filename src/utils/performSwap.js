// src/utils/performSwap.js
import { ethers } from "ethers";
import {
  CurrencyAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk-core";
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
} from "@uniswap/smart-order-router";
import { UNISWAP_ROUTER_ADDRESS, WETH_SEPOLIA, USDC_SEPOLIA } from "./uniswapConfig";

export const performSwap = async (amountIn, slippageToleranceBips = 50) => {
  const rpc = "https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284"; // Replace with your key
  const provider = new ethers.providers.JsonRpcProvider(rpc);

  // 🔐 Get signer from localStorage
  const walletData = JSON.parse(localStorage.getItem("wallet"));
  const signer = new ethers.Wallet(walletData.privateKey, provider);

  const router = new AlphaRouter({ chainId: 11155111, provider });

  const amount = ethers.utils.parseUnits(amountIn, 18); // WETH has 18 decimals
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH_SEPOLIA, amount.toString());

  const route = await router.route(
    currencyAmount,
    USDC_SEPOLIA,
    TradeType.EXACT_INPUT,
    {
      recipient: await signer.getAddress(),
      slippageTolerance: new Percent(slippageToleranceBips, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
    }
  );

  if (!route) throw new Error("❌ No route found");

  const tx = {
    data: route.methodParameters.calldata,
    to: UNISWAP_ROUTER_ADDRESS,
    value: route.methodParameters.value,
    from: await signer.getAddress(),
    gasPrice: route.gasPriceWei,
    gasLimit: ethers.BigNumber.from(300000),
  };

  const response = await signer.sendTransaction(tx);
  console.log("✅ Swap TX Sent:", response.hash);
  return response;
};
