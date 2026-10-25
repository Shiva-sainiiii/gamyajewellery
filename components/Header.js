'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import SearchBox from './SearchBox';
import Pic from './Pic';
import Logo from './Logo';
import { useStore } from './Store';
import { rateOf, inr, first } from '../lib/data';

const MSG = ['Last few days to pre-book wedding jewellery · Gold rate protection*', 'Flat 0% deduction on old gold exchange · All karats welcome', 'Free insured shipping on every order · 7 day returns'];
const NAV = [
  { t: 'All Jewellery', i: 'grid', h: '/shop' },
  { t: 'Gold', i: 'gold', h: '/shop?metal=gold', m: 'gold' },
  { t: 'Diamond', i: 'gem', h: '/shop?metal=diamond', m: 'diamond' },
  { t: 'Earrings', i: 'earring', h: '/shop?cat=Earrings' },
  { t: 'Rings', i: 'ring', h: '/shop?cat=Rings' },
  { t: 'Daily Wear', i: 'bracelet', h: '/shop?occ=Daily%20wear' },
  { t: 'Gemstone', i: 'star', h: '/shop?gem=1' },
  { t: 'Wedding', i: 'necklace', h: '/shop?occ=Wedding', m: 'wedding' },
  { t: 'Gifting', i: 'gift', h: '/shop?occ=Gifting' },
  { t: 'Under 50K', i: 'tag', h: '/shop?max=50000' },
];
const MEGA = {
  gold: { cols: [['By type', [['Rings', '/shop?metal=gold&cat=Rings'], ['Earrings', '/shop?metal=gold&cat=Earrings'], ['Necklaces', '/shop?metal=gold&cat=Necklaces'], ['Bracelets', '/shop?metal=gold&cat=Bracelets']]], ['By colour', [['Yellow gold', '/shop?col=yellow'], ['Rose gold', '/shop?col=rose'], ['White gold', '/shop?col=white'], ['Tri-colour', '/shop?col=tri']]], ['By budget', [['Under ₹50K', '/shop?metal=gold&max=50000'], ['₹50K – ₹1L', '/shop?metal=gold&min=50000&max=100000'], ['Above ₹1L', '/shop?metal=gold&min=100000']]]], pick: (p) => p.metal === 'gold' && p.cat === 'Necklaces' },
  diamond: { cols: [['By type', [['Diamond rings', '/shop?metal=diamond&cat=Rings'], ['Diamond earrings', '/shop?metal=diamond&cat=Earrings'], ['Diamond necklaces', '/shop?metal=diamond&cat=Necklaces'], ['Diamond bracelets', '/shop?metal=diamond&cat=Bracelets']]], ['Collections', [['Solitaire & statement', '/shop?metal=diamond&occ=Party'], ['Everyday diamonds', '/shop?metal=diamond&occ=Daily%20wear'], ['Platinum', '/shop?metal=platinum']]], ['By budget', [['Under ₹50K', '/shop?metal=diamond&max=50000'], ['₹50K – ₹2.5L', '/shop?metal=diamond&min=50000&max=250000'], ['Above ₹2.5L', '/shop?metal=diamond&min=250000']]]], pick: (p) => p.metal === 'diamond' && p.cat === 'Earrings' },
  wedding: { cols: [['Wedding', [['Wedding bands', '/shop?occ=Wedding&cat=Rings'], ['Bridal bracelets', '/shop?occ=Wedding&cat=Bracelets'], ['Pre-book now', '/shop?occ=Wedding']]], ['Plan', [['Gold exchange', '/#exchange'], ['Talk to an expert', '/#enquiry'], ['Visit a showroom', '/stores']]]], pick: (p) => p.occ === 'Wedding' && p.cat === 'Rings' },
};
export default function Header() {
  const { count, wish, rates, setDrawer, bump } = useStore();
  const [mi, setMi] = useState(0), [bar, setBar] = useState(true), [sc, setSc] = useState(false), [menu, setMenu] = useState(false), [mega, setMega] = useState(null);
  useEffect(() => { const t = setInterval(() => setMi((x) => (x + 1) % MSG.length), 4200); return () => clearInterval(t); }, []);
  useEffect(() => { const f = () => setSc(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; }, [menu]);
  const g = MEGA[mega];
  const sample = g && first(g.pick);
  return (
    <header className={'hd' + (sc ? ' sc' : '')} onMouseLeave={() => setMega(null)}>
      {bar && (
        <div className="ann">
          <p key={mi}>{MSG[mi]}</p>
          <span className="rate">22K today {inr(rateOf(rates, 22))}/g</span>
          <button onClick={() => setBar(false)} aria-label="Close announcement"><Icon n="close" size={18} /></button>
        </div>
      )}
      <div className="top wrap">
        <button className="burger" onClick={() => setMenu(true)} aria-label="Open menu"><Icon n="menu" size={26} /></button>
        <Link href="/" className="logo" aria-label="Gamya home"><Logo /></Link>
        <SearchBox />
        <div className="tools">
          <Link href="/stores" className="t-pin" aria-label="Find a showroom"><Icon n="pin" size={24} /></Link>
          <Link href="/wishlist" aria-label="Wishlist" className="tbtn"><Icon n="heart" size={24} />{wish.length > 0 && <em>{wish.length}</em>}</Link>
          <Link href="/track" aria-label="Track order" className="t-user"><Icon n="user" size={24} /></Link>
          <button onClick={() => setDrawer(true)} aria-label="Open bag" className="tbtn"><Icon n="bag" size={24} />{count > 0 && <em key={bump} className="pop">{count}</em>}</button>
        </div>
      </div>
      <nav className="cn wrap" aria-label="Main">
        {NAV.map((n) => (
          <Link key={n.t} href={n.h} onMouseEnter={() => setMega(n.m || null)} onFocus={() => setMega(n.m || null)}><Icon n={n.i} size={22} />{n.t}</Link>
        ))}
      </nav>
      {g && (
        <div className="mega" onMouseEnter={() => setMega(mega)}>
          <div className="wrap mg">
            {g.cols.map(([h, ls]) => <div key={h}><h4>{h}</h4>{ls.map(([t, u]) => <Link key={t} href={u} onClick={() => setMega(null)}>{t}</Link>)}</div>)}
            {sample && <Link href={`/product/${sample.id}`} className="mfeat" onClick={() => setMega(null)}><Pic p={sample} /><span>Featured<b>{sample.n}</b></span></Link>}
          </div>
        </div>
      )}
      <div className={'mm' + (menu ? ' open' : '')} aria-hidden={!menu}>
        <div className="mmbg" onClick={() => setMenu(false)} />
        <div className="mmp">
          <div className="mmh"><Logo small /><button onClick={() => setMenu(false)} aria-label="Close menu"><Icon n="close" size={24} /></button></div>
          <SearchBox onGo={() => setMenu(false)} />
          {[...NAV, { t: 'Showrooms', i: 'pin', h: '/stores' }, { t: 'Wishlist', i: 'heart', h: '/wishlist' }, { t: 'Track order', i: 'truck', h: '/track' }].map((n) => <Link key={n.t} href={n.h} onClick={() => setMenu(false)}><Icon n={n.i} size={22} />{n.t}<Icon n="chev" size={16} className="r" /></Link>)}
        </div>
      </div>
    </header>
  );
}
