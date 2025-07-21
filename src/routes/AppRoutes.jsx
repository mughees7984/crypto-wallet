// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import WalletSetup from "../components/WalletSetup";
import CreateWallet from "../components/CreateWallet";
import ImportWallet from "../components/ImportWallet";
import WalletUI from "../pages/WalletUI";
import ConfirmSend from "../components/Send/ConfirmSend";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WalletSetup />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/import" element={<ImportWallet />} />
      <Route path="/wallet" element={<WalletUI />} />
      <Route path="/confirm-send" element={<ConfirmSend />} />
    </Routes>
  );
}
