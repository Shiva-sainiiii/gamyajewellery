'use client';
import Icon from '../../components/Icon';
import { useStore } from '../../components/Store';
import { STEPS, RATES0, PRODUCTS, inr, rateOf } from '../../lib/data';

export default function Admin() {
  const { rates, orders, wish, upd, toast } = useStore();
  const setR = (k) => (e) => upd((s) => ({ ...s, rates: { ...s.rates, [k]: Number(e.target.value) || 0 } }));
  const setSt = (id) => (e) => upd((s) => ({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, status: +e.target.value } : o)) }));
  const rev = orders.reduce((a, o) => a + o.total, 0);
  return (
    <div className="wrap sec adm">
      <h1 className="h1s">Shop admin <small>(demo)</small></h1>
      <p className="mut">Open this on the same browser as the shop. Changes show up on the shop immediately.</p>
      <div className="kpis">
        {[['Orders', orders.length], ['Revenue', inr(rev)], ['Wishlisted', wish.length], ['Designs live', PRODUCTS.length]].map(([l, v]) => <div key={l}><small>{l}</small><b>{v}</b></div>)}
      </div>
      <h2>Gold, silver and platinum rate</h2>
      <p className="mut">Every price on the website is calculated from these. Try changing 24K gold and open any product.</p>
      <div className="rategrid">
        <label>24K gold, ₹ per gram<input type="number" value={rates.g24} onChange={setR('g24')} /><small>22K: {inr(rateOf(rates, 22))} · 18K: {inr(rateOf(rates, 18))}</small></label>
        <label>Silver, ₹ per gram<input type="number" value={rates.silver} onChange={setR('silver')} /></label>
        <label>Platinum, ₹ per gram<input type="number" value={rates.pt} onChange={setR('pt')} /></label>
        <button className="btn alt" onClick={() => { upd((s) => ({ ...s, rates: RATES0 })); toast('Rates reset'); }}>Reset rates</button>
      </div>
      <h2>Orders</h2>
      {orders.length ? <div className="tw"><table className="ot"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>
        {orders.map((o) => <tr key={o.id}><td><b>{o.id}</b><br /><small className="mut">{new Date(o.at).toLocaleString('en-IN')}</small></td><td>{o.name}<br /><small className="mut">{o.phone} · {o.ship === 'store' ? 'Pickup' : 'Delivery'}</small></td><td>{o.items.map((i) => i.n + ' ×' + i.qty).join(', ')}</td><td>{inr(o.total)}</td>
          <td><select className={'st s' + o.status} value={o.status} onChange={setSt(o.id)}>{STEPS.map((s, i) => <option key={s} value={i}>{s}</option>)}</select></td></tr>)}
      </tbody></table></div> : <p>No orders yet. Place a demo order from the shop and it will appear here.</p>}
      <p style={{ marginTop: 30 }}><button className="btn alt" onClick={() => { if (confirm('Clear all demo orders, wishlist and bag on this browser?')) { upd((s) => ({ ...s, orders: [], cart: [], wish: [], recent: [] })); toast('Demo data cleared'); } }}><Icon n="trash" size={16} /> Reset demo data</button></p>
    </div>
  );
}
