import { formatEther } from 'viem';
import type { MarketplaceAgent, AgentViewModel } from './types';

function truncateAddress(addr: string): string {
  if (addr.length <= 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function toAgentViewModel(agent: MarketplaceAgent): AgentViewModel {
  const { tokenId, metadata, listing, metrics, ipfsName, ipfsDescription } = agent;

  const name = ipfsName || `Agent #${tokenId.toString()}`;
  const description = ipfsDescription || metadata.capabilities.join(', ') || 'ERC-8004 autonomous agent';

  const isListed = listing !== null && listing.active;
  const price = isListed ? `${formatEther(listing.price)} ETH` : '—';
  const priceRaw = isListed ? listing.price : 0n;

  const hasMetrics = metrics !== null && metrics.hasData;
  const winRate = hasMetrics ? `${(Number(metrics.winRate) / 100).toFixed(1)}%` : '—';
  const totalRevenue = hasMetrics ? `${formatEther(metrics.totalRevenue)} ETH` : '—';
  const tradesExecuted = hasMetrics ? metrics.tradesExecuted.toString() : '0';

  return {
    tokenId: tokenId.toString(),
    name,
    description,
    creator: truncateAddress(metadata.creator),
    capabilities: metadata.capabilities,
    price,
    priceRaw,
    winRate,
    totalRevenue,
    tradesExecuted,
    codeVerified: listing?.codeVerified ?? false,
    hasMetrics,
    isListed,
    ipfsCodeHash: listing?.ipfsCodeHash ?? '',
    revenueDistributor: metadata.revenueDistributor,
    seller: listing ? truncateAddress(listing.seller) : '',
    listedAt: listing?.listedAt ? new Date(Number(listing.listedAt) * 1000).toLocaleDateString() : '',
  };
}
