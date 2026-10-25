'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { RATES0 } from '../lib/data';
const C = createContext(null);
export const useStore = () => useContext(C);
export default function Store({ children }) {
  const [s, setS] = useState({ cart: [], rates: RATES0, orders: [] });
  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem('gamya')); if (v) setS((x) => ({ ...x, ...v })); } catch {}
  }, []);
  const upd = (f) => setS((x) => {
    const n = f(x);
    try { localStorage.setItem('gamya', JSON.stringify(n)); } catch {}
    return n;
  });
  return <C.Provider value={{ ...s, upd }}>{children}</C.Provider>;
}
