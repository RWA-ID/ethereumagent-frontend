"use client";

import { useState, useMemo } from "react";
import { parseEther, formatEther } from "viem";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "../_components/Navbar";
import { useOwnedAgents } from "@/hooks/useOwnedAgents";
import { useAgentBatchMetadata } from "@/hooks/useAgentBatchMetadata";
import { useAgentBatchMetrics } from "@/hooks/useAgentBatchMetrics";
import { useListedAgents } from "@/hooks/useListedAgents";
import { useListAgent } from "@/hooks/useListAgent";
import { useSellerCompletedSales } from "@/hooks/useContracts";
import { useReadContracts } from "wagmi";
import { CONTRACTS } from "@/contracts";

export default function ListPage() {
  const { address, isConnected } = useAccount();
  const { ownedTokenIds, loading: ownedLoading } = useOwnedAgents();

  const { agents: metadataList } = useAgentBatchMetadata(ownedTokenIds);
  const { metrics: metricsList } = useAgentBatchMetrics(ownedTokenIds);
  const { listings } = useListedAgents(ownedTokenIds);

  // Batch hasRecentMetrics
  const hasRecentContracts = ownedTokenIds.map((tokenId) => ({
    ...CONTRACTS.performanceOracle,
    functionName: "hasRecentMetrics" as const,
    args: [tokenId] as const,
  }));
  const { data: hasRecentResults } = useReadContracts({
    contracts: hasRecentContracts as any,
    query: { enabled: ownedTokenIds.length > 0 },
  });

  const [selectedTokenId, setSelectedTokenId] = useState<bigint | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [ipfsCodeHash, setIpfsCodeHash] = useState("");

  const {
    isApproved,
    approve,
    approveIsPending,
    approveError,
    list,
    listIsPending,
    listError,
    listConfirmed,
  } = useListAgent(selectedTokenId ?? undefined);

  const { data: sellerSales } = useSellerCompletedSales(address);

  const ownedAgentsData = useMemo(() => {
    return ownedTokenIds.map((tokenId, i) => {
      const meta = metadataList[i];
      const metricsData = metricsList[i];
      const listing = listings[i];
      const hasRecent = hasRecentResults?.[i]?.result as boolean | undefined;

      return {
        tokenId,
        name: meta ? `Agent #${tokenId.toString()}` : `Token #${tokenId.toString()}`,
        capabilities: meta?.capabilities ?? [],
        hasMetrics: metricsData?.hasData ?? false,
        hasRecentMetrics: hasRecent ?? false,
        isListed: listing?.active ?? false,
        winRate: metricsData?.hasData
          ? `${(Number(metricsData.winRate) / 100).toFixed(1)}%`
          : "—",
        totalRevenue: metricsData?.hasData
          ? `${formatEther(metricsData.totalRevenue)} ETH`
          : "—",
      };
    });
  }, [ownedTokenIds, metadataList, metricsList, listings, hasRecentResults]);

  function handleList() {
    if (!priceInput || !ipfsCodeHash) return;
    try {
      const priceWei = parseEther(priceInput);
      list(priceWei, ipfsCodeHash);
    } catch {
      // invalid price
    }
  }

  const completedSales = sellerSales != null ? Number(sellerSales as bigint) : 0;

  // Not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#070A12] text-white">
        <Navbar subtitle="List an Agent" />
        <main className="mx-auto max-w-6xl px-5 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">List an Agent</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            Connect your wallet to list an ERC-8004 agent for sale on Sepolia.
          </p>
          <div className="mt-6 flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-10">
            <div className="text-center">
              <div className="text-sm text-white/60">Connect wallet to list an agent</div>
              <div className="mt-4">
                <ConnectButton />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <Navbar subtitle="List an Agent" />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">List an Agent</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          Select an ERC-8004 agent you own, set a price, and list it on the marketplace.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#20E3A2]" />
          Sepolia testnet
        </div>

        {ownedLoading ? (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-20 rounded bg-white/10" />
            </div>
          </div>
        ) : ownedTokenIds.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="text-lg font-semibold">No ERC-8004 agents found</div>
            <p className="mt-2 text-sm text-white/60">
              You don&apos;t own any ERC-8004 agents on Sepolia. Mint one first to list it here.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-12">
            {/* Owned agents grid */}
            <div className={selectedTokenId ? "md:col-span-7" : "md:col-span-12"}>
              <div className="text-sm font-semibold text-white/70">Your Agents</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ownedAgentsData.map((agent) => {
                  const disabled = !agent.hasRecentMetrics || agent.isListed;
                  const selected = selectedTokenId === agent.tokenId;

                  return (
                    <button
                      key={agent.tokenId.toString()}
                      onClick={() => {
                        if (!disabled) {
                          setSelectedTokenId(selected ? null : agent.tokenId);
                        }
                      }}
                      disabled={disabled}
                      className={[
                        "rounded-2xl border p-4 text-left transition-all",
                        selected
                          ? "border-[#7B3FF2] bg-[#7B3FF2]/10"
                          : disabled
                            ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                      ].join(" ")}
                      title={
                        agent.isListed
                          ? "Already listed"
                          : !agent.hasRecentMetrics
                            ? "Performance metrics must be reported by the agent's execution address within the last 7 days"
                            : undefined
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{agent.name}</div>
                        <div className="flex gap-1">
                          {agent.isListed && (
                            <span className="rounded-full bg-[#7B3FF2]/10 px-2 py-0.5 text-[10px] text-[#7B3FF2]">
                              Listed
                            </span>
                          )}
                          {agent.hasMetrics && (
                            <span className="rounded-full bg-[#20E3A2]/10 px-2 py-0.5 text-[10px] text-[#20E3A2]">
                              Metrics
                            </span>
                          )}
                        </div>
                      </div>

                      {agent.capabilities.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {agent.capabilities.slice(0, 3).map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/50">Win Rate: </span>
                          <span className="text-white/80">{agent.winRate}</span>
                        </div>
                        <div>
                          <span className="text-white/50">Revenue: </span>
                          <span className="text-white/80">{agent.totalRevenue}</span>
                        </div>
                      </div>

                      {!agent.hasRecentMetrics && !agent.isListed && (
                        <div className="mt-2 text-[10px] text-yellow-400">
                          Needs recent metrics to list
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Listing form */}
            {selectedTokenId && (
              <div className="md:col-span-5">
                <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  {listConfirmed ? (
                    <div className="text-center">
                      <div className="text-lg font-semibold text-[#20E3A2]">
                        Agent Listed!
                      </div>
                      <p className="mt-2 text-sm text-white/60">
                        Awaiting platform code verification before buyers can purchase.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedTokenId(null);
                          setPriceInput("");
                          setIpfsCodeHash("");
                        }}
                        className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm font-semibold">
                        List Agent #{selectedTokenId.toString()}
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="text-xs font-semibold text-white/70">
                            Price (ETH)
                          </label>
                          <input
                            type="text"
                            value={priceInput}
                            onChange={(e) => setPriceInput(e.target.value)}
                            placeholder="0.1"
                            className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7B3FF2]/50"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-white/70">
                            IPFS Code Hash
                          </label>
                          <input
                            type="text"
                            value={ipfsCodeHash}
                            onChange={(e) => setIpfsCodeHash(e.target.value)}
                            placeholder="QmXxx…"
                            className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7B3FF2]/50"
                          />
                        </div>

                        <div className="space-y-1 rounded-xl bg-white/[0.03] p-3 text-xs text-white/50">
                          <div>3% listing fee deducted at sale</div>
                          {completedSales < 3 && (
                            <div className="text-yellow-400">
                              Your first 3 sales go through 7-day escrow to build
                              seller reputation ({completedSales}/3 completed)
                            </div>
                          )}
                        </div>

                        {!isApproved ? (
                          <button
                            onClick={approve}
                            disabled={approveIsPending}
                            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                          >
                            {approveIsPending
                              ? "Approving…"
                              : "Step 1: Approve Marketplace"}
                          </button>
                        ) : (
                          <button
                            onClick={handleList}
                            disabled={
                              listIsPending || !priceInput || !ipfsCodeHash
                            }
                            className="w-full rounded-xl bg-gradient-to-r from-[#7B3FF2] to-[#36D6E7] px-4 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                          >
                            {listIsPending
                              ? "Listing…"
                              : "Step 2: List Agent"}
                          </button>
                        )}

                        {approveError && (
                          <div className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
                            {approveError.message?.slice(0, 120)}
                          </div>
                        )}
                        {listError && (
                          <div className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
                            {listError.message?.slice(0, 120)}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
