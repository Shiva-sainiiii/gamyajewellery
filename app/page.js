import Link from 'next/link';
import Art from '../components/Art';
import Card from '../components/Card';
import RateBoard from '../components/RateBoard';
import { PRODUCTS, WA } from '../lib/data';
const CATS = ['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Chains', 'Pendants'];
const PROMISES = [
  ['Hallmarked', 'Gold carries a BIS hallmark and silver is tested at 925.'],
  ['Priced openly', 'Each product page shows metal value, making charges and GST separately.'],
  ['Insured delivery', 'Free, tracked and signed for. Or collect from the showroom.'],
  ['Exchange and buyback', 'Bring old jewellery back and get the day’s rate.'],
];
export default function Home() {
  return (
    <>
      <section className="wrap hero">
        <div>
          <h1>Gold, silver and diamond jewellery, priced openly by the gram.</h1>
          <p>Every piece is hallmarked and shown with its full price breakup: metal, making charges and GST. Delivered insured, or collect it from our Sonipat showroom.</p>
          <Link href="/shop" className="btn">Shop jewellery</Link>
          <a href={`https://wa.me/${WA}`} className="btn alt">Ask on WhatsApp</a>
        </div>
        <RateBoard />
      </section>
      <section className="wrap sec">
        <h2>Shop by type</h2>
        <div className="grid cats">
          {CATS.map((c) => <Link key={c} href={`/shop?cat=${c}`}><Art p={PRODUCTS.find((p) => p.cat === c)} />{c}</Link>)}
        </div>
      </section>
      <section className="wrap sec">
        <h2>Popular right now</h2>
        <div className="grid">{['g1', 'd1', 's2', 'd2'].map((id) => <Card key={id} p={PRODUCTS.find((p) => p.id === id)} />)}</div>
      </section>
      <section className="wrap sec">
        <div className="grid prom">{PROMISES.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>
      <section className="wrap sec">
        <h2>Visit the showroom</h2>
        <p>Sonipat, Haryana. Come in to see the jewellery, get it weighed and fitted.</p>
        <p><a className="btn alt" href="https://www.google.com/maps/search/?api=1&query=Gamya+Jewellery+Sonipat">Get directions</a></p>
      </section>
    </>
  );
}
