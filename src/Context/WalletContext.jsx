import { createContext, useContext, useState, useEffect } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState(() => {
    const stored = localStorage.getItem("wallet");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLocked, setIsLocked] = useState(false);

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

  const lockWallet = () => {
    setSelectedWallet(null);
    setIsLocked(true);
  };

  const unlockWallet = (passwordInput) => {
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    const storedWallet = JSON.parse(localStorage.getItem("wallet"));
    const storedPassword = localStorage.getItem("walletPassword");

    if (passwordInput === storedPassword) {
      setSelectedWallet(storedWallet);
      setIsLocked(false);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{ selectedWallet, switchWallet, lockWallet, unlockWallet, isLocked }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
