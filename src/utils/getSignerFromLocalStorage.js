// utils/getSignerFromLocalStorage.js
import { ethers } from "ethers";

export const getSignerFromLocalStorage = () => {
  const storedWallet = JSON.parse(localStorage.getItem("wallet"));
  if (!storedWallet || !storedWallet.mnemonic) {
    throw new Error("No wallet found in localStorage");
  }

  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284" // or Alchemy
  );

  const wallet = ethers.Wallet.fromMnemonic(storedWallet.mnemonic);
  const signer = wallet.connect(provider);

  return signer;
};
