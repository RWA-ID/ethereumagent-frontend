'use client';

import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { CONTRACTS } from '@/contracts';
import { DEPLOYMENT_BLOCK } from '@/contracts/addresses';

export function useAgentDiscovery() {
  const publicClient = usePublicClient();
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicClient) return;

    let cancelled = false;

    (async () => {
      try {
        const logs = await publicClient.getContractEvents({
          address: CONTRACTS.agentNFT.address,
          abi: CONTRACTS.agentNFT.abi as any,
          eventName: 'AgentMinted',
          fromBlock: DEPLOYMENT_BLOCK,
          toBlock: 'latest',
        });

        if (cancelled) return;

        const ids = logs.map((log: any) => {
          return log.args?.tokenId as bigint;
        }).filter(Boolean);

        setTokenIds(ids);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to discover agents');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [publicClient]);

  return { tokenIds, loading, error };
}
