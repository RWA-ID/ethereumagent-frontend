'use client';

import { useMemo } from 'react';
import { useAgentDiscovery } from './useAgentDiscovery';
import { useAgentBatchMetadata } from './useAgentBatchMetadata';
import { useAgentBatchMetrics } from './useAgentBatchMetrics';
import { useListedAgents } from './useListedAgents';
import type { MarketplaceAgent } from '@/lib/types';

export function useMarketplaceData() {
  const { tokenIds, loading: discoveryLoading, error: discoveryError } = useAgentDiscovery();
  const { agents: metadataList, isLoading: metaLoading } = useAgentBatchMetadata(tokenIds);
  const { metrics: metricsList, isLoading: metricsLoading } = useAgentBatchMetrics(tokenIds);
  const { listings, isLoading: listingsLoading } = useListedAgents(tokenIds);

  const isLoading = discoveryLoading || metaLoading || metricsLoading || listingsLoading;

  const allAgents: MarketplaceAgent[] = useMemo(() => {
    if (tokenIds.length === 0 || metadataList.length === 0) return [];

    return tokenIds.map((tokenId, i) => {
      const metadata = metadataList[i];
      if (!metadata) return null;

      return {
        tokenId,
        metadata,
        listing: listings[i] ?? null,
        metrics: metricsList[i] ?? null,
      } satisfies MarketplaceAgent;
    }).filter(Boolean) as MarketplaceAgent[];
  }, [tokenIds, metadataList, metricsList, listings]);

  const listedAgents: MarketplaceAgent[] = useMemo(
    () => allAgents.filter((a) => a.listing?.active),
    [allAgents],
  );

  return {
    allAgents,
    listedAgents,
    tokenIds,
    isLoading,
    error: discoveryError,
  };
}
