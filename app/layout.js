import './globals.css';
import Store from '../components/Store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Floaters from '../components/Floaters';

export const metadata = {
  title: 'Gamya Jewellery | Gold, diamond and platinum jewellery',
  description: 'Hallmarked gold, certified diamonds and platinum jewellery, priced openly by the gram. Free insured delivery.',
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#7a1220' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Store>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Floaters />
        </Store>
      </body>
    </html>
  );
}
