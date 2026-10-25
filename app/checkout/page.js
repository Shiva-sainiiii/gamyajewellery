'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../components/Store';
import { PRODUCTS, STEPS, price, inr, WA } from '../../lib/data';
const PAY = { upi: 'UPI', card: 'Debit or credit card', nb: 'Netbanking', emi: 'No-cost EMI', store: 'Reserve now, pay at the store' };
export default function Checkout() {
  const { cart, rates, orders, upd } = useStore();
  const [f, setF] = useState({ name: '', phone: '', addr: '', pin: '', ship: 'home', pay: 'upi' });
  const [step, setStep] = useState('form'), [oid, setOid] = useState('');
  const items = cart.map((c) => ({ ...c, p: PRODUCTS.find((x) => x.id === c.id) })).filter((i) => i.p);
  const total = items.reduce((a, i) => a + price(i.p, rates).total * i.qty, 0);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ok = f.name.trim() && /^\d{10}$/.test(f.phone) && (f.ship === 'store' || (f.addr.trim() && /^\d{6}$/.test(f.pin)));
  const qty = (k, d) => upd((s) => ({ ...s, cart: s.cart.map((x) => (x.k === k ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0) }));
  const pay = () => {
    setStep('wait');
    setTimeout(() => {
      const id = 'GJ' + String(Date.now()).slice(-6);
      upd((s) => ({ ...s, cart: [], orders: [{ id, name: f.name, total, ship: f.ship, pay: f.pay, status: 0 }, ...s.orders] }));
      setOid(id); setStep('done');
    }, 1600);
  };
  if (step === 'done') {
    const o = orders.find((x) => x.id === oid) || { status: 0, ship: f.ship };
    return (
      <div className="wrap sec">
        <h1 className="h1s">Order placed</h1>
        <p>Order <b>{oid}</b> is confirmed. {o.ship === 'store' ? 'It will be ready for pickup at the showroom tomorrow.' : 'Free insured delivery in 3 to 5 days, with an OTP at the door.'}</p>
        <div className="tl">{STEPS.map((s, i) => <div key={s} className={i <= o.status ? 'on' : ''}>{s}</div>)}</div>
        <p className="mut">Demo order. No payment was taken. Change the status from the admin page to see this timeline move.</p>
        <Link className="btn" href="/shop">Keep shopping</Link> <a className="btn alt" href={`https://wa.me/${WA}?text=${encodeURIComponent('Order ' + oid)}`}>Message us about this order</a>
      </div>
    );
  }
  if (!items.length) return <div className="wrap sec"><h1 className="h1s">Your cart is empty</h1><Link className="btn" href="/shop">Browse jewellery</Link></div>;
  return (
    <div className="wrap sec">
      <h1 className="h1s">Checkout</h1>
      <div className="pd">
        <div>
          <label>Full name<input value={f.name} onChange={set('name')} /></label>
          <label>Mobile number<input inputMode="numeric" maxLength="10" value={f.phone} onChange={set('phone')} /></label>
          <label>Delivery<select value={f.ship} onChange={set('ship')}><option value="home">Insured home delivery, free</option><option value="store">Pick up from the showroom</option></select></label>
          {f.ship === 'home' && <><label>Address<input value={f.addr} onChange={set('addr')} /></label><label>Pincode<input inputMode="numeric" maxLength="6" value={f.pin} onChange={set('pin')} /></label></>}
          <label>Payment<select value={f.pay} onChange={set('pay')}>{Object.entries(PAY).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        </div>
        <div>
          <table className="tb"><tbody>
            {items.map((i) => <tr key={i.k}><td>{i.p.name}{i.size && `, size ${i.size}`}<br /><span className="qty"><button onClick={() => qty(i.k, -1)} aria-label="Less">−</button> {i.qty} <button onClick={() => qty(i.k, 1)} aria-label="More">+</button></span></td><td>{inr(price(i.p, rates).total * i.qty)}</td></tr>)}
            <tr><td>Delivery</td><td>Free</td></tr>
            <tr><td><b>Total, GST included</b></td><td><b>{inr(total)}</b></td></tr>
          </tbody></table>
          <p className="mut">Prices are locked for 15 minutes once you start payment (demo).</p>
          <button className="btn gold" disabled={!ok} onClick={() => setStep('pay')}>{f.pay === 'store' ? 'Reserve order' : 'Pay ' + inr(total)}</button>
          {!ok && <p className="mut">Fill your name, a 10 digit mobile number{f.ship === 'home' && ', address and pincode'} to continue.</p>}
        </div>
      </div>
      {step !== 'form' && (
        <div className="ov"><div className="mod">
          <h2>Test payment</h2>
          <p>Demo gateway for Gamya Jewellery. Paying with {PAY[f.pay]}. No money will be charged.</p>
          <p className="pr">{inr(total)}</p>
          <button className="btn gold" disabled={step === 'wait'} onClick={pay}>{step === 'wait' ? 'Processing' : 'Complete test payment'}</button>{' '}
          {step === 'pay' && <button className="btn alt" onClick={() => setStep('form')}>Cancel</button>}
        </div></div>
      )}
    </div>
  );
}
