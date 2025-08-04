// src/pages/ConnectPage.jsx
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
// import "./popup.css"; 

const ConnectPage = () => {
  const [origin, setOrigin] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_CONNECTION_REQUEST" }, (response) => {
      setOrigin(response?.origin || "Unknown Site");
    });

    chrome.storage.local.get("selectedWallet", (result) => {
      setSelectedWallet(result.selectedWallet || "");
    });
  }, []);

  const handleApprove = () => {
    chrome.runtime.sendMessage({
      type: "WALLET_CONNECTED",
      payload: { approved: true, address: selectedWallet },
    });
    window.close();
  };

  const handleReject = () => {
    chrome.runtime.sendMessage({
      type: "WALLET_CONNECTED",
      payload: { approved: false },
    });
    window.close();
  };

  return (
    <div className="p-6 text-white bg-[#1a1a1a] h-full flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4">Connection Request</h2>
      <p className="mb-2 text-sm text-gray-400">Site wants to connect:</p>
      <div className="mb-6 px-4 py-2 bg-gray-800 rounded">{origin}</div>

      <button
        className="bg-green-600 px-4 py-2 rounded mb-2 hover:bg-green-700"
        onClick={handleApprove}
      >
        Connect
      </button>
      <button
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        onClick={handleReject}
      >
        Reject
      </button>
    </div>
  );
};

// Mount to DOM
const root = createRoot(document.getElementById("root"));
root.render(<ConnectPage />);
