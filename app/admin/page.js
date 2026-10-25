'use client';
import { useStore } from '../../components/Store';
import { STEPS, inr } from '../../lib/data';
export default function Admin() {
  const { rates, orders, upd } = useStore();
  const setR = (k) => (e) => upd((s) => ({ ...s, rates: { ...s.rates, [k]: Number(e.target.value) || 0 } }));
  const setSt = (id) => (e) => upd((s) => ({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, status: +e.target.value } : o)) }));
  return (
    <div className="wrap sec">
      <h1 className="h1s">Shop admin (demo)</h1>
      <p className="mut">Open this on the same phone or browser as the shop. Changes show up on the shop immediately.</p>
      <h2>Gold and silver rate</h2>
      <div className="filters">
        <label>24K gold, ₹ per gram<input type="number" value={rates.g24} onChange={setR('g24')} /></label>
        <label>Silver, ₹ per gram<input type="number" value={rates.silver} onChange={setR('silver')} /></label>
      </div>
      <h2>Orders</h2>
      {orders.length ? <table className="tb"><tbody>
        {orders.map((o) => <tr key={o.id}><td>{o.id}, {o.name}<br /><span className="mut">{o.ship === 'store' ? 'Store pickup' : 'Home delivery'}</span></td><td>{inr(o.total)}</td><td><select value={o.status} onChange={setSt(o.id)}>{STEPS.map((s, i) => <option key={s} value={i}>{s}</option>)}</select></td></tr>)}
      </tbody></table> : <p>No orders yet. Place a demo order from the shop and it will appear here.</p>}
    </div>
  );
}
