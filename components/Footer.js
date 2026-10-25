'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import { WA } from '../lib/data';

export default function Footer() {
  const [em, setEm] = useState(''), [ok, setOk] = useState(false);
  return (
    <footer className="ft">
      <div className="nl"><div className="wrap nlw">
        <div><h3>Stay in the Gamya circle</h3><p>New collections, gold rate alerts and wedding season offers. No spam.</p></div>
        {ok ? <p className="thx"><Icon n="check" size={20} /> You are on the list. (Demo, nothing was sent.)</p> : (
          <form onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(em)) setOk(true); }}>
            <input type="email" placeholder="Your email address" value={em} onChange={(e) => setEm(e.target.value)} aria-label="Email" />
            <button className="btn gold">Subscribe</button>
          </form>
        )}
      </div></div>
      <div className="wrap fcols">
        <div className="fabout"><Logo /><p>Hallmarked gold, certified diamonds and platinum, priced openly by the gram. Sonipat, Haryana.</p></div>
        <div><h4>Shop</h4><Link href="/shop?metal=gold">Gold</Link><Link href="/shop?metal=diamond">Diamond</Link><Link href="/shop?metal=platinum">Platinum</Link><Link href="/shop?occ=Wedding">Wedding</Link><Link href="/shop?occ=Gifting">Gifting</Link></div>
        <div><h4>Help</h4><Link href="/track">Track your order</Link><Link href="/stores">Showrooms</Link><Link href="/#exchange">Gold exchange</Link><Link href="/wishlist">Wishlist</Link></div>
        <div><h4>Promises</h4><p>Free insured shipping</p><p>7 day returns on unworn pieces</p><p>Exchange and buyback at the day’s rate</p></div>
        <div><h4>Talk to us</h4><a href={`https://wa.me/${WA}`}>Chat on WhatsApp</a><Link href="/stores">Book a showroom visit</Link><Link href="/admin">Shop admin (demo)</Link></div>
      </div>
      <div className="wrap fbot"><p>© {new Date().getFullYear()} Gamya Jewellery. Demo website for presentation. Product photos and designs are sample catalogue data; payments, delivery and orders are simulated and no money is charged.</p></div>
    </footer>
  );
}
