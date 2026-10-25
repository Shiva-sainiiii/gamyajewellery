'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Art from '../../../components/Art';
import Card from '../../../components/Card';
import { useStore } from '../../../components/Store';
import { PRODUCTS, price, inr, lab, rateOf, WA } from '../../../lib/data';
export default function Product() {
  const { id } = useParams();
  const { rates, upd } = useStore();
  const [size, setSize] = useState(''), [pin, setPin] = useState(''), [eta, setEta] = useState(''), [note, setNote] = useState('');
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return <div className="wrap sec"><p>We could not find this piece.</p><Link className="btn" href="/shop">Back to jewellery</Link></div>;
  const b = price(p, rates);
  const sizes = p.cat === 'Rings' ? ['10', '12', '14', '16', '18', '20'] : p.cat === 'Bangles' ? ['2.4', '2.6', '2.8'] : null;
  const unit = p.metal === 'silver' ? rates.silver : rateOf(rates, p.k);
  const check = () => {
    if (!/^\d{6}$/.test(pin)) return setEta('Enter a 6 digit pincode.');
    const d = new Date(Date.now() + (pin[0] === '1' ? 2 : 5) * 864e5);
    setEta('Free insured delivery by ' + d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + '. Store pickup is also available.');
  };
  const add = () => {
    if (sizes && !size) return setNote('Choose a size first.');
    upd((s) => {
      const k = p.id + size, i = s.cart.find((x) => x.k === k);
      return { ...s, cart: i ? s.cart.map((x) => (x.k === k ? { ...x, qty: x.qty + 1 } : x)) : [...s.cart, { k, id: p.id, size, qty: 1 }] };
    });
    setNote('Added to your cart.');
  };
  return (
    <div className="wrap sec">
      <div className="pd">
        <div className="art"><Art p={p} /></div>
        <div>
          <h1 className="h1s">{p.name}</h1>
          <p className="mut">{lab(p)}, {p.w} g, {p.occ.toLowerCase()}</p>
          <p className="pr">{inr(b.total)}</p>
          <p className="mut">Includes GST. Free insured delivery.</p>
          {sizes && <label>{p.cat === 'Rings' ? 'Ring size' : 'Bangle size (inches)'}<select value={size} onChange={(e) => setSize(e.target.value)}><option value="">Choose</option>{sizes.map((x) => <option key={x}>{x}</option>)}</select></label>}
          <table className="tb"><tbody>
            <tr><td>{p.w} g at {inr(unit)} per gram</td><td>{inr(b.metal)}</td></tr>
            <tr><td>Making charges ({p.mk}%)</td><td>{inr(b.making)}</td></tr>
            {p.st > 0 && <tr><td>Diamonds, certified</td><td>{inr(b.stone)}</td></tr>}
            <tr><td>GST (3%)</td><td>{inr(b.gst)}</td></tr>
            <tr><td><b>Total</b></td><td><b>{inr(b.total)}</b></td></tr>
          </tbody></table>
          <label>Delivery pincode
            <span className="row"><input inputMode="numeric" maxLength="6" value={pin} onChange={(e) => setPin(e.target.value)} /><button className="btn alt" onClick={check}>Check</button></span>
          </label>
          {eta && <p>{eta}</p>}
          <div className="buy">
            <button className="btn gold" onClick={add}>Add to cart</button>
            <a className="btn alt" href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi, I am interested in ' + p.name)}`}>Ask on WhatsApp</a>
          </div>
          {note && <p>{note} {note.startsWith('Added') && <Link href="/checkout"><u>Go to checkout</u></Link>}</p>}
        </div>
      </div>
      <h2 style={{ marginTop: 48 }}>Similar pieces</h2>
      <div className="grid">{PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4).map((x) => <Card key={x.id} p={x} />)}</div>
    </div>
  );
}
