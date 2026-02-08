import { useReadContract } from 'wagmi';
import AgentNFTArtifact from '@/contracts/AgentNFT.json';
import PerformanceOracleArtifact from '@/contracts/PerformanceOracle.json';
import AgentMarketplaceArtifact from '@/contracts/AgentMarketplace.json';
import addresses from '@/contracts/deployed-addresses.json';

const contractAddresses = addresses.sepolia;

export function useAgentNFT() {
  return {
    address: contractAddresses.AgentNFT as `0x${string}`,
    abi: AgentNFTArtifact.abi,
  };
}

export function usePerformanceOracle() {
  return {
    address: contractAddresses.PerformanceOracle as `0x${string}`,
    abi: PerformanceOracleArtifact.abi,
  };
}

export function useAgentMarketplace() {
  return {
    address: contractAddresses.AgentMarketplace as `0x${string}`,
    abi: AgentMarketplaceArtifact.abi,
  };
}

export function useAgentMetadata(tokenId: bigint) {
  const contract = useAgentNFT();
  
  return useReadContract({
    ...contract,
    functionName: 'getAgentMetadata',
    args: [tokenId],
  });
}

export function useAgentCapabilities(tokenId: bigint) {
  const contract = useAgentNFT();
  
  return useReadContract({
    ...contract,
    functionName: 'getCapabilities',
    args: [tokenId],
  });
}

export function useAgentPerformance(tokenId: bigint) {
  const contract = usePerformanceOracle();

  return useReadContract({
    ...contract,
    functionName: 'getMetrics',
    args: [tokenId],
  });
}

export function useAgentListing(tokenId: bigint) {
  const contract = useAgentMarketplace();

  return useReadContract({
    ...contract,
    functionName: 'listings',
    args: [tokenId],
  });
}

export function useHasRecentMetrics(tokenId: bigint) {
  const contract = usePerformanceOracle();

  return useReadContract({
    ...contract,
    functionName: 'hasRecentMetrics',
    args: [tokenId],
  });
}

export function useBuyerFeePercent() {
  const contract = useAgentMarketplace();

  return useReadContract({
    ...contract,
    functionName: 'buyerFeePercent',
  });
}

export function useListingFeePercent() {
  const contract = useAgentMarketplace();

  return useReadContract({
    ...contract,
    functionName: 'listingFeePercent',
  });
}

export function useSellerCompletedSales(address: `0x${string}` | undefined) {
  const contract = useAgentMarketplace();

  return useReadContract({
    ...contract,
    functionName: 'sellerCompletedSales',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}
