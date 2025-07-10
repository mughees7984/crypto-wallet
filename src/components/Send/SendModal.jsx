// import React, { useState } from 'react';
// import { ChevronLeft, ChevronDown, QrCode } from 'lucide-react';

// export default function SendModal() {
//   const [selectedTab, setSelectedTab] = useState('Your accounts');
//   const [recipientAddress, setRecipientAddress] = useState('');

//   return (
//     <div className="bg-gray-900 min-h-screen max-w-md mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-center p-4 border-b border-gray-700 relative">
//         <ChevronLeft className="absolute left-4 w-5 h-5 text-gray-400" />
//         <h1 className="text-lg font-medium text-white">Send</h1>
//       </div>

//       {/* From Section */}
//       <div className="p-4 border-b border-gray-700">
//         <div className="mb-2">
//           <label className="text-sm font-medium text-gray-300">From</label>
//         </div>
//         <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
//               <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full"></div>
//             </div>
//             <div>
//               <div className="font-medium text-white">Account 2</div>
//               <div className="text-sm text-gray-400">0xB44Ea...011Fa</div>
//             </div>
//           </div>
//           <ChevronDown className="w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       {/* To Section */}
//       <div className="p-4">
//         <div className="mb-2">
//           <label className="text-sm font-medium text-gray-300">To</label>
//         </div>
//         <div className="relative">
//           <input
//             type="text"
//             value={recipientAddress}
//             onChange={(e) => setRecipientAddress(e.target.value)}
//             placeholder="Enter public address (0x) or domain name"
//             className="w-full p-3 pr-12 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <QrCode className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="px-4 mb-4">
//         <div className="flex border-b border-gray-700">
//           {['Your accounts', 'Contacts'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`pb-3 px-1 mr-8 text-sm font-medium border-b-2 ${
//                 selectedTab === tab
//                   ? 'border-white text-white'
//                   : 'border-transparent text-gray-400 hover:text-gray-300'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Account List */}
//       <div className="px-4 space-y-3">
//         {/* Account 1 */}
//         <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center relative">
//               <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full"></div>
//               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
//             </div>
//             <div>
//               <div className="font-medium text-white">Account 1</div>
//               <div className="text-sm text-gray-400">0x7192e...af2f4</div>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="font-medium text-white">$0.00 USD</div>
//             <div className="text-sm text-gray-400 flex items-center">
//               <span className="w-4 h-4 bg-blue-500 rounded-full mr-1"></span>
//               <span className="w-4 h-4 bg-purple-500 rounded-full mr-1"></span>
//               <span className="text-xs">+3</span>
//             </div>
//           </div>
//         </div>

//         {/* Account 2 - Selected */}
//         <div className="flex items-center justify-between p-3 bg-gray-800 border-l-4 border-blue-500 rounded-lg">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center relative">
//               <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full"></div>
//               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
//             </div>
//             <div>
//               <div className="font-medium text-white">Account 2</div>
//               <div className="text-sm text-gray-400">0xB44Ea...011Fa</div>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="font-medium text-white">$0.00 USD</div>
//             <div className="text-sm text-gray-400 flex items-center">
//               <span className="w-4 h-4 bg-blue-500 rounded-full mr-1"></span>
//               <span className="w-4 h-4 bg-purple-500 rounded-full mr-1"></span>
//               <span className="text-xs">+3</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Buttons */}
//       <div className="absolute bottom-6 left-4 right-4 flex space-x-3">
//         <button className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
//           Cancel
//         </button>
//         <button className="flex-1 py-3 px-4 bg-blue-300 text-blue-800 font-medium rounded-lg">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, QrCode } from 'lucide-react';

export default function SendModal({ onClose }) {
  const [selectedTab, setSelectedTab] = useState('Your accounts');
  const [recipientAddress, setRecipientAddress] = useState('');
  

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
        {/* From Section */}
        <div className="p-4 border-b border-gray-700">
          <label className="text-sm font-medium text-gray-300 mb-2 block">From</label>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full"></div>
              </div>
              <div>
                <div className="font-medium text-white">Account 2</div>
                <div className="text-sm text-gray-400">0xB44Ea...011Fa</div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* To Section */}
        <div className="p-4">
          <label className="text-sm font-medium text-gray-300 mb-2 block">To</label>
          <div className="relative">
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter public address (0x) or domain name"
              className="w-full p-3 pr-12 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <QrCode className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex border-b border-gray-700">
            {['Your accounts', 'Contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-3 px-1 mr-8 text-sm font-medium border-b-2 ${
                  selectedTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Account List */}
        <div className="px-4 space-y-3 pb-20">
          {/* Example accounts (replace with dynamic list later) */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full" />
              <div>
                <div className="font-medium text-white">Account 1</div>
                <div className="text-sm text-gray-400">0x7192e...af2f4</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-white">$0.00 USD</div>
              <div className="text-sm text-gray-400 flex items-center">
                <span className="w-4 h-4 bg-blue-500 rounded-full mr-1"></span>
                <span className="w-4 h-4 bg-purple-500 rounded-full mr-1"></span>
                <span className="text-xs">+3</span>
              </div>
            </div>
          </div>

          {/* Selected Account 2 */}
          <div className="flex items-center justify-between p-3 bg-gray-800 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full" />
              <div>
                <div className="font-medium text-white">Account 2</div>
                <div className="text-sm text-gray-400">0xB44Ea...011Fa</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-white">$0.00 USD</div>
              <div className="text-sm text-gray-400 flex items-center">
                <span className="w-4 h-4 bg-blue-500 rounded-full mr-1"></span>
                <span className="w-4 h-4 bg-purple-500 rounded-full mr-1"></span>
                <span className="text-xs">+3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 bg-gray-900 flex space-x-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Cancel
        </button>
        <button className="flex-1 py-3 px-4 bg-blue-300 text-blue-800 font-medium rounded-lg">
          Continue
        </button>
      </div>
    </div>
  );
}
