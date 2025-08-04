// import { ethers } from "ethers";

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   const { type, payload } = message;

//   if (type === "OPEN_POPUP") {
//     chrome.windows.getCurrent((win) => {
//       chrome.windows.create({
//         url: chrome.runtime.getURL("popup.html"),
//         type: "popup",
//         width: 400,
//         height: 600,
//         top: win.top + 100,
//         left: win.left + 100,
//       });
//     });
//     return;
//   }

//   if (type === "SEND_TX_REQUEST") {
//     (async () => {
//       try {
//         const { tx, requestId } = payload;
//         const result = await chrome.storage.local.get([
//           "wallets",
//           "selectedWallet",
//         ]);
//         const selectedWallet = (result.wallets || []).find(
//           (w) => w.address === result.selectedWallet
//         );

//         if (!selectedWallet?.privateKey) throw new Error("Wallet not found.");

//         const provider = new ethers.providers.JsonRpcProvider(
//           tx.rpcUrl ||
//             "https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284"
//         );
//         const signer = new ethers.Wallet(selectedWallet.privateKey, provider);
//         const sentTx = await signer.sendTransaction(tx);
//         await sentTx.wait();

//         sendToTab({
//           type: "SEND_TX_RESPONSE",
//           payload: { requestId, result: sentTx.hash },
//         });
//       } catch (err) {
//         sendToTab({
//           type: "SEND_TX_RESPONSE",
//           payload: { requestId: payload?.requestId, error: err.message },
//         });
//       }
//     })();

//     return true;
//   }

//   if (type === "SIGN_MESSAGE_REQUEST") {
//     (async () => {
//       try {
//         const { message, from, requestId } = payload;
//         const result = await chrome.storage.local.get([
//           "wallets",
//           "selectedWallet",
//         ]);
//         const selectedWallet = (result.wallets || []).find(
//           (w) => w.address === result.selectedWallet
//         );

//         if (!selectedWallet?.privateKey) throw new Error("Wallet not found.");

//         const wallet = new ethers.Wallet(selectedWallet.privateKey);
//         const signature = await wallet.signMessage(message);

//         sendToTab({
//           type: "SIGN_MESSAGE_RESPONSE",
//           payload: { requestId, result: signature },
//         });
//       } catch (err) {
//         sendToTab({
//           type: "SIGN_MESSAGE_RESPONSE",
//           payload: { requestId: payload?.requestId, error: err.message },
//         });
//       }
//     })();

//     return true;
//   }
// });

// // Helper to send message to active tab
// function sendToTab(message) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     if (tabs[0]?.id) {
//       chrome.tabs.sendMessage(tabs[0].id, message);
//     }
//   });
// }


// import { ethers } from "ethers";

// let connectionRequests = {}; // track origin/requestId pairs

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   const { type, payload } = message;

//   // ✅ ETHEREUM PROVIDER (eth_requestAccounts, etc.)
//   if (type === "ETHEREUM_PROVIDER_REQUEST") {
//     const { method, params, requestId } = payload;

//     if (method === "eth_requestAccounts") {
//       chrome.storage.local.get(["selectedWallet"], (result) => {
//         const selected = result.selectedWallet;

//         if (!selected) {
//           // Store this request
//           connectionRequests[requestId] = {
//             origin: sender.origin || sender.url || "Unknown",
//             tabId: sender.tab.id,
//           };

//           chrome.windows.create({
//             url: chrome.runtime.getURL("connect.html") + `?requestId=${requestId}`,
//             type: "popup",
//             width: 400,
//             height: 600,
//           });
//         } else {
//           sendResponse({ result: [selected] });
//         }
//       });
//       return true;
//     }

//     if (method === "eth_chainId") {
//       sendResponse({ result: "0xaa36a7" }); // Sepolia chainId
//       return true;
//     }

//     return;
//   }

//   // ✅ Get origin of pending connection
//   if (type === "GET_CONNECTION_REQUEST") {
//     const url = new URLSearchParams(new URL(sender.url).search);
//     const requestId = url.get("requestId");
//     const info = connectionRequests[requestId];

//     sendResponse({ origin: info?.origin || "Unknown" });
//     return true;
//   }

//   // ✅ User approves or rejects dApp connection
//   if (type === "CONNECTION_RESPONSE") {
//     const { approved, address } = payload;

//     // Get requestId from the popup window URL
//     chrome.windows.getCurrent((win) => {
//       const urlParams = new URLSearchParams(new URL(win.tabs[0].url).search);
//       const requestId = urlParams.get("requestId");

//       const request = connectionRequests[requestId];
//       if (!request) return;

//       chrome.tabs.sendMessage(request.tabId, {
//         type: "ETHEREUM_PROVIDER_RESPONSE",
//         payload: approved
//           ? { requestId, result: [address] }
//           : { requestId, error: "User rejected the request." },
//       });

//       delete connectionRequests[requestId];
//     });
//     return;
//   }

//   // ✅ Open wallet popup manually if asked
//   if (type === "OPEN_POPUP") {
//     chrome.windows.getCurrent((win) => {
//       chrome.windows.create({
//         url: chrome.runtime.getURL("popup.html"),
//         type: "popup",
//         width: 400,
//         height: 600,
//         top: win.top + 100,
//         left: win.left + 100,
//       });
//     });
//     return;
//   }

//   // ✅ Send transaction
//   if (type === "SEND_TX_REQUEST") {
//     (async () => {
//       try {
//         const { tx, requestId } = payload;
//         const result = await chrome.storage.local.get(["wallets", "selectedWallet"]);
//         const selectedWallet = (result.wallets || []).find(
//           (w) => w.address === result.selectedWallet
//         );

//         if (!selectedWallet?.privateKey) throw new Error("Wallet not found");

//         const provider = new ethers.providers.JsonRpcProvider(
//           tx.rpcUrl || "https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284"
//         );
//         const signer = new ethers.Wallet(selectedWallet.privateKey, provider);
//         const sentTx = await signer.sendTransaction(tx);
//         await sentTx.wait();

//         sendToTab({
//           type: "SEND_TX_RESPONSE",
//           payload: { requestId, result: sentTx.hash },
//         });
//       } catch (err) {
//         sendToTab({
//           type: "SEND_TX_RESPONSE",
//           payload: { requestId: payload?.requestId, error: err.message },
//         });
//       }
//     })();
//     return true;
//   }

//   // ✅ Sign message
//   if (type === "SIGN_MESSAGE_REQUEST") {
//     (async () => {
//       try {
//         const { message, from, requestId } = payload;
//         const result = await chrome.storage.local.get(["wallets", "selectedWallet"]);
//         const selectedWallet = (result.wallets || []).find(
//           (w) => w.address === result.selectedWallet
//         );

//         if (!selectedWallet?.privateKey) throw new Error("Wallet not found");

//         const wallet = new ethers.Wallet(selectedWallet.privateKey);
//         const signature = await wallet.signMessage(message);

//         sendToTab({
//           type: "SIGN_MESSAGE_RESPONSE",
//           payload: { requestId, result: signature },
//         });
//       } catch (err) {
//         sendToTab({
//           type: "SIGN_MESSAGE_RESPONSE",
//           payload: { requestId: payload?.requestId, error: err.message },
//         });
//       }
//     })();
//     return true;
//   }
// });

// // ✅ Helper: Send a message to the current tab
// function sendToTab(message) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     if (tabs[0]?.id) {
//       chrome.tabs.sendMessage(tabs[0].id, message);
//     }
//   });
// }


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📩 background received:", message);

  if (message.type === "ETHEREUM_PROVIDER_REQUEST") {
    if (message.method === "eth_requestAccounts") {
      // Simulate returning one wallet address
      sendResponse({ result: ["0x1234567890abcdef1234567890abcdef12345678"] });
    } else {
      sendResponse({ error: "Method not supported: " + message.method });
    }
  }

  return true; // Important if sendResponse is async
});

console.log("✅ background.js loaded");
