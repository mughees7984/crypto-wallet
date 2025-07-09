import React from "react";
import { ChevronDown, Filter, MoreHorizontal } from "lucide-react";

export default function TokenContent() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Sepolia</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">S</span>
          </div>
          <div>
            <div className="font-medium">SepoliaETH</div>
            <div className="text-sm text-gray-400">No conversion rate available</div>
          </div>
        </div>
        <div className="text-right font-medium">0.18425 SepoliaETH</div>
      </div>
    </div>
  );
}
