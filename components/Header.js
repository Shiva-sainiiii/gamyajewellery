'use client';
import Link from 'next/link';
import { useStore } from './Store';
import { rateOf, inr } from '../lib/data';
export default function Header() {
  const { cart, rates } = useStore();
  const n = cart.reduce((a, c) => a + c.qty, 0);
  return (
    <header>
      <div className="bar">22K gold today {inr(rateOf(rates, 22))} per gram (demo rate). Free insured delivery on every order.</div>
      <div className="top wrap">
        <form action="/shop" className="srch"><input name="q" placeholder="Search rings, necklaces, kada" aria-label="Search jewellery" /></form>
        <Link href="/" className="logo">Gamya <span>Jewellery</span></Link>
        <div className="tools"><Link href="/checkout">Cart{n > 0 && ` (${n})`}</Link></div>
      </div>
      <nav className="cn">
        <Link href="/shop">All jewellery</Link>
        <Link href="/shop?metal=gold">Gold</Link>
        <Link href="/shop?metal=diamond">Diamond</Link>
        <Link href="/shop?metal=silver">Silver</Link>
        <Link href="/shop?occ=Bridal">Wedding</Link>
        <Link href="/shop?occ=Gifting">Gifting</Link>
        <Link href="/shop?cat=Rings">Rings</Link>
        <Link href="/shop?cat=Necklaces">Necklaces</Link>
      </nav>
    </header>
  );
}
