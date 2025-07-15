import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Copy,
  Menu,
  Pencil,
  Trash2,
  Check,
  Bell,
  User,
  ExternalLink,
  Shield,
  Expand,
  Puzzle,
  HelpCircle,
  Settings,
  Lock,
} from "lucide-react";
import { LuGlobe } from "react-icons/lu";
import { useNetwork } from "../Context/NetworkContext";
import { useWallet } from "../Context/WalletContext";
import { SUPPORTED_NETWORKS } from "./constants/network";
import { getAccountPath } from "ethers/lib/utils";
import { getExplorerUrl } from "../utils/getExplorerUrl";

export default function Header() {
  const [wallets, setWallets] = useState([]);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { selectedWallet, switchWallet, isLocked, lockWallet } = useWallet();
  const { selectedNetwork, setSelectedNetwork } = useNetwork();

  const walletRef = useRef();
  const networkRef = useRef();
  const menuRef = useRef();
  const editInputRef = useRef(null);

  // Load wallets on mount
  useEffect(() => {
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    setWallets(storedWallets);
  }, []);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (walletRef.current && !walletRef.current.contains(e.target)) {
        setWalletDropdownOpen(false);
        setEditIndex(null);
      }
      if (networkRef.current && !networkRef.current.contains(e.target)) {
        setNetworkDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus on edit input when editing a wallet name
  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  const truncated = selectedWallet?.address
    ? `${selectedWallet.address.slice(0, 6)}...${selectedWallet.address.slice(
        -4
      )}`
    : "No Address";

  const handleCopy = () => {
    if (!selectedWallet) return;
    navigator.clipboard.writeText(selectedWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleSwitch = (wallet) => {
    switchWallet(wallet);
    setWalletDropdownOpen(false);
  };

  const handleRename = (index) => {
    const updatedWallets = [...wallets];
    updatedWallets[index].name = editName;
    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));

    if (selectedWallet.address === updatedWallets[index].address) {
      switchWallet(updatedWallets[index]);
    }

    setEditIndex(null);
  };

  const handleDelete = (walletToDelete) => {
    const updated = wallets.filter((w) => w.address !== walletToDelete.address);
    setWallets(updated);
    localStorage.setItem("wallets", JSON.stringify(updated));

    if (walletToDelete.address === selectedWallet?.address) {
      if (updated.length > 0) {
        switchWallet(updated[0]);
      } else {
        localStorage.removeItem("wallet");
        switchWallet(null);
      }
    }
  };

  const menuItems = [
    {
      icon: Bell,
      label: "Notifications",
      badge: "New!",
      onClick: () => console.log("Notifications clicked"),
    },
    {
      icon: User,
      label: "Account details",
      onClick: () => console.log("Account details clicked"),
    },
    {
      icon: ExternalLink,
      label: "View on explorer",
      subtitle: selectedNetwork?.explorer
        ? new URL(selectedNetwork.explorer).hostname
        : "",
      onClick: () => {
        console.log("selectedNetwork", selectedNetwork);
        console.log("selectedWallet", selectedWallet);
        const url = getExplorerUrl(selectedNetwork, selectedWallet?.address);
        console.log("Explorer URL:", url);
        window.open(url, "_blank");
      },
    },

    {
      icon: Shield,
      label: "All permissions",
      onClick: () => console.log("All permissions clicked"),
    },
    {
      icon: Expand,
      label: "Expand view",
      onClick: () => console.log("Expand view clicked"),
    },
    {
      icon: Puzzle,
      label: "Snaps",
      onClick: () => console.log("Snaps clicked"),
    },
    {
      icon: HelpCircle,
      label: "Support",
      onClick: () => console.log("Support clicked"),
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => console.log("Settings clicked"),
    },
    {
      icon: Lock,
      label: "Lock MetaMask",
      onClick: () => lockWallet(),
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 relative">
      {/* === Network Dropdown === */}
      <div className="relative" ref={networkRef}>
        <div
          onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
          className="flex items-center space-x-1 cursor-pointer text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          <span>{selectedNetwork.symbol}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {networkDropdownOpen && (
          <div className="absolute mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 w-48">
            {SUPPORTED_NETWORKS.map((network) => (
              <div
                key={network.id}
                className={`px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 ${
                  selectedNetwork.id === network.id ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  setSelectedNetwork(network);
                  setNetworkDropdownOpen(false);
                }}
              >
                {network.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === Wallet Dropdown === */}
      <div className="relative" ref={walletRef}>
        <div
          className="flex items-center space-x-2 mb-2 cursor-pointer"
          onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
        >
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-300">
            {selectedWallet?.name || "Account"}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {walletDropdownOpen && (
          <div className="absolute top-10 left-0 bg-gray-800 border border-gray-700 rounded shadow-md z-50 w-52 p-1">
            {wallets.map((wallet, index) => (
              <div
                key={wallet.address}
                className="text-white text-sm px-3 py-2 hover:bg-gray-700 rounded cursor-pointer group flex justify-between items-center"
              >
                {editIndex === index ? (
                  <div className="flex items-center space-x-2 w-full">
                    <input
                      ref={editInputRef}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRename(index);
                        }
                      }}
                      className="bg-gray-700 rounded px-2 py-1 text-sm w-full"
                    />
                    <Check
                      className="w-4 h-4 text-green-400 cursor-pointer"
                      onClick={() => handleRename(index)}
                    />
                  </div>
                ) : (
                  <div
                    className="flex justify-between items-center w-full"
                    onClick={() => handleSwitch(wallet)}
                  >
                    <span
                      className={`${
                        selectedWallet?.address === wallet.address
                          ? "text-blue-400"
                          : ""
                      }`}
                    >
                      {wallet.name}
                    </span>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition">
                      <Pencil
                        className="w-4 h-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditIndex(index);
                          setEditName(wallet.name);
                        }}
                      />
                      <Trash2
                        className="w-4 h-4 cursor-pointer text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(wallet);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-400 relative">
          <span className="cursor-pointer" onClick={handleCopy}>
            {copied ? (
              <span className="text-green-400">Copied!</span>
            ) : (
              truncated
            )}
          </span>
          <Copy className="w-4 h-4 cursor-pointer" onClick={handleCopy} />
        </div>
      </div>

      {/* === Globe + Connected Tooltip (hover only on globe) === */}
      <div className="flex items-center space-x-3 relative">
        <div className="relative group">
          <LuGlobe />
          <div className="absolute right-0 top-8 bg-gray-800 text-xs px-3 py-1 rounded-md text-white hidden group-hover:block z-10 whitespace-nowrap">
            Connected to {selectedWallet?.name || "Account"}
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <Menu
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300"
            onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
          />
          {menuDropdownOpen && (
            <div className="absolute right-0 top-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 w-64 py-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-150 flex items-center space-x-3"
                  onClick={() => {
                    item.onClick();
                    setMenuDropdownOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{item.label}</span>
                      {item.badge && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-gray-400 mt-1">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


