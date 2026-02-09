import type { PublicClient } from 'viem';

const CHUNK_SIZE = 999n;

/**
 * Scans contract events in chunks to avoid RPC block-range limits.
 */
export async function getContractEventsChunked(
  publicClient: PublicClient,
  params: {
    address: `0x${string}`;
    abi: any;
    eventName: string;
    args?: any;
    fromBlock: bigint;
  },
) {
  const latest = await publicClient.getBlockNumber();
  const allLogs: any[] = [];

  let from = params.fromBlock;
  while (from <= latest) {
    const to = from + CHUNK_SIZE - 1n > latest ? latest : from + CHUNK_SIZE - 1n;

    const logs = await publicClient.getContractEvents({
      address: params.address,
      abi: params.abi,
      eventName: params.eventName,
      args: params.args,
      fromBlock: from,
      toBlock: to,
    } as any);

    allLogs.push(...logs);
    from = to + 1n;
  }

  return allLogs;
}
