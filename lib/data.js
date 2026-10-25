import RAW from './products.json';

export const BRAND = 'Gamya';
export const WA = '919999999999'; // replace with the shop's WhatsApp number
export const RATES0 = { g24: 12500, silver: 190, pt: 4600 }; // demo rates per gram, editable at /admin
export const STEPS = ['Placed', 'Packed', 'Shipped', 'Delivered'];
export const COUPONS = { WELCOME5: 5, GAMYA10: 10 }; // % off on the total, demo only

export const rateOf = (r, k) => Math.round((r.g24 * k) / 24);
export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const short = (n) => (n >= 1e7 ? (n / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' Cr' : n >= 1e5 ? (n / 1e5).toFixed(2).replace(/\.?0+$/, '') + ' L' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : '' + n);

export const COLORS = {
  yellow: { label: 'Yellow gold', hex: '#E6BE63' },
  rose: { label: 'Rose gold', hex: '#E3A58F' },
  white: { label: 'White gold', hex: '#D9DDE0' },
  tri: { label: 'Tri-colour gold', hex: 'conic-gradient(#E6BE63,#E3A58F,#D9DDE0,#E6BE63)' },
  platinum: { label: 'Platinum', hex: '#C4C8CC' },
};
export const purity = (p) => (p.k === 950 ? 'Platinum 950' : p.k + 'K ' + COLORS[p.col].label.toLowerCase());

export const PRODUCTS = RAW.map((p) => ({ ...p, metal: p.k === 950 ? 'platinum' : p.dia ? 'diamond' : 'gold', gem: p.g.length > 0 }));
export const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export const price = (p, r) => {
  const unit = p.k === 950 ? r.pt : (r.g24 * p.k) / 24;
  const metal = p.w * unit, making = (metal * p.mk) / 100, stone = p.st;
  const gst = (metal + making + stone) * 0.03;
  return { unit, metal, making, stone, gst, total: Math.round(metal + making + stone + gst) };
};

export const CATS = ['Rings', 'Earrings', 'Necklaces', 'Bracelets'];
export const OCCS = [
  ['Wedding', 'Bridal bands and sets'],
  ['Daily wear', 'Light, easy, everyday'],
  ['Festive', 'Colour and gemstones'],
  ['Party', 'Statement diamonds'],
  ['Gifting', 'For someone special'],
];
export const BUDGETS = [
  ['Under ₹25K', 0, 25000], ['₹25K – ₹50K', 25000, 50000], ['₹50K – ₹1L', 50000, 100000],
  ['₹1L – ₹2.5L', 100000, 250000], ['₹2.5L & above', 250000, 1e9],
];

// first product matching a filter, for banners and tiles (data is already shuffled)
export const first = (f, n = 0) => PRODUCTS.filter(f)[n];
export const search = (q, rates) => {
  const t = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!t.length) return [];
  return PRODUCTS.filter((p) => {
    const hay = [p.n, p.cat, p.occ, p.coll, p.metal, COLORS[p.col].label, p.g.join(' '), p.dia ? 'diamond diamonds' : '', p.k === 950 ? 'platinum' : 'gold'].join(' ').toLowerCase();
    return t.every((w) => hay.includes(w.replace(/s$/, '')));
  });
};
