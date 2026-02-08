export type OnchainAgent = {
  tokenId: bigint;
  ipfsHash: string;
  agentExecutionAddress: `0x${string}`;
  revenueDistributor: `0x${string}`;
  creator: `0x${string}`;
  createdAt: bigint;
  capabilities: string[];
};

export type AgentListing = {
  seller: `0x${string}`;
  price: bigint;
  ipfsCodeHash: string;
  codeVerified: boolean;
  listedAt: bigint;
  active: boolean;
};

export type AgentMetrics = {
  totalRevenue: bigint;
  tradesExecuted: bigint;
  winRate: bigint;
  lastUpdated: bigint;
  hasData: boolean;
};

export type MarketplaceAgent = {
  tokenId: bigint;
  metadata: OnchainAgent;
  listing: AgentListing | null;
  metrics: AgentMetrics | null;
  ipfsName?: string;
  ipfsDescription?: string;
};

export type AgentViewModel = {
  tokenId: string;
  name: string;
  description: string;
  creator: string;
  capabilities: string[];
  price: string;
  priceRaw: bigint;
  winRate: string;
  totalRevenue: string;
  tradesExecuted: string;
  codeVerified: boolean;
  hasMetrics: boolean;
  isListed: boolean;
  ipfsCodeHash: string;
  revenueDistributor: string;
  seller: string;
  listedAt: string;
};
