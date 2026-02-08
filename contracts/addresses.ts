export const CHAIN_ID = 11155111 as const; // Sepolia

export const ADDRESSES = {
  agentNFT: "0xfb9e9d405d4a8a628fd45d33e672d27b07fad902",
  performanceOracle: "0xfd353ecf66bb0f0cf1c4545002c2fd4930b9992d",
  marketplace: "0x3617e18279e09a2a2f1473b7cb13cd027c7937db",
} as const;

// Approximate Sepolia block at deployment time (Feb 7 2026)
export const DEPLOYMENT_BLOCK = 7_800_000n;
