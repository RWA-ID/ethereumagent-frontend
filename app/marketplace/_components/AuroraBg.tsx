"use client";

export default function AuroraBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_10%_10%,rgba(123,63,242,0.18),transparent_60%),radial-gradient(900px_600px_at_85%_15%,rgba(54,214,231,0.14),transparent_55%),radial-gradient(900px_700px_at_70%_85%,rgba(32,227,162,0.10),transparent_60%)]" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_0%,transparent_50%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
