// utils/uniswapConfig.js
import { Token } from "@uniswap/sdk-core";

export const chainId = 11155111; // Sepolia

export const WETH_SEPOLIA = new Token(
  chainId,
  "0xDD13E55209Fd76AfE204dBda4007C227904f0a81",
  18,
  "WETH",
  "Wrapped Ether"
);

export const USDC_SEPOLIA = new Token(
  chainId,
  "0xc015efb1cb95543687f46aedb1fe062627b893b4",
  6,
  "USDC",
  "USD Coin"
);
