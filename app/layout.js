import './globals.css';
import { Cormorant_Garamond, Hanken_Grotesk } from 'next/font/google';
import Store from '../components/Store';
import Header from '../components/Header';
import { WA } from '../lib/data';
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600'], variable: '--serif' });
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--sans' });
export const metadata = { title: 'Gamya Jewellery', description: 'Gold, silver and diamond jewellery, hallmarked and priced openly.' };
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Store>
          <Header />
          <main>{children}</main>
          <footer>
            <div className="wrap fcols">
              <div><b className="logo">Gamya Jewellery</b><p>Sonipat, Haryana</p></div>
              <div><h3>Shop</h3><a href="/shop?metal=gold">Gold</a><a href="/shop?metal=diamond">Diamond</a><a href="/shop?metal=silver">Silver</a><a href="/shop?occ=Bridal">Wedding</a></div>
              <div><h3>Help</h3><p>Free insured shipping</p><p>7 day returns on unworn pieces with tags</p><p>Exchange and buyback at the day’s rate</p></div>
              <div><h3>Visit</h3><a href={`https://wa.me/${WA}`}>Chat on WhatsApp</a><a href="/admin">Shop admin (demo)</a></div>
            </div>
            <div className="wrap"><p className="mut fdemo">Demo website. Payments, delivery and orders are simulated and no money is charged.</p></div>
          </footer>
          <a className="wa" href={`https://wa.me/${WA}`}>WhatsApp</a>
        </Store>
      </body>
    </html>
  );
}
