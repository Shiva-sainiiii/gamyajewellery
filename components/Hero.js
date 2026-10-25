'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Pic from './Pic';
import { first } from '../lib/data';

const SLIDES = [
  { k: 'wed', cls: 'maroon', eye: 'Wedding season', h: ['Pre-book your', 'wedding jewellery'], p: 'Lock today’s gold rate and pay only when you are ready. Bands, bracelets and diamond sets.', cta: ['Shop wedding', '/shop?occ=Wedding'], pick: (p) => p.occ === 'Wedding' && p.dia },
  { k: 'exc', cls: 'bronze', eye: 'Gold exchange', h: ['Old gold.', 'New sparkle.'], p: 'Flat 0% deduction on exchange of old gold (18K and above) from any jeweller.*', cta: ['Know more', '/#exchange'], pick: (p) => p.cat === 'Necklaces' && !p.dia },
  { k: 'dia', cls: 'blush', eye: 'Diamonds', h: ['Diamonds', 'for every day'], p: 'Lightweight earrings, rings and bracelets, certified and priced openly by the gram.', cta: ['Shop diamond', '/shop?metal=diamond&occ=Daily%20wear'], pick: (p) => p.cat === 'Earrings' && p.dia },
  { k: 'plat', cls: 'slate', eye: 'Platinum', h: ['Platinum.', 'Forever.'], p: 'Pure 950 platinum bands and bracelets that never fade. Designed to be worn for a lifetime.', cta: ['Shop platinum', '/shop?metal=platinum'], pick: (p) => p.k === 950 && p.cat === 'Bracelets' },
];

export default function Hero() {
  const [i, setI] = useState(0), [hold, setHold] = useState(false);
  const x0 = useRef(null);
  const go = (n) => setI((n + SLIDES.length) % SLIDES.length);
  useEffect(() => {
    if (hold) return;
    const t = setTimeout(() => go(i + 1), 5200);
    return () => clearTimeout(t);
  }, [i, hold]);
  return (
    <section className="hero" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { if (x0.current == null) return; const d = e.changedTouches[0].clientX - x0.current; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)); x0.current = null; }}>
      <div className="htrack" style={{ transform: `translateX(calc(var(--peek) - ${i} * (var(--sw) + var(--gap))))` }}>
        {SLIDES.map((s, n) => {
          const p = first(s.pick) || first(() => true);
          return (
            <article key={s.k} className={`hs ${s.cls}${n === i ? ' act' : ''}`} aria-hidden={n !== i}>
              <div className="sparks" aria-hidden="true">{Array.from({ length: 14 }, (_, q) => <i key={q} style={{ '--x': (q * 37) % 100 + '%', '--y': (q * 53) % 100 + '%', '--s': 0.5 + (q % 4) * 0.35, '--t': (q % 5) * 0.7 + 's' }} />)}</div>
              <div className="hcopy">
                <span className="eyebrow">{s.eye}</span>
                <h1>{s.h[0]}<br />{s.h[1]}</h1>
                <p>{s.p}</p>
                <Link href={s.cta[1]} className="btn light" tabIndex={n === i ? 0 : -1}>{s.cta[0]} <Icon n="chev" size={16} /></Link>
              </div>
              <div className="hart"><div className="arch"><Pic p={p} eager={n < 2} /></div><div className="ring r1" /><div className="ring r2" /></div>
            </article>
          );
        })}
      </div>
      <button className="hnav l" onClick={() => go(i - 1)} aria-label="Previous"><Icon n="left" size={22} /></button>
      <button className="hnav r" onClick={() => go(i + 1)} aria-label="Next"><Icon n="chev" size={22} /></button>
      <div className="hdots">{SLIDES.map((s, n) => <button key={s.k} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={`Slide ${n + 1}`}><span style={n === i && !hold ? { animation: 'fill 5.2s linear forwards' } : undefined} /></button>)}</div>
    </section>
  );
}
