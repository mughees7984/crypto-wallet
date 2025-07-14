

import React, { useState } from "react";
import { ArrowUpRight, ArrowLeftRight, Send, Download } from "lucide-react";
import SendModal from "./Send/SendModal";
import ReceiveModal from "./Receive/ReceiveModal";

export default function ActionButtons({ onSendClick }) {
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  return (
    <div className="px-6 mb-6">
      <div className="flex justify-between">
        {[
          {
            icon: <ArrowUpRight className="w-5 h-5 text-gray-300" />,
            label: "Buy/Sell",
          },
          {
            icon: <ArrowLeftRight className="w-5 h-5 text-gray-300" />,
            label: "Swap",
          },
          {
            icon: <div className="w-5 h-5 bg-gray-600 rounded" />,
            label: "Bridge",
          },
          {
            icon: <Send className="w-5 h-5 text-gray-300" />,
            label: "Send",
            onClick: () => setShowSend(true),
          },
          {
            icon: <Download className="w-5 h-5 text-gray-300" />,
            label: "Receive",
            onClick: () => setShowReceive(true),
          },
        ].map((btn, idx) => (
          <button
            key={idx}
            className="flex flex-col items-center space-y-2"
            onClick={btn.onClick}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              {btn.icon}
            </div>
            <span className="text-xs text-gray-400">{btn.label}</span>
          </button>
        ))}
      </div>

      { showSend && <SendModal onClose={()=>setShowSend(false)}/>}
      { showReceive && <ReceiveModal onClose={()=>setShowReceive(false)}/> }
    </div>
  );
}

