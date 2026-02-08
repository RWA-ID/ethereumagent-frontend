'use client';

import { useReadContracts } from 'wagmi';
import { CONTRACTS } from '@/contracts';
import type { AgentListing } from '@/lib/types';

export function useListedAgents(tokenIds: bigint[]) {
  const contracts = tokenIds.map((tokenId) => ({
    ...CONTRACTS.marketplace,
    functionName: 'listings' as const,
    args: [tokenId] as const,
  }));

  const result = useReadContracts({
    contracts: contracts as any,
    query: { enabled: tokenIds.length > 0 },
  });

  const listings: (AgentListing | null)[] = (result.data ?? []).map((r) => {
    if (r.status !== 'success' || !r.result) return null;
    const d = r.result as [`0x${string}`, bigint, string, boolean, bigint, boolean];
    return {
      seller: d[0],
      price: d[1],
      ipfsCodeHash: d[2],
      codeVerified: d[3],
      listedAt: d[4],
      active: d[5],
    };
  });

  return {
    listings,
    isLoading: result.isLoading,
    error: result.error,
  };
}
