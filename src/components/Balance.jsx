import React from "react";
import { Eye } from "lucide-react";

export default function Balance() {
  return (
    <div className="p-6 flex flex-col items-start">
      <div className="flex items-center space-x-2 mb-2">
        <h1 className="text-3xl font-light">0.1843 SepoliaETH</h1>
        <Eye className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>+$0 (+0.00%)</span>
        <span className="text-blue-400 underline">Portfolio ↗</span>
      </div>
    </div>
  );
}
