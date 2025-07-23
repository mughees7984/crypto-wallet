// // src/injectedProvider.js

// (function () {
//   if (window.ethereum) return; // avoid double-injecting

//   // Simple example provider following EIP-1193
//   window.ethereum = {
//     isMyWallet: true,
//     isConnected: () => true,
//     request: async ({ method, params }) => {
//       return new Promise((resolve, reject) => {
//         window.postMessage(
//           {
//             target: "my-wallet-extension",
//             type: "REQUEST",
//             method,
//             params,
//           },
//           "*"
//         );

//         const handler = (event) => {
//           if (
//             event.source !== window ||
//             !event.data ||
//             event.data.target !== "my-wallet-page" ||
//             event.data.method !== method
//           )
//             return;

//           window.removeEventListener("message", handler);
//           if (event.data.error) reject(event.data.error);
//           else resolve(event.data.result);
//         };

//         window.addEventListener("message", handler);
//       });
//     },
//   };

//   // Emit event to notify dapps
//   window.dispatchEvent(new Event("ethereum#initialized"));
// })();


class MyEthereumProvider {
  constructor() {
    this.selectedAddress = "0x7507fab3607ACF236D1D826c9373A2DC6151CE89";
    // this.selectedAddress = "0x7192e466f0748E2EbA164c13b8D54d24Ac8af2f4";
  }

  request({ method, params }) {
    if (method === "eth_requestAccounts") {
      return Promise.resolve([this.selectedAddress]);
    }

    return Promise.reject(new Error("Method not implemented"));
  }
}

window.ethereum = new MyEthereumProvider();
window.dispatchEvent(new Event("ethereum#initialized"));
