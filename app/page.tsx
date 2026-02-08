"use client";

import Link from "next/link";
import Navbar from "./_components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36D6E7]" />
            ERC-8004 agents marketplace
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Discover, verify, and buy ERC-8004 agents.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/70">
            Browse code-verified Ethereum agents with clear validation signals, on-chain performance
            metrics, and reputation scoring on Sepolia testnet.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20E3A2]" />
            Sepolia testnet beta
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Browse marketplace
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/[0.07] hover:text-white"
            >
              List an agent
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
