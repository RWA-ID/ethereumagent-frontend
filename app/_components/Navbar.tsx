'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar({ subtitle }: { subtitle?: string }) {
  return (
    <div className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/[0.04]" />
          <div>
            <div className="text-sm font-semibold">Ethereum Agents</div>
            <div className="text-xs text-white/60">{subtitle ?? 'ERC-8004 marketplace'}</div>
          </div>
          <div className="ml-2 rounded-full border border-[#36D6E7]/30 bg-[#36D6E7]/10 px-2 py-0.5 text-[10px] text-[#36D6E7]">
            Sepolia Testnet
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07] hover:text-white md:inline-flex"
          >
            Home
          </Link>
          <Link
            href="/marketplace"
            className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07] hover:text-white md:inline-flex"
          >
            Marketplace
          </Link>
          <Link
            href="/create"
            className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07] hover:text-white md:inline-flex"
          >
            List an Agent
          </Link>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
