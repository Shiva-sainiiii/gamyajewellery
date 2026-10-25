'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import Icon from './Icon';
import Pic from './Pic';
import { useStore } from './Store';
import { price, inr, purity } from '../lib/data';

export default function CartDrawer() {
  const { drawer, setDrawer, items, rates, subtotal, qty, remove, count } = useStore();
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    const f = (e) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f);
  }, [drawer, setDrawer]);
  return (
    <div className={'drw' + (drawer ? ' open' : '')} aria-hidden={!drawer}>
      <div className="drbg" onClick={() => setDrawer(false)} />
      <aside className="drp" role="dialog" aria-label="Shopping bag">
        <div className="drh"><h2>Your bag {count > 0 && <small>({count})</small>}</h2><button onClick={() => setDrawer(false)} aria-label="Close bag"><Icon n="close" size={24} /></button></div>
        {items.length ? (
          <>
            <div className="ship"><Icon n="truck" size={20} /><span>Free insured delivery on this order</span></div>
            <ul className="dri">
              {items.map((i, n) => (
                <li key={i.k} style={{ '--d': n * 60 + 'ms' }}>
                  <Link href={`/product/${i.p.id}`} onClick={() => setDrawer(false)}><Pic p={i.p} /></Link>
                  <div>
                    <Link href={`/product/${i.p.id}`} onClick={() => setDrawer(false)}><b>{i.p.n}</b></Link>
                    <small>{purity(i.p)} · {i.p.w} g{i.size && ` · Size ${i.size}`}</small>
                    <div className="qrow">
                      <span className="qty"><button onClick={() => qty(i.k, -1)} aria-label="Less"><Icon n="minus" size={14} /></button>{i.qty}<button onClick={() => qty(i.k, 1)} aria-label="More"><Icon n="plus" size={14} /></button></span>
                      <button className="rm" onClick={() => remove(i.k)}><Icon n="trash" size={16} />Remove</button>
                    </div>
                  </div>
                  <em>{inr(price(i.p, rates).total * i.qty)}</em>
                </li>
              ))}
            </ul>
            <div className="drf">
              <p><span>Subtotal (incl. GST)</span><b>{inr(subtotal)}</b></p>
              <Link href="/checkout" className="btn gold full" onClick={() => setDrawer(false)}>Proceed to checkout</Link>
              <button className="btn alt full" onClick={() => setDrawer(false)}>Continue shopping</button>
            </div>
          </>
        ) : (
          <div className="dre"><div className="bagart"><Icon n="bag" size={46} sw={1} /></div><h3>Your bag is empty</h3><p>Find something you will love. Wedding season is here.</p><Link href="/shop" className="btn gold" onClick={() => setDrawer(false)}>Explore jewellery</Link></div>
        )}
      </aside>
    </div>
  );
}
