// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import { ethers } from "ethers";
// import { useNetwork } from "./NetworkContext";
// import { useWallet } from "./WalletContext";

// // 🔷 Context creation
// export const BalanceContext = createContext();

// // 🔷 Provider component
// export const BalanceProvider = ({ children }) => {
//   const { selectedNetwork } = useNetwork();
//   const { selectedWallet } = useWallet();

//   const [balance, setBalance] = useState(null);
//   const [usdValue, setUsdValue] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Memoized balance fetch function
//   const fetchBalance = useCallback(async () => {
//     if (!selectedWallet?.address || !selectedNetwork?.rpcUrl) return;

//     try {
//       setLoading(true);

//       if (selectedNetwork.type === "evm") {
//         const provider = new ethers.providers.JsonRpcProvider(
//           selectedNetwork.rpcUrl
//         );
//         const rawBalance = await provider.getBalance(selectedWallet.address);
//         const eth = ethers.utils.formatEther(rawBalance);
//         setBalance(parseFloat(eth).toFixed(4));

//         // Replace this with live CoinGecko integration later
//         const dummyPrice = 1800;
//         setUsdValue(`$${(eth * dummyPrice).toFixed(2)}`);
//       }

//       setLastUpdated(new Date().toLocaleTimeString());
//     } catch (error) {
//       console.error("❌ Error fetching balance:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedWallet, selectedNetwork]);

//   // 🔄 Fetch on mount + when wallet/network changes
//   useEffect(() => {
//     fetchBalance();
//   }, [fetchBalance]);

//   return (
//     <BalanceContext.Provider
//       value={{
//         balance,
//         usdValue,
//         lastUpdated,
//         loading,
//         fetchBalance, // ✅ Exposed for SwapModal or Header
//       }}
//     >
//       {children}
//     </BalanceContext.Provider>
//   );
// };

// // 🔷 Hook for easier access
// export const useBalance = () => useContext(BalanceContext);


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { useNetwork } from "./NetworkContext";
import { useWallet } from "./WalletContext";

// 🔷 Context creation
export const BalanceContext = createContext();

// 🔷 Provider component
export const BalanceProvider = ({ children }) => {
  const { selectedNetwork } = useNetwork();
  const { selectedWallet } = useWallet();

  const [balance, setBalance] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Memoized balance fetch function (supports native only for now)
  const fetchBalance = useCallback(async () => {
    if (!selectedWallet?.address || !selectedNetwork?.rpcUrl) return;

    try {
      setLoading(true);

      if (selectedNetwork.type === "evm") {
        const provider = new ethers.providers.JsonRpcProvider(
          selectedNetwork.rpcUrl
        );
        const rawBalance = await provider.getBalance(selectedWallet.address);
        const eth = parseFloat(ethers.utils.formatEther(rawBalance));
        setBalance(eth.toFixed(4));

        // Replace this with live price in future
        const dummyPrice = 1800;
        setUsdValue(`$${(eth * dummyPrice).toFixed(2)}`);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedWallet, selectedNetwork]);

  // 🔄 Auto-fetch on wallet or network change
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        usdValue,
        lastUpdated,
        loading,
        fetchBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// 🔷 Hook for easier access
export const useBalance = () => useContext(BalanceContext);
