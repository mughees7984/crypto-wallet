
// import React, { useEffect, useRef, useState } from "react";
// import { ChevronDown, Copy, Menu, Pencil, Trash2, Check } from "lucide-react";
// import { LuGlobe } from "react-icons/lu";
// import { toast } from "react-hot-toast";
// import { useNetwork } from "../Context/NetworkContext";
// import { SUPPORTED_NETWORKS } from "./constants/network";

// export default function Header() {
//   const [wallets, setWallets] = useState([]);
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editName, setEditName] = useState("");

//   const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
//   const { selectedNetwork, setSelectedNetwork } = useNetwork();

//   const walletRef = useRef();
//   const networkRef = useRef();

//   // 👉 Load wallets
//   useEffect(() => {
//     const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
//     const currentWallet = JSON.parse(localStorage.getItem("wallet"));
//     setWallets(storedWallets);
//     setSelectedWallet(currentWallet);
//   }, []);

//   // 👉 Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (walletRef.current && !walletRef.current.contains(e.target)) {
//         setWalletDropdownOpen(false);
//         setEditIndex(null);
//       }
//       if (networkRef.current && !networkRef.current.contains(e.target)) {
//         setNetworkDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // 👉 Truncate address
//   const truncated = selectedWallet?.address
//     ? `${selectedWallet.address.slice(0, 6)}...${selectedWallet.address.slice(-4)}`
//     : "No Address";

//   // 👉 Copy address
//   const handleCopy = () => {
//     if (!selectedWallet) return;
//     navigator.clipboard.writeText(selectedWallet.address);
//     toast.success("Address copied!");
//   };

//   // 👉 Switch wallet
//   const handleSwitch = (wallet) => {
//     localStorage.setItem("wallet", JSON.stringify(wallet));
//     localStorage.setItem("walletAddress", wallet.address);
//     setSelectedWallet(wallet);
//     setWalletDropdownOpen(false);
//     toast.success(`Switched to ${wallet.name}`);
//   };

//   // 👉 Rename wallet
//   const handleRename = (index) => {
//     const updatedWallets = [...wallets];
//     updatedWallets[index].name = editName;
//     setWallets(updatedWallets);
//     localStorage.setItem("wallets", JSON.stringify(updatedWallets));

//     if (selectedWallet.address === updatedWallets[index].address) {
//       localStorage.setItem("wallet", JSON.stringify(updatedWallets[index]));
//       setSelectedWallet(updatedWallets[index]);
//     }

//     toast.success("Wallet renamed!");
//     setEditIndex(null);
//   };

//   // 👉 Delete wallet
//   const handleDelete = (walletToDelete) => {
//     const updated = wallets.filter((w) => w.address !== walletToDelete.address);
//     setWallets(updated);
//     localStorage.setItem("wallets", JSON.stringify(updated));

//     if (walletToDelete.address === selectedWallet?.address) {
//       if (updated.length > 0) {
//         localStorage.setItem("wallet", JSON.stringify(updated[0]));
//         setSelectedWallet(updated[0]);
//       } else {
//         localStorage.removeItem("wallet");
//         setSelectedWallet(null);
//       }
//     }

//     toast.success("Wallet deleted");
//   };

//   return (
//     <div className="flex items-center justify-between p-4 border-b border-gray-800 relative">
//       {/* === Network Symbol Dropdown === */}
//       <div className="relative" ref={networkRef}>
//         <div
//           onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
//           className="flex items-center space-x-1 cursor-pointer text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
//         >
//           <span>{selectedNetwork.symbol}</span>
//           <ChevronDown className="w-4 h-4 text-gray-400" />
//         </div>

//         {networkDropdownOpen && (
//           <div className="absolute mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 w-48">
//             {SUPPORTED_NETWORKS.map((network) => (
//               <div
//                 key={network.id}
//                 className={`px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 ${
//                   selectedNetwork.id === network.id ? "bg-gray-700" : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedNetwork(network);
//                   setNetworkDropdownOpen(false);
//                   toast.success(`Switched to ${network.name}`);
//                 }}
//               >
//                 {network.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* === Wallet Name Dropdown === */}
//       <div className="relative" ref={walletRef}>
//         <div
//           className="flex items-center space-x-2 mb-2 cursor-pointer"
//           onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
//         >
//           <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
//           <span className="text-sm text-gray-300">
//             {selectedWallet?.name || "Account"}
//           </span>
//           <ChevronDown className="w-4 h-4 text-gray-400" />
//         </div>

//         {walletDropdownOpen && (
//           <div className="absolute top-10 left-0 bg-gray-800 border border-gray-700 rounded shadow-md z-50 w-52 p-1">
//             {wallets.map((wallet, index) => (
//               <div
//                 key={wallet.address}
//                 className="text-white text-sm px-3 py-2 hover:bg-gray-700 rounded cursor-pointer group flex justify-between items-center"
//               >
//                 {editIndex === index ? (
//                   <div className="flex items-center space-x-2 w-full">
//                     <input
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="bg-gray-700 rounded px-2 py-1 text-sm w-full"
//                     />
//                     <Check
//                       className="w-4 h-4 text-green-400 cursor-pointer"
//                       onClick={() => handleRename(index)}
//                     />
//                   </div>
//                 ) : (
//                   <div
//                     className="flex justify-between items-center w-full"
//                     onClick={() => handleSwitch(wallet)}
//                   >
//                     <span
//                       className={`${
//                         selectedWallet?.address === wallet.address
//                           ? "text-blue-400"
//                           : ""
//                       }`}
//                     >
//                       {wallet.name}
//                     </span>
//                     <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition">
//                       <Pencil
//                         className="w-4 h-4 cursor-pointer"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setEditIndex(index);
//                           setEditName(wallet.name);
//                         }}
//                       />
//                       <Trash2
//                         className="w-4 h-4 cursor-pointer text-red-500"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDelete(wallet);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center space-x-2 text-sm text-gray-400">
//           <span>{truncated}</span>
//           <Copy className="w-4 h-4 cursor-pointer" onClick={handleCopy} />
//         </div>
//       </div>

//       {/* === Connected Globe & Menu Icon === */}
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


import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Copy, Menu, Pencil, Trash2, Check } from "lucide-react";
import { LuGlobe } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { useNetwork } from "../Context/NetworkContext";
import { SUPPORTED_NETWORKS } from "./constants/network";
import { switchToNetwork } from "../utils/switchToNetwork"; // ✅ NEW

export default function Header() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");

  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const { selectedNetwork, setSelectedNetwork } = useNetwork();

  const walletRef = useRef();
  const networkRef = useRef();

  useEffect(() => {
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    const currentWallet = JSON.parse(localStorage.getItem("wallet"));
    setWallets(storedWallets);
    setSelectedWallet(currentWallet);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (walletRef.current && !walletRef.current.contains(e.target)) {
        setWalletDropdownOpen(false);
        setEditIndex(null);
      }
      if (networkRef.current && !networkRef.current.contains(e.target)) {
        setNetworkDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const truncated = selectedWallet?.address
    ? `${selectedWallet.address.slice(0, 6)}...${selectedWallet.address.slice(-4)}`
    : "No Address";

  const handleCopy = () => {
    if (!selectedWallet) return;
    navigator.clipboard.writeText(selectedWallet.address);
    toast.success("Address copied!");
  };

  const handleSwitch = (wallet) => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    localStorage.setItem("walletAddress", wallet.address);
    setSelectedWallet(wallet);
    setWalletDropdownOpen(false);
    toast.success(`Switched to ${wallet.name}`);
  };

  const handleRename = (index) => {
    const updatedWallets = [...wallets];
    updatedWallets[index].name = editName;
    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));

    if (selectedWallet.address === updatedWallets[index].address) {
      localStorage.setItem("wallet", JSON.stringify(updatedWallets[index]));
      setSelectedWallet(updatedWallets[index]);
    }

    toast.success("Wallet renamed!");
    setEditIndex(null);
  };

  const handleDelete = (walletToDelete) => {
    const updated = wallets.filter((w) => w.address !== walletToDelete.address);
    setWallets(updated);
    localStorage.setItem("wallets", JSON.stringify(updated));

    if (walletToDelete.address === selectedWallet?.address) {
      if (updated.length > 0) {
        localStorage.setItem("wallet", JSON.stringify(updated[0]));
        setSelectedWallet(updated[0]);
      } else {
        localStorage.removeItem("wallet");
        setSelectedWallet(null);
      }
    }

    toast.success("Wallet deleted");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 relative">
      {/* === Network Symbol Dropdown === */}
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
                onClick={async () => {
                  if (network.chainId) {
                    await switchToNetwork(network); // ✅ Auto switch MetaMask if EVM
                  }
                  setSelectedNetwork(network);
                  setNetworkDropdownOpen(false);
                  toast.success(`Switched to ${network.name}`);
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
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
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

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{truncated}</span>
          <Copy className="w-4 h-4 cursor-pointer" onClick={handleCopy} />
        </div>
      </div>

      {/* === Connected Globe & Menu Icon === */}
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
