// // Inject the provider script into the page
// const script = document.createElement("script");
// script.src = chrome.runtime.getURL("assets/injectedProvider.js");
// script.onload = function () {
//   this.remove();
// };
// (document.head || document.documentElement).appendChild(script);

// // Relay messages from page → extension
// window.addEventListener("message", (event) => {
//   if (event.source !== window) return;
//   const { type, payload } = event.data;

//   if (type === "GET_EXTENSION_STORAGE") {
//     const selectedAddress =
//       localStorage.getItem("selectedAddress") ||
//       "0x0000000000000000000000000000000000000000";
//     const chainId = localStorage.getItem("chainId") || "0xaa36a7";

//     window.postMessage(
//       {
//         type: "EXTENSION_STORAGE_RESULT",
//         payload: {
//           selectedAddress,
//           chainId,
//         },
//       },
//       "*"
//     );
//   }

//   if (type === "SAVE_EXTENSION_STORAGE") {
//     const { selectedAddress, chainId } = payload;
//     if (selectedAddress)
//       localStorage.setItem("selectedAddress", selectedAddress);
//     if (chainId) localStorage.setItem("chainId", chainId);
//   }

//   if (type === "TRIGGER_EXTENSION_POPUP") {
//     chrome.runtime.sendMessage({
//       type: "OPEN_POPUP",
//       requestId: payload?.requestId,
//     });
//   }

//   if (type === "SEND_TX_REQUEST" || type === "SIGN_MESSAGE_REQUEST") {
//     chrome.runtime.sendMessage({
//       type,
//       payload,
//     });
//   }
// });

// // Relay responses from background → page
// chrome.runtime.onMessage.addListener((msg) => {
//   window.postMessage(msg, "*");
// });


// Inject the provider into the page
const script = document.createElement("script");
script.src = chrome.runtime.getURL("assets/injectedProvider.js");
script.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);

// Listen for provider requests from the page
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  const { type, payload } = event.data;

  if (type === "ETHEREUM_PROVIDER_REQUEST") {
    chrome.runtime.sendMessage(
      {
        type: "ETHEREUM_PROVIDER_REQUEST",
        payload,
      },
      (response) => {
        window.postMessage(
          {
            type: "ETHEREUM_PROVIDER_RESPONSE",
            payload: {
              requestId: payload.requestId,
              result: response?.result,
              error: response?.error,
            },
          },
          "*"
        );
      }
    );
  }
});
