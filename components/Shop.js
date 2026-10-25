'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Card from './Card';
import Icon from './Icon';
import Reveal from './Reveal';
import { useStore } from './Store';
import { PRODUCTS, CATS, OCCS, BUDGETS, COLORS, price, inr, search, WA } from '../lib/data';

const SORTS = [['feat', 'Featured'], ['lo', 'Price: low to high'], ['hi', 'Price: high to low'], ['wt', 'Weight: low to high']];
const PAGE = 24;

export default function Shop({ init }) {
  const { rates } = useStore();
  const [f, setF] = useState({ metal: init.metal || 'all', cat: init.cat || 'all', occ: init.occ || 'all', col: init.col || 'all', gem: init.gem === '1', min: +init.min || 0, max: +init.max || 1e9, q: init.q || '' });
  const [sort, setSort] = useState('feat'), [n, setN] = useState(PAGE), [panel, setPanel] = useState(false), [fade, setFade] = useState(0);
  const more = useRef(null);
  const set = (k, v) => { setF((x) => ({ ...x, [k]: v })); setN(PAGE); setFade((x) => x + 1); };
  const tot = useMemo(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, price(p, rates).total])), [rates]);

  const list = useMemo(() => {
    let l = f.q ? search(f.q) : PRODUCTS;
    l = l.filter((p) => (f.metal === 'all' || p.metal === f.metal) && (f.cat === 'all' || p.cat === f.cat) && (f.occ === 'all' || p.occ === f.occ) && (f.col === 'all' || p.col === f.col) && (!f.gem || p.gem) && tot[p.id] >= f.min && tot[p.id] <= f.max);
    if (sort === 'lo') l = [...l].sort((a, b) => tot[a.id] - tot[b.id]);
    if (sort === 'hi') l = [...l].sort((a, b) => tot[b.id] - tot[a.id]);
    if (sort === 'wt') l = [...l].sort((a, b) => a.w - b.w);
    return l;
  }, [f, sort, tot]);

  useEffect(() => {
    const el = more.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setN((x) => x + PAGE), { rootMargin: '400px' });
    io.observe(el); return () => io.disconnect();
  }, [list.length, n]);
  useEffect(() => { document.body.style.overflow = panel ? 'hidden' : ''; }, [panel]);

  const chips = [];
  if (f.q) chips.push(['q', `“${f.q}”`, ''], );
  if (f.metal !== 'all') chips.push(['metal', f.metal[0].toUpperCase() + f.metal.slice(1), 'all']);
  if (f.cat !== 'all') chips.push(['cat', f.cat, 'all']);
  if (f.occ !== 'all') chips.push(['occ', f.occ, 'all']);
  if (f.col !== 'all') chips.push(['col', COLORS[f.col].label, 'all']);
  if (f.gem) chips.push(['gem', 'Gemstone', false]);
  if (f.min > 0 || f.max < 1e9) chips.push(['price', f.min && f.max < 1e9 ? `${inr(f.min)} – ${inr(f.max)}` : f.max < 1e9 ? `Under ${inr(f.max)}` : `Above ${inr(f.min)}`, 0]);
  const drop = (k, v) => (k === 'price' ? (setF((x) => ({ ...x, min: 0, max: 1e9 })), setN(PAGE)) : set(k, v));
  const clear = () => { setF({ metal: 'all', cat: 'all', occ: 'all', col: 'all', gem: false, min: 0, max: 1e9, q: '' }); setN(PAGE); };

  const Opt = ({ k, v, label, ic }) => <button className={'fopt' + (f[k] === v ? ' on' : '')} onClick={() => set(k, v)}>{ic && <Icon n={ic} size={18} />}{label}<i /></button>;
  const Filters = (
    <div className="fgroups">
      <details open><summary>Category</summary><Opt k="cat" v="all" label="All" />{CATS.map((c) => <Opt key={c} k="cat" v={c} label={c} ic={{ Rings: 'ring', Earrings: 'earring', Necklaces: 'necklace', Bracelets: 'bracelet' }[c]} />)}</details>
      <details open><summary>Metal</summary><Opt k="metal" v="all" label="All" /><Opt k="metal" v="gold" label="Gold" /><Opt k="metal" v="diamond" label="Diamond" /><Opt k="metal" v="platinum" label="Platinum" /></details>
      <details open><summary>Colour</summary><div className="swr">{Object.entries(COLORS).map(([k, c]) => <button key={k} className={'sw' + (f.col === k ? ' on' : '')} title={c.label} onClick={() => set('col', f.col === k ? 'all' : k)} style={{ background: c.hex }} aria-label={c.label} />)}</div></details>
      <details open><summary>Price</summary>
        <button className={'fopt' + (f.min === 0 && f.max === 1e9 ? ' on' : '')} onClick={() => setF((x) => ({ ...x, min: 0, max: 1e9 }))}>Any price<i /></button>
        {BUDGETS.map(([t, lo, hi]) => <button key={t} className={'fopt' + (f.min === lo && f.max === hi ? ' on' : '')} onClick={() => { setF((x) => ({ ...x, min: lo, max: hi })); setN(PAGE); setFade((y) => y + 1); }}>{t}<i /></button>)}
      </details>
      <details open><summary>Occasion</summary><Opt k="occ" v="all" label="All" />{OCCS.map(([o]) => <Opt key={o} k="occ" v={o} label={o} />)}</details>
      <details><summary>Gemstones</summary><button className={'fopt' + (f.gem ? ' on' : '')} onClick={() => set('gem', !f.gem)}>With coloured gemstones<i /></button></details>
    </div>
  );

  const title = f.occ !== 'all' ? f.occ + ' jewellery' : f.q ? `Results for “${f.q}”` : f.cat !== 'all' ? f.cat : f.metal !== 'all' ? f.metal[0].toUpperCase() + f.metal.slice(1) + ' jewellery' : 'All jewellery';
  return (
    <div className="wrap sec shp">
      <nav className="crumb"><Link href="/">Home</Link><Icon n="chev" size={12} /><span>{title}</span></nav>
      <div className="shead"><h1 className="h1s">{title}</h1><p className="mut">{list.length} designs</p></div>
      <div className="stool">
        <button className="btn alt fbtn" onClick={() => setPanel(true)}><Icon n="filter" size={18} /> Filters{chips.length > 0 && ` (${chips.length})`}</button>
        <div className="chips">{chips.map(([k, l, v]) => <button key={k} className="chip" onClick={() => drop(k, v)}>{l}<Icon n="close" size={13} /></button>)}{chips.length > 1 && <button className="clr" onClick={clear}>Clear all</button>}</div>
        <label className="sortl">Sort<select value={sort} onChange={(e) => setSort(e.target.value)}>{SORTS.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></label>
      </div>
      <div className="shw">
        <aside className={'side' + (panel ? ' open' : '')}>
          <div className="sidh"><b>Filters</b><button onClick={() => setPanel(false)} aria-label="Close"><Icon n="close" size={22} /></button></div>
          {Filters}
          <div className="sidf"><button className="btn gold full" onClick={() => setPanel(false)}>Show {list.length} designs</button></div>
        </aside>
        <div className="sbg" onClick={() => setPanel(false)} />
        <div className="res">
          {list.length ? (
            <>
              <div className="grid" key={fade}>{list.slice(0, n).map((p, i) => <div className="gi" key={p.id} style={{ '--d': (i % PAGE) * 30 + 'ms' }}><Card p={p} /></div>)}</div>
              {n < list.length && <div ref={more} className="lmore"><span className="spin" />Loading more designs</div>}
            </>
          ) : (
            <div className="none"><Icon n="gem" size={48} sw={1} /><h3>No designs match these filters</h3><p>Try widening the price range or <button className="lnk" onClick={clear}>clear all filters</button>, or <a href={`https://wa.me/${WA}`} className="lnk" target="_blank" rel="noreferrer">ask us on WhatsApp</a> and we will find it.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
