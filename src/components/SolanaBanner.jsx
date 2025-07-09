import React from "react";

export default function SolanaBanner() {
  return (
    <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">C</span>
        </div>
        <div>
          <div className="font-medium text-white">Solana is now supported</div>
          <div className="text-sm text-white text-opacity-80">Create a Solana account to get started</div>
        </div>
      </div>
      <button className="text-white text-opacity-60 hover:text-opacity-100">
        <span className="text-xl">×</span>
      </button>
    </div>
  );
}
