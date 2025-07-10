import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState(() => {
    const stored = localStorage.getItem("wallet");
    return stored ? JSON.parse(stored) : null;
  });

  //  Sync with localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wallet");
    if (stored) {
      setSelectedWallet(JSON.parse(stored));
    }
  }, []);

  //  Update wallet & persist
  const switchWallet = (wallet) => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    setSelectedWallet(wallet);
  };

  return (
    <WalletContext.Provider value={{ selectedWallet, switchWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
