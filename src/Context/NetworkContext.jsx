import React, { createContext, useState, useEffect, useContext } from "react";
import { SUPPORTED_NETWORKS } from "../components/constants/network";

const NetworkContext = createContext();

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider = ({ children }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(
    JSON.parse(localStorage.getItem("selectedNetwork")) || SUPPORTED_NETWORKS[0]
  );

  useEffect(() => {
    localStorage.setItem("selectedNetwork", JSON.stringify(selectedNetwork));
  }, [selectedNetwork]);

  // Optional: Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedNetwork");
    if (saved) {
      const network = SUPPORTED_NETWORKS.find((n) => n.id === saved);
      if (network) setSelectedNetwork(network);
    }
  }, []);

  const updateNetwork = (network) => {
    setSelectedNetwork(network);
    localStorage.setItem("selectedNetwork", network.id);
  };

  return (
    <NetworkContext.Provider value={{ selectedNetwork, setSelectedNetwork: updateNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};
