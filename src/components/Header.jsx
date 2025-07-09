import React from "react";
import { ChevronDown, Copy, Menu } from "lucide-react";
import { LuGlobe } from "react-icons/lu";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">S</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Account 1</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>0x7192e...af2f4</span>
          <Copy className="w-4 h-4" />
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
