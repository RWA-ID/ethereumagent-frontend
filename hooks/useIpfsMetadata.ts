'use client';

import { useEffect, useState } from 'react';

type IpfsMetadata = {
  name?: string;
  description?: string;
};

export function useIpfsMetadata(ipfsHash: string | undefined) {
  const [data, setData] = useState<IpfsMetadata>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ipfsHash) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const url = `https://ipfs.io/ipfs/${ipfsHash}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error('fetch failed');
        const json = await res.json();
        if (cancelled) return;
        setData({
          name: json.name ?? undefined,
          description: json.description ?? undefined,
        });
      } catch {
        // graceful fallback — no metadata
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [ipfsHash]);

  return { ...data, loading };
}
