'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RATES0, byId, price } from '../lib/data';
import Icon from './Icon';

const C = createContext(null);
export const useStore = () => useContext(C);
const KEY = 'gamya-v2';

export default function Store({ children }) {
  const [s, setS] = useState({ cart: [], wish: [], recent: [], rates: RATES0, orders: [], coupon: '' });
  const [ready, setReady] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [bump, setBump] = useState(0);
  const id = useRef(0);

  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem(KEY)); if (v) setS((x) => ({ ...x, ...v, rates: { ...RATES0, ...(v.rates || {}) } })); } catch {}
    setReady(true);
  }, []);

  const upd = useCallback((f) => setS((x) => {
    const n = f(x);
    try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {}
    return n;
  }), []);

  const toast = useCallback((msg, kind = 'ok') => {
    const t = ++id.current;
    setToasts((a) => [...a.slice(-2), { t, msg, kind }]);
    setTimeout(() => setToasts((a) => a.filter((x) => x.t !== t)), 3200);
  }, []);

  const add = (pid, size = '', qty = 1, open = true) => {
    upd((x) => {
      const k = pid + '|' + size, i = x.cart.find((c) => c.k === k);
      return { ...x, cart: i ? x.cart.map((c) => (c.k === k ? { ...c, qty: Math.min(9, c.qty + qty) } : c)) : [...x.cart, { k, id: pid, size, qty }] };
    });
    setBump((b) => b + 1);
    if (open) setDrawer(true); else toast('Added to your bag');
  };
  const qty = (k, d) => upd((x) => ({ ...x, cart: x.cart.map((c) => (c.k === k ? { ...c, qty: c.qty + d } : c)).filter((c) => c.qty > 0 && c.qty < 10) }));
  const remove = (k) => upd((x) => ({ ...x, cart: x.cart.filter((c) => c.k !== k) }));
  const wished = (pid) => s.wish.includes(pid);
  const wishToggle = (pid) => {
    const on = !s.wish.includes(pid);
    upd((x) => ({ ...x, wish: on ? [pid, ...x.wish] : x.wish.filter((w) => w !== pid) }));
    toast(on ? 'Saved to your wishlist' : 'Removed from wishlist');
  };
  const seen = (pid) => upd((x) => (x.recent[0] === pid ? x : { ...x, recent: [pid, ...x.recent.filter((r) => r !== pid)].slice(0, 12) }));

  const items = s.cart.map((c) => ({ ...c, p: byId[c.id] })).filter((i) => i.p);
  const count = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = items.reduce((a, i) => a + price(i.p, s.rates).total * i.qty, 0);

  return (
    <C.Provider value={{ ...s, ready, upd, items, count, subtotal, add, qty, remove, wished, wishToggle, seen, toast, drawer, setDrawer, bump }}>
      {children}
      <div className="toasts" aria-live="polite">
        {toasts.map((t) => <div key={t.t} className={'toast ' + t.kind}><Icon n={t.kind === 'ok' ? 'check' : 'info'} size={18} />{t.msg}</div>)}
      </div>
    </C.Provider>
  );
}
