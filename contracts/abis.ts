import AgentNFTAbi from "@/src/abis/AgentNFT.abi.json";
import PerformanceOracleAbi from "@/src/abis/PerformanceOracle.abi.json";
import AgentMarketplaceAbi from "@/src/abis/AgentMarketplace.abi.json";

export const ABIS = {
  agentNFT: AgentNFTAbi,
  performanceOracle: PerformanceOracleAbi,
  marketplace: AgentMarketplaceAbi,
} as const;
