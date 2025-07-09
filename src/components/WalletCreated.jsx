// src/components/WalletCreated.jsx
import React from "react";

export default function WalletCreated({ walletInfo, onContinue }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Wallet Created 🎉</h2>

      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-1">Address:</p>
        <p className="break-all text-sm">{walletInfo.address}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-1">Mnemonic (Recovery Phrase):</p>
        <p className="bg-gray-700 p-2 rounded text-sm text-yellow-300">
          {walletInfo.mnemonic}
        </p>
      </div>

      <p className="text-xs text-red-400 mb-4">
        Save your mnemonic safely. It’s the only way to recover your wallet.
      </p>

      <button
        onClick={onContinue}
        className="bg-green-600 hover:bg-green-700 w-full py-2 rounded text-white font-semibold"
      >
        Continue to Wallet
      </button>
    </div>
  );
}
