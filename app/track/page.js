'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Icon from '../../components/Icon';
import { useStore } from '../../components/Store';
import { STEPS, inr, WA } from '../../lib/data';

const SUB = ['We have your order', 'Quality checked and packed', 'On its way, insured', 'Delivered with OTP'];
function Confetti() { return <div className="conf" aria-hidden="true">{Array.from({ length: 36 }, (_, i) => <i key={i} style={{ '--x': (i * 29) % 100 + '%', '--r': (i * 47) % 360 + 'deg', '--t': (i % 6) * 0.15 + 's', '--c': ['#d9a441', '#8a2332', '#e9c46a', '#f3d9c9'][i % 4] }} />)}</div>; }

function Inner() {
  const sp = useSearchParams(); const { orders, ready } = useStore();
  const [q, setQ] = useState(sp.get('id') || ''), [id, setId] = useState(sp.get('id') || ''), [bad, setBad] = useState(false);
  const isNew = sp.get('new');
  const o = orders.find((x) => x.id.toLowerCase() === id.trim().toLowerCase());
  useEffect(() => { if (id && ready && !o) setBad(true); else setBad(false); }, [id, ready, o]);
  return (
    <div className="wrap sec trk">
      {o && isNew && <Confetti />}
      {o && isNew && <div className="hdone"><svg className="tick" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg><h1>Thank you, {o.name.split(' ')[0]}!</h1><p>Your order <b>{o.id}</b> is confirmed.</p></div>}
      {!isNew && <h1 className="h1s">Track your order</h1>}
      <form className="tq" onSubmit={(e) => { e.preventDefault(); setId(q); }}><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Enter order ID, e.g. GJ1234567" aria-label="Order ID" /><button className="btn gold">Track</button></form>
      {bad && <p className="bad">We could not find that order on this device. Demo orders are stored in this browser only.</p>}
      {o && (
        <div className="otl">
          <div className="tlh"><div><small>Order</small><b>{o.id}</b></div><div><small>Total</small><b>{inr(o.total)}</b></div><div><small>{o.ship === 'store' ? 'Pickup' : 'Delivery'}</small><b>{o.ship === 'store' ? 'Showroom, Sonipat' : o.addr}</b></div></div>
          <ol className="tl">{STEPS.map((s, i) => <li key={s} className={i <= o.status ? 'on' : ''} style={{ '--d': i * 200 + 'ms' }}><i>{i <= o.status ? <Icon n="check" size={16} /> : i + 1}</i><b>{s}</b><small>{SUB[i]}</small></li>)}</ol>
          <ul className="oitems">{o.items.map((i, k) => <li key={k}><Link href={`/product/${i.id}`}>{i.n}</Link>{i.size && <small> · Size {i.size}</small>}<span>× {i.qty}</span><em>{inr(i.amt)}</em></li>)}</ul>
          <p className="mut">Demo order. Open <Link href="/admin"><u>/admin</u></Link> and change this order’s status to watch the timeline move.</p>
          <a className="btn alt" href={`https://wa.me/${WA}?text=${encodeURIComponent('Order ' + o.id)}`} target="_blank" rel="noreferrer">Message us about this order</a>
        </div>
      )}
      {!o && ready && orders.length > 0 && <div className="past"><h3>Your recent orders</h3>{orders.slice(0, 5).map((x) => <button key={x.id} onClick={() => { setQ(x.id); setId(x.id); }}><b>{x.id}</b><span>{STEPS[x.status]}</span><em>{inr(x.total)}</em></button>)}</div>}
      {isNew && <p className="ctr"><Link className="btn gold" href="/shop">Keep shopping</Link></p>}
    </div>
  );
}
export default function Track() { return <Suspense fallback={<div className="wrap sec" />}><Inner /></Suspense>; }
