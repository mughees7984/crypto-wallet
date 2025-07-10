import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Balance from "./components/Balance";
import ActionButtons from "./components/ActionButtons";
import SolanaBanner from "./components/SolanaBanner";
import Tabs from "./components/Tabs";
import TokenContent from "./components/TokenContent";
import NFTsContent from "./components/NFTsContent";
import ActivityContent from "./components/ActivityContent";

 import WalletSetup from "./components/WalletSetup";       // Welcome page with Create Wallet
import CreateWallet from "./components/CreateWallet";     // Wallet generation screen
import ImportWallet from "./pages/ImportWallet";

function WalletUI() {
  const { state } = useLocation();
  const walletAddress = state?.address || "0x0000..."
  const [activeTab, setActiveTab] = useState("Tokens");

  const [isSendOpen, setIsSendOpen] = useState(false);

   // ✅ If Send is open, render SendModal fullscreen
  if (isSendOpen) {
    return <SendModal onClose={() => setIsSendOpen(false)} />;
  }

  return (
    <div className="bg-gray-900  text-white min-h-screen max-w-md  mx-auto">
      <Header address={walletAddress} />
      <Balance />
      <ActionButtons onSendClick={() => setIsSendOpen(true)} />
      <SolanaBanner />
      <div className="flex justify-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Tokens" && <TokenContent />}
      {activeTab === "NFTs" && <NFTsContent />}
      {activeTab === "Activity" && <ActivityContent />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletSetup />} />
        <Route path="/create-wallet" element={<CreateWallet />} />
         <Route path="/import" element={<ImportWallet />} />
        <Route path="/wallet" element={<WalletUI />} />
      </Routes>
    </Router>
  );
}


