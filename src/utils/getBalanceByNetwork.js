import { ethers } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_NETWORKS } from "../components/constants/network";

export const getBalanceByNetwork = async (network, walletAddress) => {
  try {
    if (!network || !walletAddress) return null;

    switch (network.id) {
      case "ethereum":
      case "bsc": {
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
        const balance = await provider.getBalance(walletAddress);
        const formatted = ethers.utils.formatEther(balance);
        return {
          formatted: `${parseFloat(formatted).toFixed(4)} ${network.symbol}`,
          dollar: "+$0.00", // You can use a price API like CoinGecko to get real price
        };
      }

      case "solana": {
        const connection = new Connection(network.cluster, "confirmed");
        const publicKey = new PublicKey(walletAddress);
        const lamports = await connection.getBalance(publicKey);
        const sol = lamports / 1e9;
        return {
          formatted: `${sol.toFixed(4)} ${network.symbol}`,
          dollar: "+$0.00",
        };
      }

      case "bitcoin": {
        const url = `https://blockstream.info/testnet/api/address/${walletAddress}`;
        const res = await axios.get(url);
        const sats = res.data.chain_stats.funded_txo_sum - res.data.chain_stats.spent_txo_sum;
        const btc = sats / 1e8;
        return {
          formatted: `${btc.toFixed(4)} ${network.symbol}`,
          dollar: "+$0.00",
        };
      }

      default:
        return null;
    }
  } catch (err) {
    console.error("Balance fetch error:", err);
    return null;
  }
};
