import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown, QrCode } from "lucide-react";
import ConfirmSend from "./ConfirmSend";
import { useNetwork } from "../../Context/NetworkContext";
import { ethers } from "ethers";

export default function SendModal({ onClose }) {
  const { selectedNetwork } = useNetwork();
  const [selectedTab, setSelectedTab] = useState("Your accounts");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [txData, setTxData] = useState(null);

  useEffect(() => {
    const storedWallet = JSON.parse(localStorage.getItem("wallet"));
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    setConnectedAccount(storedWallet);
    setAllAccounts(storedWallets);
  }, []);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!selectedNetwork?.rpcUrl) return;

      const provider = new ethers.providers.JsonRpcProvider(selectedNetwork.rpcUrl);
      const updatedBalances = {};

      for (const account of allAccounts) {
        try {
          const rawBalance = await provider.getBalance(account.address);
          updatedBalances[account.address] = ethers.utils.formatEther(rawBalance);
        } catch (error) {
          console.error("Balance fetch error for", account.address, error);
          updatedBalances[account.address] = "0.00";
        }
      }

      setBalances(updatedBalances);
    };

    fetchBalances();
  }, [allAccounts, selectedNetwork]);

  const handleContinue = () => {
    if (!recipientAddress || !amount) return;
    setTxData({ to: recipientAddress, amount });
    setShowConfirm(true);
  };

  if (showConfirm) {
    return (
      <ConfirmSend
        onBack={() => setShowConfirm(false)}
        txData={txData}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col max-w-md mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-700 relative">
        <button onClick={onClose}>
          <ChevronLeft className="absolute left-4 w-5 h-5 text-gray-400" />
        </button>
        <h1 className="text-lg font-medium text-white">Send</h1>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto">
        {/* From */}
        <div className="p-4 border-b border-gray-700">
          <label className="text-sm font-medium text-gray-300 mb-2 block">From</label>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full" />
              <div>
                <div className="font-medium text-white">
                  {connectedAccount?.name || "Account"}
                </div>
                <div className="text-sm text-gray-400">
                  {connectedAccount?.address?.slice(0, 6)}...{connectedAccount?.address?.slice(-4)}
                </div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* To Section */}
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">To</label>
            <div className="relative">
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter public address (0x...)"
                className="w-full p-3 pr-12 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <QrCode className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-3 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex border-b border-gray-700">
            {["Your accounts", "Contacts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-3 px-1 mr-8 text-sm font-medium border-b-2 ${
                  selectedTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Account List */}
        <div className="px-4 space-y-3 pb-20">
          {allAccounts.map((account, index) => {
            const shortAddress = `${account.address.slice(0, 6)}...${account.address.slice(-4)}`;
            const balance = balances[account.address] || "Loading...";
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-3 ${
                  account.address === connectedAccount?.address
                    ? "bg-gray-800 border-l-4 border-blue-500"
                    : "hover:bg-gray-800"
                } rounded-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full" />
                  <div>
                    <div className="font-medium text-white">{account.name}</div>
                    <div className="text-sm text-gray-400">{shortAddress}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{balance} {selectedNetwork.symbol}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 bg-gray-900 flex space-x-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 px-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

