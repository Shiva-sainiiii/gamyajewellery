'use client';
import Link from 'next/link';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import { useStore } from '../../components/Store';
import { byId } from '../../lib/data';
export default function Wishlist() {
  const { wish, ready } = useStore();
  const items = wish.map((w) => byId[w]).filter(Boolean);
  return (
    <div className="wrap sec">
      <h1 className="h1s">Your wishlist {items.length > 0 && <small>({items.length})</small>}</h1>
      {!ready ? null : items.length ? <div className="grid">{items.map((p, i) => <div className="gi" key={p.id} style={{ '--d': i * 40 + 'ms' }}><Card p={p} /></div>)}</div> : (
        <div className="none"><Icon n="heart" size={48} sw={1} /><h3>Nothing saved yet</h3><p>Tap the heart on any piece to save it here.</p><Link href="/shop" className="btn gold">Explore jewellery</Link></div>
      )}
    </div>
  );
}
