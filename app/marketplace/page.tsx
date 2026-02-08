"use client";

import { useMemo, useState } from "react";
import Navbar from "../_components/Navbar";
import AgentCard from "./_components/AgentCard";
import FeaturedRow from "./_components/FeaturedRow";
import AuroraBg from "./_components/AuroraBg";
import { useMarketplaceData } from "@/hooks/useMarketplaceData";
import { toAgentViewModel } from "@/lib/formatAgent";
import type { AgentViewModel } from "@/lib/types";

const categories = [
  "DeFi Farming",
  "Perps Trading",
  "Arbitrage",
  "Market Making",
  "Risk Management",
  "Alerts",
  "Execution",
];

type SortKey = "price-asc" | "price-desc" | "winRate" | "revenue" | "recent";

export default function MarketplacePage() {
  const { listedAgents, isLoading, error } = useMarketplaceData();

  const [search, setSearch] = useState("");
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [codeVerifiedOnly, setCodeVerifiedOnly] = useState(false);
  const [hasMetricsOnly, setHasMetricsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("recent");

  const allViewModels = useMemo(
    () => listedAgents.map(toAgentViewModel),
    [listedAgents],
  );

  const filtered = useMemo(() => {
    let result = allViewModels;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.capabilities.some((c) => c.toLowerCase().includes(q)),
      );
    }

    if (selectedCapabilities.length > 0) {
      result = result.filter((a) =>
        selectedCapabilities.some((cap) =>
          a.capabilities.some((c) => c.toLowerCase().includes(cap.toLowerCase())),
        ),
      );
    }

    if (codeVerifiedOnly) {
      result = result.filter((a) => a.codeVerified);
    }

    if (hasMetricsOnly) {
      result = result.filter((a) => a.hasMetrics);
    }

    const sorted = [...result];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => Number(a.priceRaw - b.priceRaw));
        break;
      case "price-desc":
        sorted.sort((a, b) => Number(b.priceRaw - a.priceRaw));
        break;
      case "winRate":
        sorted.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate) || 0);
        break;
      case "revenue":
        sorted.sort((a, b) => parseFloat(b.totalRevenue) - parseFloat(a.totalRevenue) || 0);
        break;
      case "recent":
      default:
        break;
    }

    return sorted;
  }, [allViewModels, search, selectedCapabilities, codeVerifiedOnly, hasMetricsOnly, sortBy]);

  const featured = useMemo(() => filtered.slice(0, 6), [filtered]);

  function toggleCapability(cap: string) {
    setSelectedCapabilities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap],
    );
  }

  function resetFilters() {
    setSearch("");
    setSelectedCapabilities([]);
    setCodeVerifiedOnly(false);
    setHasMetricsOnly(false);
    setSortBy("recent");
  }

  return (
    <div className="relative min-h-screen bg-[#070A12] text-white">
      <AuroraBg />
      <div className="relative">
        <Navbar subtitle="Marketplace" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 py-10">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Marketplace</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              Browse code-verified ERC-8004 agents with on-chain performance metrics
              and reputation scoring.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#20E3A2]" />
              Sepolia testnet (AgentNFT + PerformanceOracle + AgentMarketplace)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full border border-[#36D6E7]/30 bg-[#36D6E7]/10 px-3 py-1 text-xs text-[#36D6E7]">
              Sepolia
            </div>
          </div>
        </div>

        {/* Featured row */}
        <FeaturedRow agents={featured} />

        {/* Search + sort */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <div className="text-white/50">&#x2315;</div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search agents, capabilities…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 outline-none"
              >
                <option value="recent">Sort: Recent</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="winRate">Win Rate</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
          </div>

          {/* Quick chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setCodeVerifiedOnly((v) => !v)}
              className={[
                "rounded-full border px-3 py-1 text-xs",
                codeVerifiedOnly
                  ? "border-[#20E3A2]/40 bg-[#20E3A2]/10 text-[#20E3A2]"
                  : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
              ].join(" ")}
            >
              Verified only
            </button>
            <button
              onClick={() => setHasMetricsOnly((v) => !v)}
              className={[
                "rounded-full border px-3 py-1 text-xs",
                hasMetricsOnly
                  ? "border-[#36D6E7]/40 bg-[#36D6E7]/10 text-[#36D6E7]"
                  : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
              ].join(" ")}
            >
              Has Metrics
            </button>
            <button
              onClick={resetFilters}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 hover:bg-white/[0.07] hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Content grid: filters + cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-12">
          {/* Filters rail */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Filters</div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-white/60 hover:text-white"
                >
                  Reset
                </button>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="text-xs font-semibold text-white/70">Categories</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categories.map((x) => (
                      <button
                        key={x}
                        onClick={() => toggleCapability(x)}
                        className={[
                          "rounded-full border px-3 py-1 text-xs",
                          selectedCapabilities.includes(x)
                            ? "border-[#7B3FF2]/40 bg-[#7B3FF2]/10 text-[#7B3FF2]"
                            : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
                        ].join(" ")}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-white/70">Verification</div>
                  <div className="mt-2 grid gap-2">
                    <button
                      onClick={() => setCodeVerifiedOnly((v) => !v)}
                      className={[
                        "flex items-center justify-between rounded-2xl border px-3 py-2 text-sm",
                        codeVerifiedOnly
                          ? "border-[#20E3A2]/40 bg-[#20E3A2]/10 text-[#20E3A2]"
                          : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
                      ].join(" ")}
                    >
                      <span>Code Verified</span>
                      <span className="text-xs">{codeVerifiedOnly ? "On" : "Off"}</span>
                    </button>
                    <button
                      onClick={() => setHasMetricsOnly((v) => !v)}
                      className={[
                        "flex items-center justify-between rounded-2xl border px-3 py-2 text-sm",
                        hasMetricsOnly
                          ? "border-[#36D6E7]/40 bg-[#36D6E7]/10 text-[#36D6E7]"
                          : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
                      ].join(" ")}
                    >
                      <span>Has Performance Data</span>
                      <span className="text-xs">{hasMetricsOnly ? "On" : "Off"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Agent grid */}
          <section className="md:col-span-8 lg:col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-white/70">
                {isLoading ? (
                  <>Loading agents from Sepolia…</>
                ) : error ? (
                  <span className="text-red-400">Error: {error}</span>
                ) : (
                  <>
                    Showing <span className="text-white">{filtered.length}</span> agents
                  </>
                )}
              </div>
              <div className="text-xs text-white/50">Sourced from Sepolia contracts</div>
            </div>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-white/10" />
                      <div className="space-y-2">
                        <div className="h-3 w-24 rounded bg-white/10" />
                        <div className="h-2 w-16 rounded bg-white/10" />
                      </div>
                    </div>
                    <div className="mt-4 h-10 rounded bg-white/10" />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="h-14 rounded-xl bg-white/10" />
                      <div className="h-14 rounded-xl bg-white/10" />
                    </div>
                    <div className="mt-4 h-8 rounded-xl bg-white/10" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                <div className="text-lg font-semibold">No agents found</div>
                <p className="mt-2 text-sm text-white/60">
                  {allViewModels.length === 0
                    ? "No ERC-8004 agents have been listed on Sepolia yet."
                    : "Try adjusting your filters or search terms."}
                </p>
                {(search || selectedCapabilities.length > 0 || codeVerifiedOnly || hasMetricsOnly) && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((agent) => (
                  <AgentCard key={agent.tokenId} agent={agent} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
