import { ADDRESSES } from "./addresses";
import { ABIS } from "./abis";

export const CONTRACTS = {
  agentNFT: {
    address: ADDRESSES.agentNFT as `0x${string}`,
    abi: ABIS.agentNFT,
  },
  performanceOracle: {
    address: ADDRESSES.performanceOracle as `0x${string}`,
    abi: ABIS.performanceOracle,
  },
  marketplace: {
    address: ADDRESSES.marketplace as `0x${string}`,
    abi: ABIS.marketplace,
  },
} as const;
