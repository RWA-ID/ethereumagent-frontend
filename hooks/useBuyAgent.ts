'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/contracts';

export function useBuyAgent(tokenId: bigint | undefined, listingPrice: bigint | undefined) {
  const { data: buyerFeePercent } = useReadContract({
    ...CONTRACTS.marketplace,
    functionName: 'buyerFeePercent',
    query: { enabled: tokenId != null },
  });

  const { data: basisPoints } = useReadContract({
    ...CONTRACTS.marketplace,
    functionName: 'BASIS_POINTS',
    query: { enabled: tokenId != null },
  });

  const fee = (listingPrice != null && buyerFeePercent != null && basisPoints != null)
    ? (listingPrice * (buyerFeePercent as bigint)) / (basisPoints as bigint)
    : 0n;

  const totalCost = (listingPrice ?? 0n) + fee;

  const {
    writeContract,
    data: txHash,
    isPending,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  function buy() {
    if (tokenId == null) return;
    writeContract({
      ...CONTRACTS.marketplace,
      functionName: 'buy',
      args: [tokenId],
      value: totalCost,
    });
  }

  return {
    buy,
    totalCost,
    fee,
    buyerFeePercent: buyerFeePercent as bigint | undefined,
    isPending: isPending || isConfirming,
    isConfirmed,
    error,
    txHash,
  };
}
