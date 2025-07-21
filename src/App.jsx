import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Balance from "./components/Balance";
import ActionButtons from "./components/ActionButtons";
import SolanaBanner from "./components/SolanaBanner";
import Tabs from "./components/Tabs";
import TokenContent from "./components/TokenContent";
import NFTsContent from "./components/NFTsContent";
import ActivityContent from "./components/ActivityContent";
import AppRoutes from "./routes/AppRoutes";
import WalletSetup from "./components/WalletSetup";
import CreateWallet from "./components/CreateWallet";
import ImportWallet from "./components/ImportWallet";
import SendModal from "./components/Send/SendModal";
import ReceiveModal from "./components/Receive/ReceiveModal";
import ConfirmSend from "./components/Send/ConfirmSend";

export default function App() {
  return (
    <>
      <div className="w-[360px] bg-gray-900 text-white min-h-screen overflow-y-auto">
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoutes />
      </div>
    </>
  );
}
