// import React from "react";
// import Navbar from "./components/Navbar";
// import WalletOverview from "./components/WalletOverview";
// import TokenList from "./components/TokenList";
// import SendForm from "./components/SendForm";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />
//       <main className="p-6 max-w-5xl mx-auto space-y-6">
//         <WalletOverview />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <TokenList />
//           <SendForm />
//         </div>
//       </main>
//     </div>
//   );
// }

// import React from "react";
// import { MdOutlineFileCopy } from "react-icons/md";

// // Icon map for inline SVG icons
// const iconMap = {
//   ChevronDown: <path d="m6 9 6 6 6-6" />,
//   Globe: (
//     <>
//       <circle cx="12" cy="12" r="10" />
//       <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
//       <path d="M2 12h20" />
//     </>
//   ),
//   Menu: (
//     <>
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </>
//   ),
//   Eye: (
//     <>
//       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
//       <circle cx="12" cy="12" r="3" />
//     </>
//   ),
//   ExternalLink: (
//     <>
//       <path d="M15 3h6v6" />
//       <path d="M10 14 21 3" />
//       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
//     </>
//   ),
//   X: (
//     <>
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </>
//   ),
//   Wallet: (
//     <>
//       <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
//       <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
//       <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4Z" />
//     </>
//   ),
//   ArrowLeftRight: (
//     <>
//       <path d="M17 11H3" />
//       <path d="m11 7-4 4 4 4" />
//       <path d="M7 13h18" />
//       <path d="m17 17 4-4-4-4" />
//     </>
//   ),
//   Repeat2: (
//     <>
//       <path d="M2.83 2.83a4 4 0 0 1 6.86 1.15L12 7l-2.31 2.31a4 4 0 0 1-1.15 6.86" />
//       <path d="m21.17 21.17a4 4 0 0 0-6.86-1.15L12 17l2.31-2.31a4 4 0 0 0 1.15-6.86" />
//     </>
//   ),
//   ArrowUpRight: (
//     <>
//       <path d="M7 7h10v10" />
//       <path d="M7 17 17 7" />
//     </>
//   ),
//   ArrowDownLeft: (
//     <>
//       <path d="M17 17H7V7" />
//       <path d="m17 7-10 10" />
//     </>
//   ),
// };

// // Icon component
// const Icon = ({ name, size = 20, className = "" }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     viewBox="0 0 24 24"
//     width={size}
//     height={size}
//     className={`inline-block ${className}`}
//   >
//     {iconMap[name] || <circle cx="12" cy="12" r="10" />}
//   </svg>
// );

// export default function App() {
//   const actionButtons = [
//     { label: "Buy/Sell", icon: "Wallet" },
//     { label: "Swap", icon: "ArrowLeftRight" },
//     { label: "Bridge", icon: "Repeat2" },
//     { label: "Send", icon: "ArrowUpRight" },
//     { label: "Receive", icon: "ArrowDownLeft" },
//   ];

//   const tabs = ["Tokens", "NFTs", "Activity"];

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 font-inter">
//       <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b border-gray-800">
//           <div className="flex justify-between items-center space-x-2">
//             <div className="w-14 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//               S <Icon name="ChevronDown" size={16} className="ml-1" />
//             </div>
//             <div className="flex flex-col items-center justify-between pl-20 text-sm font-semibold">
//               <div className="flex items-center justify-center space-y-6">
//                 Account 1 <Icon name="ChevronDown" size={16} className="ml-1" />
//               </div>
//               <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1 text-xs">
//                 0x7192e...af2f4{" "}
//                 <MdOutlineFileCopy size={18} className="mr-1" />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Icon name="Globe" size={20} className="text-gray-400" />
//             <Icon name="Menu" size={20} className="text-gray-400" />
//           </div>
//         </div>

//         {/* Balance */}
//         <div className="p-4 border-b border-gray-800">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold">0.1843 SepoliaETH</h1>
//             <Icon name="Eye" size={20} className="text-gray-400" />
//           </div>
//           <div className="flex items-center text-sm text-gray-400 mt-1">
//             +$0 (+0.00%)
//             <a
//               href="#"
//               className="text-blue-400 hover:underline ml-2 flex items-center"
//             >
//               Portfolio <Icon name="ExternalLink" size={14} className="ml-1" />
//             </a>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-around p-4 border-b border-gray-800">
//           {actionButtons.map((btn) => (
//             <div
//               key={btn.label}
//               className="flex flex-col items-center text-gray-300"
//             >
//               <div className="bg-gray-800 rounded-full p-3 mb-1">
//                 <Icon name={btn.icon} size={20} className="text-white" />
//               </div>
//               <span className="text-xs">{btn.label}</span>
//             </div>
//           ))}
//         </div>

//         {/* Solana Banner */}
//         <div className="bg-purple-700 bg-opacity-30 rounded-lg m-4 p-3 flex items-center justify-between text-sm">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//               S
//             </div>
//             <div>
//               <p className="font-semibold">Solana is now supported</p>
//               <p className="text-gray-300 text-xs">
//                 Create a Solana account to get started
//               </p>
//             </div>
//           </div>
//           <Icon name="X" size={18} className="text-gray-400" />
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center space-x-2 my-4">
//           {[0, 1, 2, 3, 4].map((i) => (
//             <div
//               key={i}
//               className={`w-2 h-2 rounded-full ${
//                 i === 0 ? "bg-gray-600" : "bg-gray-800"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-800 px-4">
//           {tabs.map((tab) => (
//             <div
//               key={tab}
//               className={`flex-1 py-3 text-center text-sm font-semibold relative ${
//                 tab === "Tokens" ? "text-blue-400" : "text-gray-400"
//               }`}
//             >
//               {tab}
//               {tab === "Tokens" && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-t-sm"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Token List */}
//         <div className="p-4">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center text-sm font-semibold text-gray-300">
//               Sepolia <Icon name="ChevronDown" size={16} className="ml-1" />
//             </div>
//             <div className="flex items-center space-x-2 text-gray-400">
//               <span>☰</span>
//               <span>⋮</span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                 S
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-100">SepoliaETH</p>
//                 <p className="text-gray-400 text-xs">
//                   No conversion rate available
//                 </p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold text-gray-100">0.18425</p>
//               <p className="text-gray-400 text-xs">SepoliaETH</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import {
//   ChevronDown,
//   Copy,
//   Eye,
//   MoreHorizontal,
//   Settings,
//   Menu,
//   ArrowUpRight,
//   ArrowDownLeft,
//   ArrowLeftRight,
//   Send,
//   Download,
//   Filter,
// } from "lucide-react";
// // import { IoGlobeOutline } from "react-icons/io5";
// import { LuGlobe } from "react-icons/lu";

// export default function CryptoWallet() {
//   const [activeTab, setActiveTab] = useState("Tokens");

//   return (
//     <div className="bg-gray-900 text-white min-h-screen max-w-md mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-800">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
//             <span className="text-white font-semibold">S</span>
//           </div>
//           <ChevronDown className="w-4 h-4 text-gray-400" />
//         </div>

//         {/* Account Info */}
//         <div>
//           <div className="flex items-center space-x-2 mb-2">
//             <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
//             <span className="text-sm text-gray-300">Account 1</span>
//             <ChevronDown className="w-4 h-4 text-gray-400" />
//           </div>
//           <div className="flex items-center space-x-2 text-sm text-gray-400">
//             <span>0x7192e...af2f4</span>
//             <Copy className="w-4 h-4" />
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           {/* <IoGlobeOutline /> */}
//           <LuGlobe />
//           <Menu className="w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       {/* Balance */}
//       <div className="p-6 flex flex-col items-start">
//         <div className="flex items-center justify-center space-x-2 mb-2">
//           <h1 className="text-3xl font-light">0.1843 SepoliaETH</h1>
//           <Eye className="w-5 h-5 text-gray-400" />
//         </div>
//         <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
//           <span>+$0 (+0.00%)</span>
//           <span className="text-blue-400 underline">Portfolio ↗</span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="px-6 mb-6">
//         <div className="flex justify-between">
//           <button className="flex flex-col items-center space-y-2">
//             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
//               <ArrowUpRight className="w-5 h-5 text-gray-300" />
//             </div>
//             <span className="text-xs text-gray-400">Buy/Sell</span>
//           </button>
//           <button className="flex flex-col items-center space-y-2">
//             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
//               <ArrowLeftRight className="w-5 h-5 text-gray-300" />
//             </div>
//             <span className="text-xs text-gray-400">Swap</span>
//           </button>
//           <button className="flex flex-col items-center space-y-2">
//             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
//               <div className="w-5 h-5 bg-gray-600 rounded"></div>
//             </div>
//             <span className="text-xs text-gray-400">Bridge</span>
//           </button>
//           <button className="flex flex-col items-center space-y-2">
//             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
//               <Send className="w-5 h-5 text-gray-300" />
//             </div>
//             <span className="text-xs text-gray-400">Send</span>
//           </button>
//           <button className="flex flex-col items-center space-y-2">
//             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
//               <Download className="w-5 h-5 text-gray-300" />
//             </div>
//             <span className="text-xs text-gray-400">Receive</span>
//           </button>
//         </div>
//       </div>

//       {/* Solana Banner */}
//       <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//             <span className="text-white font-semibold">C</span>
//           </div>
//           <div>
//             <div className="font-medium text-white">
//               Solana is now supported
//             </div>
//             <div className="text-sm text-white text-opacity-80">
//               Create a Solana account to get started
//             </div>
//           </div>
//         </div>
//         <button className="text-white text-opacity-60 hover:text-opacity-100">
//           <span className="text-xl">×</span>
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex justify-center space-x-2 mb-6">
//         <div className="w-2 h-2 bg-white rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
//         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
//       </div>

//       {/* Tabs */}
//       <div className="px-4 mb-4">
//         <div className="flex justify-around border-b border-gray-800">
//           {["Tokens", "NFTs", "Activity"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 px-1 text-lg font-medium border-b-2 ${
//                 activeTab === tab
//                   ? "border-white text-white"
//                   : "border-transparent text-gray-400 hover:text-gray-300"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Token Content */}
//       {activeTab === "Tokens" && (
//         <div className="px-4">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium">Sepolia</span>
//               <ChevronDown className="w-4 h-4 text-gray-400" />
//             </div>
//             <div className="flex items-center space-x-3">
//               <Filter className="w-5 h-5 text-gray-400" />
//               <MoreHorizontal className="w-5 h-5 text-gray-400" />
//             </div>
//           </div>

//           <div className="flex items-center justify-between py-4 border-b border-gray-800">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">S</span>
//               </div>
//               <div>
//                 <div className="font-medium">SepoliaETH</div>
//                 <div className="text-sm text-gray-400">
//                   No conversion rate available
//                 </div>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="font-medium">0.18425 SepoliaETH</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === "NFTs" && (
//         <div className="px-4 py-8 text-center text-gray-400">
//           <div className="text-sm">No NFTs to display</div>
//         </div>
//       )}

//       {activeTab === "Activity" && (
//         <div className="px-4 py-8 text-center text-gray-400">
//           <div className="text-sm">No recent activity</div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import ActionButtons from "./components/ActionButtons";
import SolanaBanner from "./components/SolanaBanner";
import Tabs from "./components/Tabs";
import TokenContent from "./components/TokenContent";
import NFTsContent from "./components/NFTsContent";
import ActivityContent from "./components/ActivityContent";

export default function App() {
  const [activeTab, setActiveTab] = useState("Tokens");

  return (
    <div className="bg-gray-900 text-white min-h-screen max-w-md mx-auto">
      <Header />
      <Balance />
      <ActionButtons />
      <SolanaBanner />
      <div className="flex justify-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Tokens" && <TokenContent />}
      {activeTab === "NFTs" && <NFTsContent />}
      {activeTab === "Activity" && <ActivityContent />}
    </div>
  );
}
