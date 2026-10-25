'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from './Icon';
import Pic from './Pic';
import { useStore } from './Store';
import { search, price, inr } from '../lib/data';

const HINTS = ['diamond earrings', 'rose gold rings', 'wedding bands', 'platinum bracelet', 'gemstone necklace', 'daily wear gold'];
export default function SearchBox({ onGo }) {
  const r = useRouter(); const { rates } = useStore();
  const [q, setQ] = useState(''), [open, setOpen] = useState(false), [h, setH] = useState(0);
  const box = useRef(null);
  useEffect(() => { const t = setInterval(() => setH((x) => (x + 1) % HINTS.length), 2600); return () => clearInterval(t); }, []);
  useEffect(() => {
    const f = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', f); return () => document.removeEventListener('mousedown', f);
  }, []);
  const res = useMemo(() => (q.trim().length > 1 ? search(q) : []), [q]);
  const go = (e) => { e.preventDefault(); if (!q.trim()) return; setOpen(false); onGo && onGo(); r.push('/shop?q=' + encodeURIComponent(q.trim())); };
  return (
    <div className="sbox" ref={box}>
      <form className="srch" onSubmit={go} role="search">
        <Icon n="search" size={20} />
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} aria-label="Search jewellery" placeholder=" " />
        {!q && <span className="ph" key={h}>Search for <b>{HINTS[h]}</b></span>}
        {q && <button type="button" className="clr" onClick={() => setQ('')} aria-label="Clear"><Icon n="close" size={16} /></button>}
      </form>
      {open && q.trim().length > 1 && (
        <div className="sdrop">
          {res.length ? <>
            <p className="sh">{res.length} results</p>
            {res.slice(0, 5).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="srow" onClick={() => { setOpen(false); onGo && onGo(); }}>
                <Pic p={p} /><span><b>{p.n}</b><small>{p.cat} · {p.w} g</small></span><em>{inr(price(p, rates).total)}</em>
              </Link>
            ))}
            <button className="sall" onClick={go}>See all results for “{q}” <Icon n="chev" size={16} /></button>
          </> : <p className="sh">No match for “{q}”. Try “diamond ring” or “rose gold”.</p>}
        </div>
      )}
    </div>
  );
}
