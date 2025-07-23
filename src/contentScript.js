

// // src/content-script.js

// // Inject the provider script into the page
// const script = document.createElement("script");
// script.src = chrome.runtime.getURL("injectedProvider.js");
// script.onload = function () {
//   this.remove();
// };
// (document.head || document.documentElement).appendChild(script);

// // Listen for messages from the page
// window.addEventListener("message", async (event) => {
//   if (
//     event.source !== window ||
//     !event.data.type ||
//     event.data.type !== "ETHEREUM_REQUEST"
//   ) {
//     return;
//   }

//   const { id, method, params } = event.data;

//   chrome.runtime.sendMessage({ method, params }, (response) => {
//     const message = {
//       type: "ETHEREUM_RESPONSE",
//       id,
//     };

//     if (chrome.runtime.lastError) {
//       message.error = chrome.runtime.lastError.message;
//     } else if (response?.error) {
//       message.error = response.error;
//     } else {
//       message.result = response.result;
//     }

//     window.postMessage(message, "*");
//   });
// });


// src/contentScript.js

const script = document.createElement('script');
script.src = chrome.runtime.getURL('assets/injectedProvider.js');
script.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);

// Listen to messages from page → relay to background
window.addEventListener('message', async (event) => {
  if (
    event.source !== window ||
    !event.data ||
    event.data.target !== 'my-wallet-extension'
  )
    return;

  chrome.runtime.sendMessage(
    {
      type: 'FROM_PAGE',
      method: event.data.method,
      params: event.data.params,
    },
    (response) => {
      window.postMessage(
        {
          target: 'my-wallet-page',
          method: event.data.method,
          result: response?.result,
          error: response?.error,
        },
        '*'
      );
    }
  );
});
