'use client';
import { useEffect, useRef, useState } from 'react';
export default function CountUp({ to, suffix = '', dur = 1400 }) {
  const ref = useRef(null); const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t) => { const k = Math.min(1, (t - t0) / dur); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>;
}
