// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import WalletSetup from "../components/WalletSetup";
import CreateWallet from "../components/CreateWallet";
import ImportWallet from "../pages/ImportWallet";
import WalletUI from "../pages/WalletUI";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WalletSetup />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/import" element={<ImportWallet />} />
      <Route path="/wallet" element={<WalletUI />} />
    </Routes>
  );
}
