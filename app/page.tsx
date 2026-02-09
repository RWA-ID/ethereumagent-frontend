"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./_components/Navbar";

/* ── Animated Ethereum diamond SVG ─────────────────────────── */
function EthLogo({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 256 417"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ scale: 1, opacity: 0.85 }}
      animate={{
        scale: [1, 1.06, 1],
        opacity: [0.85, 1, 0.85],
        filter: [
          "drop-shadow(0 0 24px rgba(123,63,242,0.35))",
          "drop-shadow(0 0 48px rgba(54,214,231,0.55))",
          "drop-shadow(0 0 24px rgba(123,63,242,0.35))",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Top half */}
      <motion.path
        d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
        fill="url(#ethGrad1)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      />
      <motion.path
        d="M127.962 0L0 212.32l127.962 75.639V154.158z"
        fill="url(#ethGrad2)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />
      {/* Bottom half */}
      <motion.path
        d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.601L256 236.587z"
        fill="url(#ethGrad3)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      <motion.path
        d="M127.962 416.905v-104.72L0 236.585z"
        fill="url(#ethGrad4)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />
      <defs>
        <linearGradient id="ethGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B3FF2" />
          <stop offset="100%" stopColor="#36D6E7" />
        </linearGradient>
        <linearGradient id="ethGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B3FF2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#20E3A2" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="ethGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#36D6E7" />
          <stop offset="100%" stopColor="#20E3A2" />
        </linearGradient>
        <linearGradient id="ethGrad4" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#36D6E7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7B3FF2" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

/* ── Step card ─────────────────────────────────────────────── */
function StepCard({
  num,
  title,
  desc,
  accent,
  delay,
}: {
  num: number;
  title: string;
  desc: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
        style={{ background: `${accent}18`, color: accent }}
      >
        {num}
      </div>
      <div className="mt-3 text-sm font-semibold">{title}</div>
      <p className="mt-1.5 text-xs leading-relaxed text-white/60">{desc}</p>
    </motion.div>
  );
}

/* ── Architecture flow line item ───────────────────────────── */
function FlowStep({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start gap-3"
    >
      <span className="mt-0.5 text-[#20E3A2]">&#10003;</span>
      <span className="text-sm text-white/70">{text}</span>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070A12] text-white overflow-hidden">
      {/* Ambient glow behind hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#7B3FF2]/12 via-[#36D6E7]/8 to-transparent blur-3xl" />
      </div>

      <div className="relative">
        <Navbar />
      </div>

      {/* ═══ HERO ═══ */}
      <main className="relative mx-auto max-w-6xl px-5 pt-16 pb-20">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
          {/* Copy */}
          <div className="max-w-2xl flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#36D6E7]" />
              ERC-8004 agents marketplace
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Discover, verify, and buy ERC-8004 agents.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              Browse code-verified Ethereum agents with clear validation signals, on-chain
              performance metrics, and reputation scoring on Sepolia testnet.
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

          {/* Pulsating Ethereum logo */}
          <div className="relative flex items-center justify-center">
            {/* Orbital rings */}
            <motion.div
              className="absolute h-56 w-56 rounded-full border border-[#7B3FF2]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute h-72 w-72 rounded-full border border-[#36D6E7]/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            {/* Breathing glow */}
            <motion.div
              className="absolute h-40 w-40 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 60px 20px rgba(123,63,242,0.15)",
                  "0 0 90px 40px rgba(54,214,231,0.20)",
                  "0 0 60px 20px rgba(123,63,242,0.15)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <EthLogo className="h-32 w-32 md:h-40 md:w-40" />
          </div>
        </div>
      </main>

      {/* ═══ ARCHITECTURE FLOW ═══ */}
      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Left: explanation */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7B3FF2]" />
                Architecture
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                How a sale works
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Alice lists her agent for 1 ETH. Bob buys it. Here&apos;s what happens on-chain:
              </p>

              <div className="mt-6 space-y-3">
                <FlowStep delay={0.1} text="Token ID 1 ownership transfers: Alice → Bob" />
                <FlowStep delay={0.15} text="Bob downloads agent code from IPFS (ipfs://QmABC123…)" />
                <FlowStep delay={0.2} text="Bob runs the code locally with his own API keys" />
                <FlowStep delay={0.25} text="Bob's instance sends profits to the RevenueDistributor contract" />
                <FlowStep delay={0.3} text="RevenueDistributor checks: ownerOf(1) == Bob ✓" />
                <FlowStep delay={0.35} text="Revenue goes directly to Bob's wallet" />
              </div>
            </div>

            {/* Right: visual diagram */}
            <div className="flex flex-1 items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="w-full max-w-xs space-y-3"
              >
                {[
                  { label: "AgentNFT", sub: "Ownership + Metadata", color: "#7B3FF2" },
                  { label: "AgentMarketplace", sub: "List + Buy + Escrow", color: "#36D6E7" },
                  { label: "PerformanceOracle", sub: "On-chain Metrics", color: "#20E3A2" },
                  { label: "RevenueDistributor", sub: "Profit → Owner", color: "#7B3FF2" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: item.color }}
                      />
                      <div>
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div className="text-[10px] text-white/50">{item.sub}</div>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="ml-[11px] mt-1 h-3 border-l border-dashed border-white/15" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36D6E7]" />
            Step by step
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">How It Works</h2>
        </motion.div>

        {/* For Sellers */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="rounded-full bg-[#7B3FF2]/10 px-3 py-1 text-xs font-semibold text-[#7B3FF2]">
              For Sellers
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#7B3FF2]/30 to-transparent" />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              num={1}
              title="Connect Wallet"
              desc="System auto-detects ERC-8004 agent ownership. Your agents appear instantly."
              accent="#7B3FF2"
              delay={0}
            />
            <StepCard
              num={2}
              title="Select Agent & Create Listing"
              desc="Click your agent, set a price, and submit the agent's code for verification."
              accent="#7B3FF2"
              delay={0.06}
            />
            <StepCard
              num={3}
              title="Performance Reported"
              desc="Metrics are automatically generated via on-chain oracles — revenue, trades, win rate."
              accent="#7B3FF2"
              delay={0.12}
            />
            <StepCard
              num={4}
              title="List for Sale"
              desc="Set your price and submit code for verification. Your first 3 sales go through 7-day escrow to build seller reputation."
              accent="#7B3FF2"
              delay={0.18}
            />
          </div>
        </div>

        {/* For Buyers */}
        <div className="mt-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="rounded-full bg-[#36D6E7]/10 px-3 py-1 text-xs font-semibold text-[#36D6E7]">
              For Buyers
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#36D6E7]/30 to-transparent" />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              num={1}
              title="Browse Verified Agents"
              desc="All agents are code-verified with proven on-chain performance metrics."
              accent="#36D6E7"
              delay={0}
            />
            <StepCard
              num={2}
              title="Purchase the NFT"
              desc="Pay listing price + 2% buyer fee. First 3 sales from new sellers are escrowed 7 days for buyer protection."
              accent="#36D6E7"
              delay={0.06}
            />
            <StepCard
              num={3}
              title="Download & Configure"
              desc="Get agent code from IPFS, add your API keys, and deploy via Docker."
              accent="#36D6E7"
              delay={0.12}
            />
            <StepCard
              num={4}
              title="Earn Revenue"
              desc="Your agent automatically sends all profits to your wallet via the RevenueDistributor contract."
              accent="#20E3A2"
              delay={0.18}
            />
          </div>
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#7B3FF2]/8 via-[#36D6E7]/6 to-[#20E3A2]/4 p-10 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
            Browse the marketplace to find revenue-generating agents, or list your own ERC-8004 agent for sale.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

          {/* Social links */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <a
              href="https://x.com/ethereum_agent?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden sm:inline">@ethereum_agent</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://t.me/ethereumagents"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
