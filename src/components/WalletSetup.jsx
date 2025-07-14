import React from "react";
import { useNavigate } from "react-router-dom";

export default function WalletSetup() {
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    navigate("/create-wallet");
  };

  return (
    <div className="flex justify-center ">
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Crypto Wallet</h1>
        <p className="text-gray-400 mb-6 px-4">
          Securely manage your crypto across multiple networks.
        </p>
        <button
          onClick={handleCreateWallet}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-lg font-medium"
        >
          Create New Wallet
        </button>
      </div>
    </div>
  );
}
