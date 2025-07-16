// utils/walletUtils.js
import { ethers } from "ethers";

export const getSignerFromLocalStorage = () => {
  const walletData = JSON.parse(localStorage.getItem("wallet"));
  if (!walletData || !walletData.mnemonic) throw new Error("Wallet not found");

  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284");
  const wallet = ethers.Wallet.fromMnemonic(walletData.mnemonic).connect(provider);

  return wallet;
};
