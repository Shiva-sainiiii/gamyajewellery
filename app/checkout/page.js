'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pic from '../../components/Pic';
import Icon from '../../components/Icon';
import { useStore } from '../../components/Store';
import { price, inr, purity, COUPONS } from '../../lib/data';

const PAY = { upi: ['UPI', 'Google Pay, PhonePe, Paytm'], card: ['Debit or credit card', 'Visa, Mastercard, RuPay'], nb: ['Netbanking', 'All major banks'], emi: ['No-cost EMI', '3, 6 and 9 months'], store: ['Reserve, pay at showroom', 'Held for 48 hours'] };

export default function Checkout() {
  const { items, rates, subtotal, qty, remove, upd, coupon, ready, toast } = useStore();
  const r = useRouter();
  const [f, setF] = useState({ name: '', phone: '', addr: '', pin: '', ship: 'home', pay: 'upi', gift: false });
  const [cp, setCp] = useState(''), [step, setStep] = useState('form'), [t, setT] = useState(false);
  const pct = COUPONS[coupon] || 0, off = Math.round((subtotal * pct) / 100), gift = f.gift ? 199 : 0, total = subtotal - off + gift;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ok = f.name.trim().length > 1 && /^\d{10}$/.test(f.phone) && (f.ship === 'store' || (f.addr.trim().length > 5 && /^\d{6}$/.test(f.pin)));
  const apply = () => { const c = cp.trim().toUpperCase(); if (COUPONS[c]) { upd((s) => ({ ...s, coupon: c })); toast(`${c} applied: ${COUPONS[c]}% off`); } else toast('That code is not valid. Try WELCOME5', 'err'); };
  const pay = () => {
    setStep('wait');
    setTimeout(() => {
      const id = 'GJ' + String(Date.now()).slice(-7);
      const order = { id, name: f.name, phone: f.phone, total, ship: f.ship, pay: f.pay, status: 0, at: Date.now(), addr: f.ship === 'home' ? `${f.addr}, ${f.pin}` : 'Showroom pickup', items: items.map((i) => ({ id: i.id, n: i.p.n, size: i.size, qty: i.qty, amt: price(i.p, rates).total * i.qty })) };
      upd((s) => ({ ...s, cart: [], coupon: '', orders: [order, ...s.orders] }));
      r.push('/track?id=' + id + '&new=1');
    }, 1800);
  };
  if (!ready) return <div className="wrap sec" />;
  if (!items.length && step === 'form') return <div className="wrap sec none"><Icon n="bag" size={48} sw={1} /><h1 className="h1s">Your bag is empty</h1><Link className="btn gold" href="/shop">Browse jewellery</Link></div>;
  return (
    <div className="wrap sec">
      <ol className="stepper"><li className="done"><i><Icon n="check" size={16} /></i>Bag</li><li className="on"><i>2</i>Details and payment</li><li><i>3</i>Confirmation</li></ol>
      <div className="cko">
        <div>
          <section className="cbox"><h2>1. Contact and delivery</h2>
            <div className="fgrid">
              <label>Full name<input value={f.name} onChange={set('name')} autoComplete="name" /></label>
              <label>Mobile number<input inputMode="numeric" maxLength={10} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} autoComplete="tel" /></label>
            </div>
            <div className="radios">
              {[['home', 'Insured home delivery', 'Free · 3 to 6 days'], ['store', 'Pick up from showroom', 'Free · Ready tomorrow']].map(([k, a, b]) => <button type="button" key={k} className={f.ship === k ? 'on' : ''} onClick={() => setF({ ...f, ship: k })}><b>{a}</b><small>{b}</small></button>)}
            </div>
            {f.ship === 'home' && <div className="fgrid"><label className="w2">Address<input value={f.addr} onChange={set('addr')} autoComplete="street-address" /></label><label>Pincode<input inputMode="numeric" maxLength={6} value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, '') })} autoComplete="postal-code" /></label></div>}
            <label className="chk"><input type="checkbox" checked={f.gift} onChange={(e) => setF({ ...f, gift: e.target.checked })} /><span><Icon n="gift" size={20} /> Make it a gift: premium box and card (+₹199)</span></label>
          </section>
          <section className="cbox"><h2>2. Payment</h2>
            <div className="radios col">{Object.entries(PAY).map(([k, [a, b]]) => <button type="button" key={k} className={f.pay === k ? 'on' : ''} onClick={() => setF({ ...f, pay: k })}><b>{a}</b><small>{b}</small></button>)}</div>
          </section>
        </div>
        <aside className="sumb">
          <h2>Order summary</h2>
          <ul>{items.map((i) => (
            <li key={i.k}><Pic p={i.p} /><div><b>{i.p.n}</b><small>{purity(i.p)}{i.size && ` · Size ${i.size}`}</small>
              <span className="qty"><button onClick={() => qty(i.k, -1)} aria-label="Less"><Icon n="minus" size={14} /></button>{i.qty}<button onClick={() => qty(i.k, 1)} aria-label="More"><Icon n="plus" size={14} /></button></span></div>
              <em>{inr(price(i.p, rates).total * i.qty)}</em></li>))}</ul>
          <div className="cpn"><input placeholder="Coupon code" value={cp} onChange={(e) => setCp(e.target.value)} aria-label="Coupon code" /><button className="btn alt" onClick={apply}>Apply</button></div>
          {coupon && <p className="good small"><Icon n="check" size={16} /> {coupon} applied. <button className="lnk" onClick={() => upd((s) => ({ ...s, coupon: '' }))}>Remove</button></p>}
          <table className="dt"><tbody>
            <tr><td>Subtotal</td><td>{inr(subtotal)}</td></tr>
            {off > 0 && <tr className="good"><td>Coupon ({pct}%)</td><td>− {inr(off)}</td></tr>}
            {gift > 0 && <tr><td>Gift wrap</td><td>{inr(gift)}</td></tr>}
            <tr><td>Insured delivery</td><td>Free</td></tr>
            <tr className="tt"><td>Total (GST incl.)</td><td>{inr(total)}</td></tr>
          </tbody></table>
          <button className="btn gold full lg" disabled={!ok} onClick={() => setStep('pay')}>{f.pay === 'store' ? 'Reserve order' : 'Pay ' + inr(total)}</button>
          {!ok && <p className="mut small">Add your name, a 10 digit mobile number{f.ship === 'home' && ', address and pincode'} to continue.</p>}
          <p className="mut small"><Icon n="shield" size={16} /> Demo checkout. No money is charged.</p>
        </aside>
      </div>
      {step !== 'form' && (
        <div className="ov"><div className="mod pm">
          {step === 'wait' ? <div className="pw"><span className="spin big" /><h2>Processing payment</h2><p className="mut">Please do not close this window.</p></div> : (
            <>
              <h2>Test payment</h2>
              <p className="mut">Demo gateway for Gamya Jewellery. Paying with {PAY[f.pay][0]}. No money will be charged.</p>
              <p className="pr">{inr(total)}</p>
              <button className="btn gold full" onClick={pay}>Complete test payment</button>
              <button className="btn alt full" onClick={() => setStep('form')}>Cancel</button>
            </>
          )}
        </div></div>
      )}
    </div>
  );
}
