'use client';
import Link from 'next/link';
import { useStore } from './Store';
import { rateOf, inr } from '../lib/data';
export default function Header() {
  const { cart, rates } = useStore();
  const n = cart.reduce((a, c) => a + c.qty, 0);
  return (
    <header>
      <div className="bar">Free insured delivery on every order. 22K gold today {inr(rateOf(rates, 22))} per gram (demo rate)</div>
      <nav>
        <Link href="/" className="logo">Gamya <span>Jewellery</span></Link>
        <div className="links">
          <Link href="/shop?metal=gold">Gold</Link>
          <Link href="/shop?metal=silver">Silver</Link>
          <Link href="/shop?metal=diamond">Diamond</Link>
          <Link href="/checkout">Cart{n > 0 && ` (${n})`}</Link>
        </div>
      </nav>
    </header>
  );
}
