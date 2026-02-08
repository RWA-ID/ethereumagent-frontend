"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatEther } from "viem";
import Navbar from "../../_components/Navbar";
import { useAgentMetadata, useAgentPerformance, useAgentListing } from "@/hooks/useContracts";
import { useIpfsMetadata } from "@/hooks/useIpfsMetadata";
import { useBuyAgent } from "@/hooks/useBuyAgent";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS } from "@/contracts";

function AgentDetailContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const tokenId = idParam ? BigInt(idParam) : undefined;

  const { address } = useAccount();

  const { data: metadataRaw, isLoading: metaLoading } = useAgentMetadata(tokenId ?? 0n);
  const { data: metricsRaw, isLoading: metricsLoading } = useAgentPerformance(tokenId ?? 0n);
  const { data: listingRaw, isLoading: listingLoading } = useAgentListing(tokenId ?? 0n);

  const metadata = metadataRaw as
    | [string, `0x${string}`, `0x${string}`, `0x${string}`, bigint, string[]]
    | undefined;
  const metrics = metricsRaw as
    | [bigint, bigint, bigint, bigint, boolean]
    | undefined;
  const listing = listingRaw as
    | [`0x${string}`, bigint, string, boolean, bigint, boolean]
    | undefined;

  const ipfsHash = metadata?.[0];
  const { name: ipfsName, description: ipfsDescription } = useIpfsMetadata(ipfsHash);

  const isListed = listing?.[5] === true;
  const listingPrice = isListed ? listing![1] : undefined;
  const codeVerified = listing?.[3] ?? false;
  const ipfsCodeHash = listing?.[2] ?? "";
  const seller = listing?.[0];

  const {
    buy,
    totalCost,
    fee,
    isPending: buyPending,
    isConfirmed: buyConfirmed,
    error: buyError,
    txHash,
  } = useBuyAgent(tokenId, listingPrice);

  const { data: sellerCompletedSales } = useReadContract({
    ...CONTRACTS.marketplace,
    functionName: "sellerCompletedSales",
    args: seller ? [seller] : undefined,
    query: { enabled: !!seller },
  });

  const isLoading = metaLoading || metricsLoading || listingLoading;
  const hasEscrow =
    sellerCompletedSales != null && (sellerCompletedSales as bigint) < 3n;

  if (!tokenId) {
    return (
      <div className="min-h-screen bg-[#070A12] text-white">
        <Navbar subtitle="Agent details" />
        <main className="mx-auto max-w-6xl px-5 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm text-white/70">No agent ID specified.</div>
            <Link
              href="/marketplace"
              className="mt-3 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Back to marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070A12] text-white">
        <Navbar subtitle="Agent details" />
        <main className="mx-auto max-w-6xl px-5 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-7 w-48 rounded bg-white/10" />
              <div className="h-4 w-64 rounded bg-white/10" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className="min-h-screen bg-[#070A12] text-white">
        <Navbar subtitle="Agent details" />
        <main className="mx-auto max-w-6xl px-5 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm text-white/70">Agent not found:</div>
            <div className="mt-1 text-xl font-semibold">Token #{idParam}</div>
            <p className="mt-3 text-sm text-white/60">
              This token may not exist on Sepolia.
            </p>
            <Link
              href="/marketplace"
              className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Back to marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const agentName = ipfsName || `Agent #${tokenId.toString()}`;
  const agentDescription =
    ipfsDescription || metadata[5]?.join(", ") || "ERC-8004 autonomous agent";
  const capabilities = metadata[5] ?? [];
  const creator = metadata[3];
  const revenueDistributor = metadata[2];

  const hasMetrics = metrics?.[4] === true;
  const totalRevenue = hasMetrics ? formatEther(metrics![0]) : "—";
  const tradesExecuted = hasMetrics ? metrics![1].toString() : "0";
  const winRate = hasMetrics
    ? `${(Number(metrics![2]) / 100).toFixed(1)}%`
    : "—";

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <Navbar subtitle="Agent details" />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-4">
          <Link
            href="/marketplace"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07] hover:text-white"
          >
            ← Back to marketplace
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: Agent info */}
            <div className="flex-1">
              <div className="text-xs text-white/60">Sepolia • Token #{tokenId.toString()}</div>
              <div className="mt-1 text-2xl font-semibold">{agentName}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {codeVerified && (
                  <span className="rounded-full bg-[#20E3A2]/10 px-2 py-1 text-[10px] text-[#20E3A2]">
                    Code Verified
                  </span>
                )}
                {isListed && (
                  <span className="rounded-full bg-[#7B3FF2]/10 px-2 py-1 text-[10px] text-[#7B3FF2]">
                    Listed
                  </span>
                )}
                {hasEscrow && (
                  <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-[10px] text-yellow-400">
                    Escrow Protected
                  </span>
                )}
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
                {agentDescription}
              </p>

              {capabilities.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-white/50">Capabilities</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {capabilities.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-1 text-xs text-white/50">
                <div>
                  Creator:{" "}
                  <span className="text-white/70">{creator}</span>
                </div>
                <div>
                  Revenue Distributor:{" "}
                  <span className="text-white/70">{revenueDistributor}</span>
                </div>
              </div>
            </div>

            {/* Right: Buy panel */}
            <div className="w-full space-y-3 md:w-[320px]">
              {isListed && listingPrice != null ? (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-xs text-white/50">Listing Price</div>
                    <div className="mt-1 text-xl font-semibold">
                      {formatEther(listingPrice)} ETH
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-white/50">
                      <div>
                        Buyer fee: {fee > 0n ? formatEther(fee) : "—"} ETH (2%)
                      </div>
                      <div>
                        Total cost:{" "}
                        <span className="text-white/80">
                          {totalCost > 0n ? formatEther(totalCost) : "—"} ETH
                        </span>
                      </div>
                    </div>
                    {hasEscrow && (
                      <div className="mt-2 rounded-xl bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
                        This seller has fewer than 3 completed sales. Payment
                        will be escrowed for 7 days for buyer protection.
                      </div>
                    )}
                  </div>

                  {buyConfirmed ? (
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-[#20E3A2]/30 bg-[#20E3A2]/10 p-4 text-center">
                        <div className="text-sm font-semibold text-[#20E3A2]">
                          Purchase Successful!
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          Transaction: {txHash?.slice(0, 10)}…
                        </div>
                      </div>

                      {ipfsCodeHash && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="text-xs font-semibold text-white/70">
                            Download Agent Code
                          </div>
                          <a
                            href={`https://ipfs.io/ipfs/${ipfsCodeHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs text-[#36D6E7] underline"
                          >
                            ipfs://{ipfsCodeHash.slice(0, 16)}…
                          </a>
                          <div className="mt-3 text-xs text-white/50">
                            <div className="font-semibold text-white/70">Deploy Instructions:</div>
                            <ol className="mt-1 list-inside list-decimal space-y-1">
                              <li>Download the agent code from IPFS</li>
                              <li>Add your API keys to the config</li>
                              <li>Deploy via Docker or your preferred runtime</li>
                              <li>
                                Profits sent to your wallet via RevenueDistributor
                              </li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {!codeVerified ? (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center text-xs text-white/60">
                          Awaiting code verification — not yet purchasable
                        </div>
                      ) : (
                        <button
                          onClick={buy}
                          disabled={buyPending || !address}
                          className="w-full rounded-2xl bg-gradient-to-r from-[#7B3FF2] to-[#36D6E7] px-5 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                        >
                          {buyPending
                            ? "Processing…"
                            : !address
                              ? "Connect Wallet to Buy"
                              : `Buy Agent — ${totalCost > 0n ? formatEther(totalCost) : "—"} ETH`}
                        </button>
                      )}

                      {buyError && (
                        <div className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">
                          {buyError.message?.slice(0, 120)}
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center text-sm text-white/60">
                  This agent is not currently listed for sale.
                </div>
              )}
            </div>
          </div>

          {/* Metrics grid */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs text-white/50">Win Rate</div>
              <div className="mt-1 text-lg font-semibold text-[#20E3A2]">
                {winRate}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs text-white/50">Total Revenue</div>
              <div className="mt-1 text-lg font-semibold">
                {totalRevenue} {hasMetrics ? "ETH" : ""}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs text-white/50">Trades Executed</div>
              <div className="mt-1 text-lg font-semibold">{tradesExecuted}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AgentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070A12] text-white">
          <div className="mx-auto max-w-6xl px-5 py-10">
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-7 w-48 rounded bg-white/10" />
            </div>
          </div>
        </div>
      }
    >
      <AgentDetailContent />
    </Suspense>
  );
}
