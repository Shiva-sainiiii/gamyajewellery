import Link from 'next/link';
import Hero from '../components/Hero';
import Pic from '../components/Pic';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import { Trending, ExchangeCalc, Enquiry } from '../components/HomeBits';
import { PRODUCTS, CATS, OCCS, BUDGETS, first } from '../lib/data';

const CIRCLES = [
  ['Rings', '/shop?cat=Rings', (p) => p.cat === 'Rings' && p.dia], ['Earrings', '/shop?cat=Earrings', (p) => p.cat === 'Earrings' && p.dia],
  ['Necklaces', '/shop?cat=Necklaces', (p) => p.cat === 'Necklaces'], ['Bracelets', '/shop?cat=Bracelets', (p) => p.cat === 'Bracelets' && !p.dia],
  ['Gold', '/shop?metal=gold', (p) => p.metal === 'gold' && p.col === 'yellow'], ['Diamond', '/shop?metal=diamond', (p) => p.metal === 'diamond' && p.ct > 1],
  ['Platinum', '/shop?metal=platinum', (p) => p.k === 950], ['Gemstone', '/shop?gem=1', (p) => p.gem],
];
const OCC_TONE = { Wedding: '#7a1220', 'Daily wear': '#c98f6b', Festive: '#2f5d50', Party: '#4b3a6b', Gifting: '#b5472f' };
const PROM = [['shield', 'BIS hallmarked', 'Every piece of gold carries the hallmark. Diamonds come certified.'], ['tag', 'Priced openly', 'Metal, making charges, stones and GST shown separately.'], ['truck', 'Insured delivery', 'Free, tracked and signed for. Or collect from a showroom.'], ['refresh', 'Exchange and buyback', 'Bring old jewellery back and get the day’s rate.']];

const COLLS = (() => {
  const m = {};
  PRODUCTS.forEach((p) => { (m[p.coll] ||= []).push(p); });
  return Object.entries(m).sort((a, b) => b[1].length - a[1].length).slice(0, 6);
})();

export default function Home() {
  return (
    <>
      <Hero />

      <section className="wrap sec circ">
        <Reveal as="h2" className="ctr">Shop by category</Reveal>
        <div className="circles">
          {CIRCLES.map(([t, h, f], i) => (
            <Reveal key={t} delay={i * 60}><Link href={h} className="circ-i"><span className="cc"><Pic p={first(f) || PRODUCTS[i]} /></span>{t}</Link></Reveal>
          ))}
        </div>
      </section>

      <div className="mq" aria-hidden="true"><div className="mqt">
        {[0, 1].map((k) => <div key={k}>{['BIS Hallmarked gold', 'Certified diamonds', 'Free insured delivery', '7 day returns', '0% deduction gold exchange', 'Lifetime maintenance', 'Gold rate protection'].map((t) => <span key={t + k}><Icon n="gem" size={16} />{t}</span>)}</div>)}
      </div></div>

      <section className="wrap sec">
        <Reveal as="h2" className="ctr">Trending now</Reveal>
        <Reveal as="p" className="sub ctr">The pieces everyone is wishlisting this week.</Reveal>
        <Reveal><Trending /></Reveal>
        <p className="ctr" style={{ marginTop: 32 }}><Link className="btn alt" href="/shop">View all jewellery</Link></p>
      </section>

      <section className="exch" id="exchange">
        <div className="wrap exg">
          <Reveal from="left" className="exc">
            <span className="eyebrow">Gold exchange</span>
            <h2>Old gold. New sparkle.</h2>
            <p>Flat 0% deduction on exchange of old gold (18K and above) from any jeweller. Transparent weighing, instant value, and the day’s rate protected for your next piece.</p>
            <ul><li><Icon n="check" size={18} /> Exchange all year round</li><li><Icon n="check" size={18} /> Pay with old gold for new jewellery</li><li><Icon n="check" size={18} /> Or take it as cash</li></ul>
          </Reveal>
          <Reveal from="right"><ExchangeCalc /></Reveal>
        </div>
      </section>

      <section className="wrap sec">
        <Reveal as="h2" className="ctr">Shop by occasion</Reveal>
        <div className="occ">
          {OCCS.map(([o, d], i) => (
            <Reveal key={o} delay={i * 80}>
              <Link href={`/shop?occ=${encodeURIComponent(o)}`} className="otile" style={{ '--c': OCC_TONE[o] }}>
                <span className="oimg"><Pic p={first((p) => p.occ === o && p.dia) || first((p) => p.occ === o)} /></span>
                <span className="otx"><b>{o}</b><small>{d}</small><em>Explore <Icon n="chev" size={14} /></em></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <Reveal as="h2" className="ctr">Shop by budget</Reveal>
        <div className="budg">
          {BUDGETS.map(([t, lo, hi], i) => {
            return <Reveal key={t} delay={i * 70}><Link href={`/shop?min=${lo}${hi < 1e9 ? `&max=${hi}` : ''}`} className="bd"><Icon n="tag" size={22} /><b>{t}</b><small>Browse designs</small></Link></Reveal>;
          })}
        </div>
      </section>

      <section className="wrap sec">
        <Reveal as="h2" className="ctr">Our collections</Reveal>
        <Reveal as="p" className="sub ctr">Each collection comes in yellow, rose and white gold, and platinum.</Reveal>
        <div className="colls">
          {COLLS.map(([name, ps], i) => (
            <Reveal key={name} delay={i * 70}>
              <Link href={`/shop?q=${encodeURIComponent(name.replace(' collection', ''))}`} className="coll">
                <span className="cstack">{ps.slice(0, 3).map((p, q) => <span key={p.id} style={{ '--q': q }}><Pic p={p} /></span>)}</span>
                <b>{name}</b><small>{ps.length} designs</small>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="wrap sg">
          {[[PRODUCTS.length, '+', 'Designs'], [100, '%', 'BIS hallmarked'], [25, '+', 'Years of trust'], [50000, '+', 'Happy families']].map(([n, s, l]) => <Reveal key={l}><b><CountUp to={n} suffix={s} /></b><span>{l}</span></Reveal>)}
        </div>
      </section>

      <section className="wrap sec split" id="enquiry">
        <Reveal from="left" className="wedimg">
          <div className="wedart"><Pic p={first((p) => p.cat === 'Necklaces' && p.dia && p.ct > 2) || PRODUCTS[0]} /></div>
        </Reveal>
        <Reveal from="right">
          <span className="eyebrow dark">Wedding</span>
          <h2>Planning a wedding?</h2>
          <p className="sub">Share your number and a Gamya jewellery expert will call to plan the set, the budget and a showroom visit.</p>
          <Enquiry />
        </Reveal>
      </section>

      <section className="prombar"><div className="wrap prom">
        {PROM.map(([i, t, d], k) => <Reveal key={t} delay={k * 80}><Icon n={i} size={34} sw={1.2} /><h3>{t}</h3><p>{d}</p></Reveal>)}
      </div></section>

      <section className="wrap sec">
        <Reveal className="visit">
          <div><span className="eyebrow dark">Showrooms</span><h2>Come, try it on.</h2><p>Visit us in Sonipat to see the jewellery, get it weighed and fitted. Book a slot and we will keep your shortlist ready.</p>
            <Link className="btn gold" href="/stores">Find a showroom</Link></div>
          <div className="vgrid">{[['video', 'Video call', 'See pieces live with an expert'], ['pin', 'Store pickup', 'Order online, collect in 24h'], ['gift', 'Gift wrap', 'Free on every order']].map(([i, t, d]) => <div key={t}><Icon n={i} size={26} sw={1.3} /><b>{t}</b><small>{d}</small></div>)}</div>
        </Reveal>
      </section>
    </>
  );
}
