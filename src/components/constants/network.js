// src/components/constants/network.js

export const SUPPORTED_NETWORKS = [
  {
    id: "ethereum",
    name: "Ethereum (Sepolia)",
    chainId: "0xaa36a7", // 11155111
    symbol: "ETH",
    rpcUrl: "https://sepolia.infura.io/v3/20e963c9498b4830b513e2dc4b816284",
    explorer: "https://sepolia.etherscan.io",
    type: "evm",
    isDefault: true, // ✅ MetaMask supported
  },
  {
    id: "bsc",
    name: "Binance Smart Chain (Testnet)",
    chainId: "0x61", // 97
    symbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    explorer: "https://testnet.bscscan.com",
    type: "evm",
    isDefault: true, // ✅ MetaMask supported
  },
  {
    id: "polygon",
    name: "Polygon (Mumbai Testnet)",
    chainId: "0x13881", // 80001
    symbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    explorer: "https://mumbai.polygonscan.com",
    type: "evm",
    isDefault: false, // ❌ needs to be added manually
  },
  {
    id: "avalanche",
    name: "Avalanche (Fuji Testnet)",
    chainId: "0xa869", // 43113
    symbol: "AVAX",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    explorer: "https://testnet.snowtrace.io",
    type: "evm",
    isDefault: false,
  },
  {
    id: "fantom",
    name: "Fantom (Testnet)",
    chainId: "0xfa2", // 4002
    symbol: "FTM",
    rpcUrl: "https://rpc.testnet.fantom.network/",
    explorer: "https://testnet.ftmscan.com",
    type: "evm",
    isDefault: false,
  },
  {
    id: "arbitrum",
    name: "Arbitrum (Goerli)",
    chainId: "0x66eed", // 421613
    symbol: "ETH",
    rpcUrl: "https://goerli-rollup.arbitrum.io/rpc",
    explorer: "https://goerli.arbiscan.io",
    type: "evm",
    isDefault: false,
  },
  {
    id: "optimism",
    name: "Optimism (Goerli)",
    chainId: "0x1a4", // 420
    symbol: "ETH",
    rpcUrl: "https://goerli.optimism.io",
    explorer: "https://goerli-optimism.etherscan.io",
    type: "evm",
    isDefault: false,
  },
  {
    id: "solana",
    name: "Solana (Devnet)",
    symbol: "SOL",
    cluster: "https://api.devnet.solana.com",
    explorer: "https://explorer.solana.com?cluster=devnet",
    type: "solana",
  },
  {
    id: "bitcoin",
    name: "Bitcoin (Testnet)",
    symbol: "tBTC",
    type: "bitcoin",
    explorer: "https://blockstream.info/testnet",
  },
];
