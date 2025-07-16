// Context/BalanceContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "./NetworkContext";
import { useWallet } from "./WalletContext";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const { selectedNetwork } = useNetwork();
  const { selectedWallet } = useWallet();

  const [balance, setBalance] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!selectedWallet?.address || !selectedNetwork?.rpcUrl) return;

    try {
      setLoading(true);

      if (selectedNetwork.type === "evm") {
        const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.rpcUrl);
        const rawBalance = await provider.getBalance(selectedWallet.address);
        const ethBalance = ethers.utils.formatEther(rawBalance);
        setBalance(parseFloat(ethBalance).toFixed(4));

        // You can replace this dummy price with live data from CoinGecko later
        const dummyPrice = 1800;
        setUsdValue(`$${(ethBalance * dummyPrice).toFixed(2)}`);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [selectedNetwork, selectedWallet]);

  return (
    <BalanceContext.Provider value={{ balance, usdValue, loading, lastUpdated, fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
