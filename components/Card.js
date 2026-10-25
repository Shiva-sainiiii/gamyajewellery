'use client';
import Link from 'next/link';
import Art from './Art';
import { useStore } from './Store';
import { price, inr, lab } from '../lib/data';
export default function Card({ p }) {
  const { rates } = useStore();
  return (
    <Link href={`/product/${p.id}`} className="card">
      <Art p={p} />
      <h3>{p.name}</h3>
      <p>{lab(p)}, {p.w} g</p>
      <b>{inr(price(p, rates).total)}</b>
    </Link>
  );
}
