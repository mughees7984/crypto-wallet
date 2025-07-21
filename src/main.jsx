import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { NetworkProvider } from "./Context/NetworkContext.jsx";
import { WalletProvider } from "./Context/WalletContext.jsx";
import { TransactionProvider } from "./Context/TransactionContext.jsx";
import { BalanceProvider } from "./Context/BalanceContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <NetworkProvider>
        <WalletProvider>
          <TransactionProvider>
            <BalanceProvider>
              <App />
            </BalanceProvider>
          </TransactionProvider>
        </WalletProvider>
      </NetworkProvider>
    </HashRouter>
  </StrictMode>
);
