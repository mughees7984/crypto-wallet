// class MyEthereumProvider {
//   constructor() {
//     this.selectedAddress = null;
//     this.chainId = "0xaa36a7"; // Sepolia
//     this._eventListeners = {};
//     this._pendingRequests = {};
//     this._popupRequestId = null;
//     this._loadState();
//   }

//   async _loadState() {
//     window.postMessage({ type: "GET_EXTENSION_STORAGE" }, "*");

//     window.addEventListener("message", (event) => {
//       if (event.source !== window || !event.data?.type) return;
//       const { type, payload } = event.data;

//       switch (type) {
//         case "EXTENSION_STORAGE_RESULT":
//           this.selectedAddress =
//             payload.selectedAddress ||
//             "0x0000000000000000000000000000000000000000";
//           this.chainId = payload.chainId || "0xaa36a7";
//           this._emit("accountsChanged", [this.selectedAddress]);
//           this._emit("chainChanged", this.chainId);

//           if (
//             this._popupRequestId &&
//             this._pendingRequests[this._popupRequestId]
//           ) {
//             this._pendingRequests[this._popupRequestId].resolve([
//               this.selectedAddress,
//             ]);
//             delete this._pendingRequests[this._popupRequestId];
//             this._popupRequestId = null;
//           }
//           break;

//         case "SEND_TX_RESPONSE":
//         case "SIGN_MESSAGE_RESPONSE":
//           const { requestId, error, result } = payload;
//           const callback = this._pendingRequests[requestId];
//           if (callback) {
//             delete this._pendingRequests[requestId];
//             error
//               ? callback.reject(new Error(error))
//               : callback.resolve(result);
//           }
//           break;
//       }
//     });
//   }

//   async _saveState() {
//     window.postMessage(
//       {
//         type: "SAVE_EXTENSION_STORAGE",
//         payload: {
//           selectedAddress: this.selectedAddress,
//           chainId: this.chainId,
//         },
//       },
//       "*"
//     );
//   }

//   on(event, callback) {
//     if (!this._eventListeners[event]) this._eventListeners[event] = [];
//     this._eventListeners[event].push(callback);
//   }

//   _emit(event, data) {
//     const listeners = this._eventListeners[event];
//     if (listeners?.length) {
//       listeners.forEach((cb) => cb(data));
//     }
//   }

//   request({ method, params }) {
//     switch (method) {
//       case "eth_requestAccounts":
//       case "eth_accounts":
//         if (
//           !this.selectedAddress ||
//           this.selectedAddress === "0x0000000000000000000000000000000000000000"
//         ) {
//           const requestId = Date.now().toString();
//           this._popupRequestId = requestId;
//           return new Promise((resolve, reject) => {
//             this._pendingRequests[requestId] = { resolve, reject };
//             window.postMessage(
//               {
//                 type: "TRIGGER_EXTENSION_POPUP",
//                 payload: { requestId },
//               },
//               "*"
//             );
//           });
//         } else {
//           return Promise.resolve([this.selectedAddress]);
//         }

//       case "eth_chainId":
//         return Promise.resolve(this.chainId);

//       case "wallet_switchEthereumChain":
//         if (params?.[0]?.chainId) {
//           this.chainId = params[0].chainId;
//           this._saveState();
//           this._emit("chainChanged", this.chainId);
//           return Promise.resolve(null);
//         }
//         return Promise.reject(new Error("Invalid chainId"));

//       case "eth_sendTransaction":
//         const txRequestId = Date.now().toString();
//         return new Promise((resolve, reject) => {
//           this._pendingRequests[txRequestId] = { resolve, reject };
//           window.postMessage(
//             {
//               type: "SEND_TX_REQUEST",
//               payload: {
//                 tx: params[0],
//                 requestId: txRequestId,
//               },
//             },
//             "*"
//           );
//         });

//       case "personal_sign":
//         const signRequestId = Date.now().toString();
//         return new Promise((resolve, reject) => {
//           this._pendingRequests[signRequestId] = { resolve, reject };
//           window.postMessage(
//             {
//               type: "SIGN_MESSAGE_REQUEST",
//               payload: {
//                 message: params[0],
//                 from: params[1],
//                 requestId: signRequestId,
//               },
//             },
//             "*"
//           );
//         });

//       default:
//         return Promise.reject(new Error(`Method ${method} not implemented`));
//     }
//   }
// }

// window.ethereum = new MyEthereumProvider();
// window.dispatchEvent(new Event("ethereum#initialized"));


window.ethereum = {
  request: ({ method, params }) => {
    return new Promise((resolve, reject) => {
      const requestId = Date.now();

      // Listen for response
      const handleResponse = (event) => {
        if (event.source !== window) return;
        const message = event.data;

        if (message.type === "ETHEREUM_PROVIDER_RESPONSE" && message.requestId === requestId) {
          window.removeEventListener("message", handleResponse);
          if (message.error) reject(message.error);
          else resolve(message.result);
        }
      };

      window.addEventListener("message", handleResponse);

      // Send request
      window.postMessage(
        {
          type: "ETHEREUM_PROVIDER_REQUEST",
          method,
          params,
          requestId,
        },
        "*"
      );
    });
  },
};

console.log("✅ injectedProvider.js loaded: window.ethereum.request() ready");
