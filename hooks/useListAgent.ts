'use client';

import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/contracts';
import { ADDRESSES } from '@/contracts/addresses';

export function useListAgent(tokenId: bigint | undefined) {
  const [step, setStep] = useState<'idle' | 'approving' | 'listing' | 'done'>('idle');

  const { data: approvedAddress } = useReadContract({
    ...CONTRACTS.agentNFT,
    functionName: 'getApproved',
    args: tokenId != null ? [tokenId] : undefined,
    query: { enabled: tokenId != null },
  });

  const isApproved = (approvedAddress as string | undefined)?.toLowerCase() === ADDRESSES.marketplace.toLowerCase();

  const {
    writeContract: writeApprove,
    data: approveTxHash,
    isPending: approveIsPending,
    error: approveError,
  } = useWriteContract();

  const { isLoading: approveConfirming, isSuccess: approveConfirmed } =
    useWaitForTransactionReceipt({ hash: approveTxHash });

  const {
    writeContract: writeList,
    data: listTxHash,
    isPending: listIsPending,
    error: listError,
  } = useWriteContract();

  const { isLoading: listConfirming, isSuccess: listConfirmed } =
    useWaitForTransactionReceipt({ hash: listTxHash });

  function approve() {
    if (tokenId == null) return;
    setStep('approving');
    writeApprove({
      ...CONTRACTS.agentNFT,
      functionName: 'approve',
      args: [ADDRESSES.marketplace as `0x${string}`, tokenId],
    });
  }

  function list(priceWei: bigint, ipfsCodeHash: string) {
    if (tokenId == null) return;
    setStep('listing');
    writeList({
      ...CONTRACTS.marketplace,
      functionName: 'list',
      args: [tokenId, priceWei, ipfsCodeHash],
    });
  }

  return {
    isApproved: isApproved || approveConfirmed,
    approve,
    approveIsPending: approveIsPending || approveConfirming,
    approveError,
    list,
    listIsPending: listIsPending || listConfirming,
    listError,
    listConfirmed,
    step,
  };
}
