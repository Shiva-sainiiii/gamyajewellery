import Link from 'next/link';
import Card from '../components/Card';
import Pic from '../components/Pic';
import RateBoard from '../components/RateBoard';
import Enquiry from '../components/Enquiry';
import { PRODUCTS, WA } from '../lib/data';
const CATS = ['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Chains', 'Pendants'];
const OCC = [['Bridal', 'Wedding sets'], ['Daily wear', 'Light and easy'], ['Gifting', 'For someone special'], ['Festive', 'Diwali and Karwa Chauth']];
const PROMISES = [
  ['Hallmarked', 'Gold carries a BIS hallmark and silver is tested at 925.'],
  ['Priced openly', 'Metal value, making charges and GST are shown separately on every piece.'],
  ['Insured delivery', 'Free, tracked and signed for. Or collect from the showroom.'],
  ['Exchange and buyback', 'Bring old jewellery back and get the day’s rate.'],
];
export default function Home() {
  return (
    <>
      <section className="banner">
        <Pic k="hero" className="bg" />
        <div className="wrap"><div className="bt">
          <h1>The wedding collection is here.</h1>
          <p>Temple gold, diamond sets and silver gifting, all hallmarked and priced openly by the gram.</p>
          <Link className="btn gold" href="/shop?occ=Bridal">Shop wedding jewellery</Link>
        </div></div>
      </section>
      <section className="wrap sec">
        <h2 className="ctr">Shop by category</h2>
        <div className="grid cats">
          {CATS.map((c) => <Link key={c} href={`/shop?cat=${c}`}><Pic k={`cat-${c}`} p={PRODUCTS.find((p) => p.cat === c)} />{c}</Link>)}
        </div>
      </section>
      <section className="wrap sec">
        <h2 className="ctr">Shop by occasion</h2>
        <div className="occ">
          {OCC.map(([o, d]) => <Link key={o} href={`/shop?occ=${encodeURIComponent(o)}`}><Pic k={`occ-${o}`} /><span><b>{o}</b>{d}</span></Link>)}
        </div>
      </section>
      <section className="wrap sec">
        <h2 className="ctr">New for you</h2>
        <div className="grid">{['g1', 'd1', 's2', 'd2'].map((id) => <Card key={id} p={PRODUCTS.find((p) => p.id === id)} />)}</div>
        <p className="ctr" style={{ marginTop: 28 }}><Link className="btn alt" href="/shop">View all jewellery</Link></p>
      </section>
      <section className="wrap sec split">
        <div className="art2"><Pic k="bridal" /></div>
        <div>
          <h2>Planning a wedding?</h2>
          <p>Share your number and a Gamya jewellery expert will call to plan the set, the budget and a showroom visit.</p>
          <Enquiry />
        </div>
      </section>
      <section className="prombar"><div className="wrap grid prom">
        {PROMISES.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
      </div></section>
      <section className="wrap sec split">
        <RateBoard />
        <div>
          <h2>Visit the showroom</h2>
          <p>Sonipat, Haryana. Come in to see the jewellery, get it weighed and fitted.</p>
          <a className="btn" href="https://www.google.com/maps/search/?api=1&query=Gamya+Jewellery+Sonipat">Get directions</a>
          <a className="btn alt" href={`https://wa.me/${WA}`}>Chat on WhatsApp</a>
        </div>
      </section>
    </>
  );
}
