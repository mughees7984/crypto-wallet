


import React from "react";
import { useTransactions } from "../Context/TransactionContext";

export default function ActivityContent() {
  const { transactions } = useTransactions();

  return (
    <div className="px-4 pb-6">
      <div className="text-sm text-gray-400 mb-2">Sepolia ▼</div>
      {transactions.length === 0 ? (
        <div className="text-gray-500 text-sm mt-4">No recent activity.</div>
      ) : (
        transactions
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((tx, index) => (
            <div
              key={index}
              className="flex items-start py-3 border-b border-gray-800"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <div className="text-purple-400 text-xl">↗</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{tx.type}</span>
                  <span className="text-right text-red-400 font-medium">
                    -{tx.amount} {tx.symbol}
                  </span>
                </div>
                <div className="text-green-500 text-sm">{tx.status}</div>
                <div className="text-gray-400 text-sm">{tx.date}</div>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

