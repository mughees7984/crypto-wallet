// utils/switchToNetwork.js

export const switchToNetwork = async (network) => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  try {
    const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

    if (currentChainId === network.chainId) return;

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: network.chainId }],
    });
  } catch (error) {
    if (error.code === 4902) {
      // Network not found, so add it
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: network.chainId,
              chainName: network.name,
              rpcUrls: [network.rpcUrl],
              nativeCurrency: {
                name: network.symbol,
                symbol: network.symbol,
                decimals: 18,
              },
              blockExplorerUrls: [network.explorer],
            },
          ],
        });
      } catch (addError) {
        console.error("Failed to add network", addError);
      }
    } else {
      console.error("Switch network error", error);
    }
  }
};
