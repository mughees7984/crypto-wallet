import React from "react";
import { useNavigate } from "react-router-dom";

export default function WalletSetup() {
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    navigate("/create-wallet");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Mughees Wallet</h1>
      <p className="text-gray-400 mb-6">Securely manage your crypto across multiple networks.</p>
      <button
        onClick={handleCreateWallet}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-lg font-medium"
      >
        Create New Wallet
      </button>
    </div>
  );
}
