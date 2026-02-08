'use client';

import { useEffect, useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { CONTRACTS } from '@/contracts';
import { DEPLOYMENT_BLOCK } from '@/contracts/addresses';

export function useOwnedAgents() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [ownedTokenIds, setOwnedTokenIds] = useState<bigint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address || !publicClient) {
      setOwnedTokenIds([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const [incomingLogs, outgoingLogs] = await Promise.all([
          publicClient.getContractEvents({
            address: CONTRACTS.agentNFT.address,
            abi: CONTRACTS.agentNFT.abi as any,
            eventName: 'Transfer',
            args: { to: address },
            fromBlock: DEPLOYMENT_BLOCK,
            toBlock: 'latest',
          }),
          publicClient.getContractEvents({
            address: CONTRACTS.agentNFT.address,
            abi: CONTRACTS.agentNFT.abi as any,
            eventName: 'Transfer',
            args: { from: address },
            fromBlock: DEPLOYMENT_BLOCK,
            toBlock: 'latest',
          }),
        ]);

        if (cancelled) return;

        const received = new Set<bigint>();
        for (const log of incomingLogs) {
          const args = (log as any).args;
          if (args?.tokenId != null) received.add(args.tokenId as bigint);
        }
        for (const log of outgoingLogs) {
          const args = (log as any).args;
          if (args?.tokenId != null) received.delete(args.tokenId as bigint);
        }

        setOwnedTokenIds(Array.from(received));
      } catch {
        if (!cancelled) setOwnedTokenIds([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [address, publicClient]);

  return { ownedTokenIds, loading, address };
}
