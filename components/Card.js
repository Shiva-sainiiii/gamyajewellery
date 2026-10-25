'use client';
import Link from 'next/link';
import Pic from './Pic';
import Icon from './Icon';
import { useStore } from './Store';
import { price, inr, purity, COLORS, byId } from '../lib/data';

export default function Card({ p, badge }) {
  const { rates, wished, wishToggle, add } = useStore();
  const need = p.cat === 'Rings' || p.cat === 'Bracelets';
  const vs = [p, ...p.v.map((x) => byId[x]).filter(Boolean)].filter((x, i, a) => a.findIndex((y) => y.col === x.col) === i).slice(0, 4);
  return (
    <div className="card">
      <Link href={`/product/${p.id}`} className="cimg" aria-label={p.n}>
        <Pic p={p} />
        {(badge || !!p.dia) && <span className="tagx">{badge || 'Diamond'}</span>}
      </Link>
      <button className={'heart' + (wished(p.id) ? ' on' : '')} onClick={() => wishToggle(p.id)} aria-label="Add to wishlist" aria-pressed={wished(p.id)}>
        <Icon n="heart" size={20} fill={wished(p.id)} />
      </button>
      {need ? (
        <Link href={`/product/${p.id}`} className="quick">Choose size</Link>
      ) : (
        <button className="quick" onClick={() => add(p.id)}><Icon n="bag" size={16} /> Add to bag</button>
      )}
      <div className="cbody">
        <h3><Link href={`/product/${p.id}`}>{p.n}</Link></h3>
        <p className="csub">{purity(p)} · {p.w} g</p>
        <div className="cfoot">
          <b>{inr(price(p, rates).total)}</b>
          {vs.length > 1 && <span className="dots">{vs.map((v) => <i key={v.id} title={COLORS[v.col].label} style={{ background: COLORS[v.col].hex }} />)}</span>}
        </div>
      </div>
    </div>
  );
}
