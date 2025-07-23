class MyEthereumProvider {
  constructor() {
    this.selectedAddress = "0x7507fab3607ACF236D1D826c9373A2DC6151CE89";
    this.chainId = "0xaa36a7"; // Sepolia
  }

  request({ method, params }) {
    switch (method) {
      case "eth_requestAccounts":
      case "eth_accounts":
        return Promise.resolve([this.selectedAddress]);

      case "eth_chainId":
        return Promise.resolve(this.chainId);

      case "wallet_switchEthereumChain":
        if (params && params[0] && params[0].chainId) {
          this.chainId = params[0].chainId;
          window.dispatchEvent(
            new CustomEvent("chainChanged", { detail: this.chainId })
          );
          return Promise.resolve(null);
        } else {
          return Promise.reject(
            new Error("Invalid params for wallet_switchEthereumChain")
          );
        }

      case "eth_sendTransaction":
        const txHash =
          "0x" + crypto.randomUUID().replace(/-/g, "").padEnd(64, "0");
        return Promise.resolve(txHash);

      default:
        return Promise.reject(new Error("Method not implemented"));
    }
  }
}

window.ethereum = new MyEthereumProvider();
window.dispatchEvent(new Event("ethereum#initialized"));
