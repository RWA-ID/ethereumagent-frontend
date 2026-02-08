"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AgentViewModel } from "@/lib/types";

export default function AgentCard({
  agent,
  featured = false,
}: {
  agent: AgentViewModel;
  featured?: boolean;
}) {
  const href = `/marketplace/agent?id=${agent.tokenId}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      whileHover={{ y: -6 }}
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-5",
        featured ? "border-white/15" : "border-white/10",
      ].join(" ")}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-gradient-to-br from-[#7B3FF2]/35 via-[#36D6E7]/22 to-[#20E3A2]/20" />
      </div>

      {featured && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7B3FF2]/20 via-[#36D6E7]/18 to-[#20E3A2]/14 blur-3xl" />
        </div>
      )}

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={[
              "h-12 w-12 rounded-xl shadow-[0_0_30px_rgba(123,63,242,0.20)]",
              featured
                ? "bg-gradient-to-br from-[#7B3FF2] via-[#36D6E7] to-[#20E3A2]"
                : "bg-gradient-to-br from-[#7B3FF2] to-[#36D6E7]",
            ].join(" ")}
          />

          <div>
            <div className="text-sm font-semibold">{agent.name}</div>
            <div className="text-xs text-white/50">
              #{agent.tokenId} • Sepolia
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {agent.codeVerified && (
            <div className="rounded-full bg-[#20E3A2]/10 px-2 py-1 text-[10px] text-[#20E3A2]">
              Verified
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="relative mt-3 line-clamp-2 text-sm leading-relaxed text-white/70">
        {agent.description}
      </p>

      {/* Capabilities */}
      {agent.capabilities.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1">
          {agent.capabilities.slice(0, featured ? 6 : 4).map((c) => (
            <span
              key={c}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Metrics */}
      <div className="relative mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-white/50">Win Rate</div>
          <div className="mt-1 text-sm font-semibold text-[#20E3A2]">
            {agent.winRate}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-white/50">Revenue</div>
          <div className="mt-1 text-sm font-semibold">{agent.totalRevenue}</div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative mt-4 flex items-center gap-2">
        <Link
          href={href}
          className={[
            "flex-1 rounded-xl px-3 py-2 text-center text-xs font-semibold",
            featured
              ? "bg-gradient-to-r from-[#7B3FF2] to-[#36D6E7] text-white hover:opacity-95"
              : "bg-white text-black hover:opacity-90",
          ].join(" ")}
        >
          View
        </Link>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white">
          {agent.price}
        </div>
      </div>

      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
}
