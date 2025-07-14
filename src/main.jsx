import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NetworkProvider } from "./Context/NetworkContext.jsx";
import { WalletProvider } from "./Context/WalletContext.jsx";
import { TransactionProvider } from "./Context/TransactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NetworkProvider>
      <WalletProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </WalletProvider>
    </NetworkProvider>
  </StrictMode>
);
