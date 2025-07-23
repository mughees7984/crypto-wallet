// // src/background.js

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const { method, params } = request;

//   if (method === "eth_requestAccounts") {
//     // Example: return hardcoded address (replace with your wallet logic)
//     sendResponse({ result: ["0xYourCustomWalletAddressHere"] });
//   } else if (method === "eth_chainId") {
//     sendResponse({ result: "0xaa36a7" }); // Sepolia chain ID
//   } else if (method === "personal_sign") {
//     const [messageHex, address] = params;
//     // Fake sign (replace with real signing using private key)
//     sendResponse({
//       result: "0xdeadbeefcafebabe...", // fake signature
//     });
//   } else {
//     sendResponse({ error: "Unsupported method: " + method });
//   }

//   return true;
// });


// src/background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FROM_PAGE') {
    const { method, params } = message;

    if (method === 'eth_requestAccounts') {
      const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
      const selected = localStorage.getItem('selectedWallet');
      const selectedWallet = wallets.find((w) => w.address === selected);

      if (selectedWallet) {
        sendResponse({ result: [selectedWallet.address] });
      } else {
        sendResponse({ error: 'Wallet not found' });
      }
    }

    // Handle more methods like eth_sendTransaction, etc.

    return true; // keep message channel open
  }
});
