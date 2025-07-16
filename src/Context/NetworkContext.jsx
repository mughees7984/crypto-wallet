

import React, { createContext, useContext, useState, useEffect } from "react";
import { SUPPORTED_NETWORKS } from "../components/constants/network";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  // 🟡 Step 1: Default to first network
  const [selectedNetwork, setSelectedNetwork] = useState(SUPPORTED_NETWORKS[0]);

  // 🟡 Step 2: Load from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("selectedNetwork");
      if (stored) {
        // Instead of JSON.parse, find by ID
        const match = SUPPORTED_NETWORKS.find((n) => n.id === stored);
        if (match) setSelectedNetwork(match);
      }
    } catch (err) {
      console.error("Failed to load network:", err);
    }
  }, []);

  // 🟡 Step 3: Save network ID (not full object) to storage
  useEffect(() => {
    if (selectedNetwork?.id) {
      localStorage.setItem("selectedNetwork", selectedNetwork.id);
    }
  }, [selectedNetwork]);

  return (
    <NetworkContext.Provider value={{ selectedNetwork, setSelectedNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
