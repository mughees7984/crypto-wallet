export const getExplorerUrl = (network, address) => {
  if (!network || !address) return "#";

  if (network.type === "evm") {
    return `${network.explorer}${address}`;
  }

  if (network.type === "solana") {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  }

  if (network.type === "bitcoin") {
    return `https://blockstream.info/testnet/address/${address}`;
  }

  return "#";
};
