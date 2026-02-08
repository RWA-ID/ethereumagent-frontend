"use client";

import { motion } from "framer-motion";
import AgentCard from "./AgentCard";
import type { AgentViewModel } from "@/lib/types";

export default function FeaturedRow({ agents }: { agents: AgentViewModel[] }) {
  if (agents.length === 0) return null;

  return (
    <section className="mt-7">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36D6E7]" />
            Curated
          </div>
          <h2 className="mt-2 text-lg font-semibold">Featured agents</h2>
          <p className="mt-1 text-sm text-white/60">
            Highest trust signals + strongest recent performance.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="pointer-events-none absolute -inset-24 opacity-70 blur-3xl">
          <div className="h-full w-full bg-gradient-to-br from-[#7B3FF2]/18 via-[#36D6E7]/14 to-[#20E3A2]/12" />
        </div>

        {/* Desktop: 3-up grid */}
        <div className="relative hidden gap-4 md:grid md:grid-cols-3">
          {agents.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.tokenId}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22, delay: i * 0.06 }}
              className="scale-[1.02]"
            >
              <AgentCard agent={a} featured />
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal snap */}
        <div className="relative md:hidden">
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {agents.slice(0, 4).map((a, i) => (
              <motion.div
                key={a.tokenId}
                initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 220, damping: 22, delay: i * 0.06 }}
                className="w-[86%] shrink-0 snap-center"
              >
                <AgentCard agent={a} featured />
              </motion.div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-white/50">
            <span>Swipe</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1">
              Featured
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
