


// import { createContext, useContext, useState, useEffect } from "react";

// export const WalletContext = createContext();

// export const WalletProvider = ({ children }) => {
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [isLocked, setIsLocked] = useState(false);

//   // ✅ Sync with chrome.storage.local on mount
//   useEffect(() => {
//     chrome.storage.local.get(["wallet"], (result) => {
//       if (result.wallet) {
//         setSelectedWallet(result.wallet);
//       }
//     });
//   }, []);

//   // ✅ Update wallet & persist
//   const switchWallet = (wallet) => {
//     chrome.storage.local.set({ wallet }, () => {
//       setSelectedWallet(wallet);
//     });
//   };

//   const lockWallet = () => {
//     chrome.storage.local.remove("wallet", () => {
//       setSelectedWallet(null);
//       setIsLocked(true);
//     });
//   };

//   const unlockWallet = (passwordInput) => {
//     return new Promise((resolve) => {
//       chrome.storage.local.get(["wallets", "wallet", "walletPassword"], (result) => {
//         const { wallet, wallets = [], walletPassword } = result;

//         if (passwordInput === walletPassword) {
//           setSelectedWallet(wallet);
//           setIsLocked(false);
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       });
//     });
//   };

//   return (
//     <WalletContext.Provider
//       value={{ selectedWallet, switchWallet, lockWallet, unlockWallet, isLocked }}
//     >
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => useContext(WalletContext);


import { createContext, useContext, useState, useEffect } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  // Helper to get from storage
  const getStorage = () =>
    typeof chrome !== "undefined" && chrome.storage?.local
      ? chrome.storage.local
      : {
          get: (keys, cb) => {
            const result = {};
            (Array.isArray(keys) ? keys : [keys]).forEach((key) => {
              result[key] = JSON.parse(localStorage.getItem(key));
            });
            cb(result);
          },
          set: (items, cb) => {
            Object.entries(items).forEach(([key, val]) => {
              localStorage.setItem(key, JSON.stringify(val));
            });
            if (cb) cb();
          },
          remove: (key, cb) => {
            localStorage.removeItem(key);
            if (cb) cb();
          },
        };

  const storage = getStorage();

  useEffect(() => {
    storage.get(["wallet"], (result) => {
      if (result.wallet) {
        setSelectedWallet(result.wallet);
      }
    });
  }, []);

  const switchWallet = (wallet) => {
    storage.set({ wallet }, () => {
      setSelectedWallet(wallet);
    });
  };

  const lockWallet = () => {
    storage.remove("wallet", () => {
      setSelectedWallet(null);
      setIsLocked(true);
    });
  };

  const unlockWallet = (passwordInput) => {
    return new Promise((resolve) => {
      storage.get(["wallets", "wallet", "walletPassword"], (result) => {
        const { wallet, wallets = [], walletPassword } = result;

        if (passwordInput === walletPassword) {
          setSelectedWallet(wallet);
          setIsLocked(false);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  return (
    <WalletContext.Provider
      value={{ selectedWallet, switchWallet, lockWallet, unlockWallet, isLocked }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
