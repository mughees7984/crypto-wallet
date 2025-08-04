import React, { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  const addTransaction = (tx) => {
    const updated = [...transactions, tx];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);


// import React, { createContext, useContext, useState, useEffect } from "react";

// const TransactionContext = createContext();

// export const TransactionProvider = ({ children }) => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     // Load transactions from chrome.storage.local on initial load
//     chrome.storage.local.get(["transactions"], (result) => {
//       if (result.transactions) {
//         setTransactions(result.transactions);
//       } else {
//         setTransactions([]);
//       }
//     });
//   }, []);

//   const addTransaction = (tx) => {
//     const updated = [...transactions, tx];
//     setTransactions(updated);

//     // Save updated transactions to chrome.storage.local
//     chrome.storage.local.set({ transactions: updated }, () => {
//       console.log("✅ Transaction saved to chrome.storage.local");
//     });
//   };

//   return (
//     <TransactionContext.Provider value={{ transactions, addTransaction }}>
//       {children}
//     </TransactionContext.Provider>
//   );
// };

// export const useTransactions = () => useContext(TransactionContext);
