// utils/tokenList.js
import { Token } from "@uniswap/sdk-core";

export const TOKENS = {
  WETH: new Token(
    11155111,
    "0xfff9976782d46cc05630d1f6ebab18b2324d6b14", // ✅ Sepolia WETH address
    18,
    "WETH",
    "Wrapped Ether"
  ),
  USDC: new Token(
    11155111,
    "0x51fCe89b9f6D4c530698f181167043e1bB4abf89", // ✅ Your selected USDC
    6,
    "USDC",
    "USD Coin"
  ),
};
