import React, {useState} from "react";
import QRCode from "react-qr-code";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { useWallet } from "../../Context/WalletContext";

export default function ReceiveModal({ onClose }) {
  const { selectedWallet } = useWallet();
  const address = selectedWallet?.address;
  const name = selectedWallet?.name || "Unnamed Account";
  const [copied, setCopied] = useState(false);


  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    }
  };

  if (!address) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-[30%] p-6  rounded-2xl  text-center relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Receive</h2>

        {/* QR Code */}
        <div className="bg-white p-3 rounded-xl mx-auto w-fit">
          <QRCode value={address} size={200} />
        </div>

        {/* Wallet Info */}
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</p>
        <p className="text-xs text-gray-500 mt-1 break-words text-center px-2">{address}</p>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="mt-4 text-blue-600 text-sm hover:underline flex items-center justify-center gap-1"
        >
          <Copy size={16} /> Copy address
        </button>

          {copied && (
          <p className="mt-2 text-green-500 text-xs font-medium">Copied!</p>
        )}
      </div>
    </div>
  );
}
