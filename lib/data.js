export const WA = '919999999999'; // replace with the shop's WhatsApp number
export const RATES0 = { g24: 12500, silver: 190 }; // demo rates per gram, editable at /admin
export const STEPS = ['Placed', 'Packed', 'Shipped', 'Delivered'];
export const rateOf = (r, k) => Math.round((r.g24 * k) / 24);
export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const lab = (p) => p.metal === 'silver' ? '925 silver' : p.k + 'K gold' + (p.metal === 'diamond' ? ' with diamonds' : '');
const row = ([id, name, metal, cat, k, w, mk, st, occ, art]) => ({ id, name, metal, cat, k, w, mk, st, occ, art });
export const PRODUCTS = [
  ['g1', 'Kanak temple necklace', 'gold', 'Necklaces', 22, 38.5, 9, 0, 'Bridal', 'necklace'],
  ['d1', 'Anaya solitaire ring', 'diamond', 'Rings', 18, 3.2, 14, 38000, 'Engagement', 'ring'],
  ['g2', 'Ruhi plain bangles, pair', 'gold', 'Bangles', 22, 24, 8, 0, 'Daily wear', 'bangle'],
  ['s1', 'Silver link chain, 22 in', 'silver', 'Chains', 0, 28, 18, 0, 'Gifting', 'chain'],
  ['g3', 'Meera jhumka earrings', 'gold', 'Earrings', 22, 9.6, 11, 0, 'Festive', 'earring'],
  ['d2', 'Noor diamond studs', 'diamond', 'Earrings', 18, 2.4, 12, 22000, 'Daily wear', 'earring'],
  ['g4', 'Vansh gents kada', 'gold', 'Bangles', 22, 32, 7, 0, 'Gifting', 'bangle'],
  ['d3', 'Aarohi diamond pendant', 'diamond', 'Pendants', 18, 3.6, 13, 26000, 'Gifting', 'pendant'],
  ['g5', 'Tara rope chain, 20 in', 'gold', 'Chains', 22, 12, 6, 0, 'Daily wear', 'chain'],
  ['s2', 'Silver kada', 'silver', 'Bangles', 0, 45, 15, 0, 'Gifting', 'bangle'],
  ['d4', 'Zoya diamond line necklace', 'diamond', 'Necklaces', 18, 8.5, 13, 64000, 'Bridal', 'necklace'],
  ['g6', 'Ishani floral ring', 'gold', 'Rings', 22, 4.8, 10, 0, 'Daily wear', 'ring'],
  ['s3', 'Silver oxidised jhumkas', 'silver', 'Earrings', 0, 14, 14, 0, 'Festive', 'earring'],
  ['s4', 'Silver om pendant', 'silver', 'Pendants', 0, 6, 16, 0, 'Gifting', 'pendant'],
].map(row);
export const price = (p, r) => {
  const unit = p.metal === 'silver' ? r.silver : (r.g24 * p.k) / 24;
  const metal = p.w * unit, making = (metal * p.mk) / 100, stone = p.st;
  const gst = (metal + making + stone) * 0.03;
  return { metal, making, stone, gst, total: Math.round(metal + making + stone + gst) };
};
