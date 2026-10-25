'use client';
import { useState } from 'react';
import Card from './Card';
import { useStore } from './Store';
import { PRODUCTS, price, inr, WA } from '../lib/data';
export default function Shop({ m, c, o = 'all', q = '' }) {
  const { rates } = useStore();
  const [metal, setM] = useState(m), [cat, setC] = useState(c), [sort, setS] = useState('new'), [max, setMax] = useState(500000);
  const t = (p) => price(p, rates).total;
  let list = PRODUCTS.filter((p) => (metal === 'all' || p.metal === metal) && (cat === 'all' || p.cat === cat) && (o === 'all' || p.occ === o) && p.name.toLowerCase().includes(q.toLowerCase()) && t(p) <= max);
  if (sort === 'lo') list = [...list].sort((a, b) => t(a) - t(b));
  if (sort === 'hi') list = [...list].sort((a, b) => t(b) - t(a));
  return (
    <div className="wrap sec">
      <h1 className="h1s">{o !== 'all' ? o : q ? `Results for “${q}”` : 'Jewellery'}</h1>
      <div className="filters">
        <div>{['all', 'gold', 'silver', 'diamond'].map((x) => <button key={x} className={'pill' + (metal === x ? ' on' : '')} onClick={() => setM(x)}>{x === 'all' ? 'All' : x[0].toUpperCase() + x.slice(1)}</button>)}</div>
        <select value={cat} onChange={(e) => setC(e.target.value)} aria-label="Type">
          <option value="all">All types</option>
          {['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Chains', 'Pendants'].map((x) => <option key={x}>{x}</option>)}
        </select>
        <select value={sort} onChange={(e) => setS(e.target.value)} aria-label="Sort">
          <option value="new">Featured</option><option value="lo">Price, low to high</option><option value="hi">Price, high to low</option>
        </select>
        <label>Up to {inr(max)}<input type="range" min="5000" max="500000" step="5000" value={max} onChange={(e) => setMax(+e.target.value)} /></label>
      </div>
      {list.length ? <div className="grid">{list.map((p) => <Card key={p.id} p={p} />)}</div> : (
        <p>Nothing matches these filters. Raise the price limit, or <a href={`https://wa.me/${WA}`}><u>ask us on WhatsApp</u></a> and we will find it.</p>
      )}
    </div>
  );
}
