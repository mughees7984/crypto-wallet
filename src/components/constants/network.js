export const SUPPORTED_NETWORKS = [
  {
    id: "ethereum",
    name: "Ethereum (Sepolia)",
    chainId: "0xaa36a7",
    symbol: "ETH",
    rpcUrl: "https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284", // Replace with your key
    explorer: "https://sepolia.etherscan.io",
  },
  {
    id: "bsc",
    name: "Binance Smart Chain (Testnet)",
    chainId: "0x61",
    symbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    explorer: "https://testnet.bscscan.com",
  },
  {
    id: "solana",
    name: "Solana (Devnet)",
    cluster: "https://api.devnet.solana.com",
    symbol: "SOL",
  },
  {
    id: "bitcoin",
    name: "Bitcoin (Testnet)",
    symbol: "tBTC",
  },
];
