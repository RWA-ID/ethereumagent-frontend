'use client';

import { useReadContracts } from 'wagmi';
import { CONTRACTS } from '@/contracts';
import type { OnchainAgent } from '@/lib/types';

export function useAgentBatchMetadata(tokenIds: bigint[]) {
  const contracts = tokenIds.map((tokenId) => ({
    ...CONTRACTS.agentNFT,
    functionName: 'getAgentMetadata' as const,
    args: [tokenId] as const,
  }));

  const result = useReadContracts({
    contracts: contracts as any,
    query: { enabled: tokenIds.length > 0 },
  });

  const agents: (OnchainAgent | null)[] = (result.data ?? []).map((r, i) => {
    if (r.status !== 'success' || !r.result) return null;
    const d = r.result as [string, `0x${string}`, `0x${string}`, `0x${string}`, bigint, string[]];
    return {
      tokenId: tokenIds[i],
      ipfsHash: d[0],
      agentExecutionAddress: d[1],
      revenueDistributor: d[2],
      creator: d[3],
      createdAt: d[4],
      capabilities: d[5],
    };
  });

  return {
    agents,
    isLoading: result.isLoading,
    error: result.error,
  };
}
