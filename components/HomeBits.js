'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Card from './Card';
import Icon from './Icon';
import { useStore } from './Store';
import { PRODUCTS, rateOf, inr, CATS } from '../lib/data';
import { WA } from '../lib/data';

export function Trending() {
  const [tab, setTab] = useState('All');
  const ref = useRef(null);
  const list = PRODUCTS.filter((p) => tab === 'All' || p.cat === tab).slice(0, 12);
  const sc = (d) => ref.current && ref.current.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div>
      <div className="tabs" role="tablist">{['All', ...CATS].map((t) => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => { setTab(t); if (ref.current) ref.current.scrollTo({ left: 0 }); }}>{t}</button>)}</div>
      <div className="rail">
        <button className="rb l" onClick={() => sc(-1)} aria-label="Scroll left"><Icon n="left" size={22} /></button>
        <div className="rscroll" ref={ref} key={tab}>
          {list.map((p, i) => <div className="ritem" key={p.id} style={{ '--d': i * 55 + 'ms' }}><Card p={p} badge={i < 3 ? 'Bestseller' : undefined} /></div>)}
        </div>
        <button className="rb r" onClick={() => sc(1)} aria-label="Scroll right"><Icon n="chev" size={22} /></button>
      </div>
    </div>
  );
}

export function ExchangeCalc() {
  const { rates } = useStore();
  const [w, setW] = useState(20), [k, setK] = useState(22);
  const val = w * rateOf(rates, k);
  return (
    <div className="calc">
      <h3>Know your old gold’s value</h3>
      <div className="crow">
        <label>Weight (grams)<input type="number" min="1" max="2000" value={w} onChange={(e) => setW(Math.max(0, Math.min(2000, +e.target.value)))} /></label>
        <label>Purity<select value={k} onChange={(e) => setK(+e.target.value)}><option value={24}>24K</option><option value={22}>22K</option><option value={18}>18K</option></select></label>
      </div>
      <p className="cval"><small>You get</small><b>{inr(val)}</b></p>
      <p className="mut">At today’s {k}K rate of {inr(rateOf(rates, k))} per gram with 0% deduction (demo rate).</p>
      <a className="btn gold full" href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi, I want to exchange ${w} g of ${k}K gold`)}`} target="_blank" rel="noreferrer">Book an exchange on WhatsApp</a>
    </div>
  );
}

export function Enquiry() {
  const [f, setF] = useState({ n: '', ph: '', b: '50K – 2L' }), [done, setDone] = useState(false);
  const ok = f.n.trim().length > 1 && /^\d{10}$/.test(f.ph);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  if (done) return <div className="okbox"><svg className="tick" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg><h3>Thank you, {f.n.split(' ')[0]}.</h3><p>A Gamya jewellery expert will call you on {f.ph}. (Demo: nobody will actually call.)</p></div>;
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }}>
      <label>Your name<input value={f.n} onChange={set('n')} autoComplete="name" /></label>
      <label>Mobile number<input inputMode="numeric" maxLength={10} value={f.ph} onChange={(e) => setF({ ...f, ph: e.target.value.replace(/\D/g, '') })} autoComplete="tel" /></label>
      <label>Budget<select value={f.b} onChange={set('b')}><option>Under 50K</option><option>50K – 2L</option><option>2L – 5L</option><option>5L and above</option></select></label>
      <button className="btn gold full" disabled={!ok}>Request a call back</button>
    </form>
  );
}
