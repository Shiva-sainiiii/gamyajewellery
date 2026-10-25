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
            <div className="wrap">
              <b className="logo">Gamya Jewellery</b>
              <p>Sonipat, Haryana. Free insured shipping. 7 day returns on unworn pieces with tags. Exchange and buyback at the day’s gold rate.</p>
              <p className="mut">Demo website. Payments, delivery and orders are simulated and no money is charged.</p>
            </div>
          </footer>
          <a className="wa" href={`https://wa.me/${WA}`}>WhatsApp</a>
        </Store>
      </body>
    </html>
  );
}
