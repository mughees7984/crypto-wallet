import React from "react";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="px-4 mb-4">
      <div className="flex justify-around border-b border-gray-800">
        {["Tokens", "NFTs", "Activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-lg font-medium border-b-2 ${
              activeTab === tab
                ? "border-white text-white"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
