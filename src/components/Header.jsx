// import React from "react";
// import { ChevronDown, Copy, Menu } from "lucide-react";
// import { LuGlobe } from "react-icons/lu";

// export default function Header({ address }) {
//   const truncated = address
//     ? `${address.slice(0, 6)}...${address.slice(-4)}`
//     : "No Address";

//   return (
//     <div className="flex items-center justify-between p-4 border-b border-gray-800">
//       <div className="flex items-center space-x-3">
//         <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
//           <span className="text-white font-semibold">S</span>
//         </div>
//         <ChevronDown className="w-4 h-4 text-gray-400" />
//       </div>

//       <div>
//         <div className="flex items-center space-x-2 mb-2">
//           <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
//           <span className="text-sm text-gray-300">Account 1</span>
//           <ChevronDown className="w-4 h-4 text-gray-400" />
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-gray-400">
//           <span>{truncated}</span>
//           <Copy className="w-4 h-4" />
//         </div>
//       </div>

//       <div className="flex items-center space-x-3 group relative cursor-pointer">
//         <LuGlobe />
//         <Menu className="w-5 h-5 text-gray-400" />
//         <div className="absolute right-0 top-8 bg-gray-800 text-xs px-3 py-1 rounded-md text-white hidden group-hover:block z-10 whitespace-nowrap">
//           Account Connected
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { ChevronDown, Copy, Menu } from "lucide-react";
import { LuGlobe } from "react-icons/lu";
import { toast } from "react-hot-toast";

export default function Header() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Load wallets from localStorage
  useEffect(() => {
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    const currentWallet = JSON.parse(localStorage.getItem("wallet"));
    setWallets(storedWallets);
    setSelectedWallet(currentWallet);
  }, []);

  // Truncate address
  const truncated = selectedWallet?.address
    ? `${selectedWallet.address.slice(0, 6)}...${selectedWallet.address.slice(-4)}`
    : "No Address";

  // Copy address to clipboard
  const handleCopy = () => {
    if (!selectedWallet) return;
    navigator.clipboard.writeText(selectedWallet.address);
    toast.success("Address copied!");
  };

  // Switch account
  const handleSwitch = (wallet) => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    localStorage.setItem("walletAddress", wallet.address);
    setSelectedWallet(wallet);
    setDropdownOpen(false);
    toast.success(`Switched to ${wallet.name}`);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 relative">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">S</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      <div className="relative">
        <div
          className="flex items-center space-x-2 mb-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-300">
            {selectedWallet?.name || "Account"}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {dropdownOpen && (
          <div className="absolute top-10 left-0 bg-gray-800 border border-gray-700 rounded shadow-md z-50 w-40">
            {wallets.map((wallet, index) => (
              <div
                key={wallet.address}
                onClick={() => handleSwitch(wallet)}
                className={`px-3 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer ${
                  selectedWallet?.address === wallet.address ? "bg-gray-700" : ""
                }`}
              >
                {wallet.name}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{truncated}</span>
          <Copy className="w-4 h-4 cursor-pointer" onClick={handleCopy} />
        </div>
      </div>

      <div className="flex items-center space-x-3 group relative cursor-pointer">
        <LuGlobe />
        <Menu className="w-5 h-5 text-gray-400" />
        <div className="absolute right-0 top-8 bg-gray-800 text-xs px-3 py-1 rounded-md text-white hidden group-hover:block z-10 whitespace-nowrap">
          Account Connected
        </div>
      </div>
    </div>
  );
}
