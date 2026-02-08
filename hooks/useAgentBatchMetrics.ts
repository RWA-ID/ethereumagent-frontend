'use client';

import { useReadContracts } from 'wagmi';
import { CONTRACTS } from '@/contracts';
import type { AgentMetrics } from '@/lib/types';

export function useAgentBatchMetrics(tokenIds: bigint[]) {
  const contracts = tokenIds.map((tokenId) => ({
    ...CONTRACTS.performanceOracle,
    functionName: 'getMetrics' as const,
    args: [tokenId] as const,
  }));

  const result = useReadContracts({
    contracts: contracts as any,
    query: { enabled: tokenIds.length > 0 },
  });

  const metrics: (AgentMetrics | null)[] = (result.data ?? []).map((r) => {
    if (r.status !== 'success' || !r.result) return null;
    const d = r.result as [bigint, bigint, bigint, bigint, boolean];
    return {
      totalRevenue: d[0],
      tradesExecuted: d[1],
      winRate: d[2],
      lastUpdated: d[3],
      hasData: d[4],
    };
  });

  return {
    metrics,
    isLoading: result.isLoading,
    error: result.error,
  };
}
