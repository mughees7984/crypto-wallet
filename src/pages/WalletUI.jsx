// src/pages/WalletUI.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Balance from "../components/Balance";
import ActionButtons from "../components/ActionButtons";
import SolanaBanner from "../components/SolanaBanner";
import Tabs from "../components/Tabs";
import TokenContent from "../components/TokenContent";
import NFTsContent from "../components/NFTsContent";
import ActivityContent from "../components/ActivityContent";

export default function WalletUI() {
  const { state } = useLocation();
  const walletAddress = state?.address || "0x0000...";
  const [activeTab, setActiveTab] = useState("Tokens");

  return (
    <div className="bg-gray-900 text-white min-h-screen max-w-md mx-auto">
      <Header address={walletAddress} />
      <Balance />
      <ActionButtons />
      <SolanaBanner />
      <div className="flex justify-center space-x-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === 0 ? "bg-white" : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Tokens" && <TokenContent />}
      {activeTab === "NFTs" && <NFTsContent />}
      {activeTab === "Activity" && <ActivityContent />}
    </div>
  );
}
