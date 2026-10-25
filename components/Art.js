// Gold line-art placeholder, shown only if a product photo is missing or cannot load.
const T = { yellow: ['#F2D68A', '#A47A25'], rose: ['#F0BBA8', '#B8705A'], white: ['#F4F6F7', '#8A9298'], tri: ['#F2D68A', '#B8705A'], platinum: ['#F1F3F5', '#7E868C'] };
export default function Art({ p }) {
  const [a, b] = T[p.col] || T.yellow, id = 'g' + p.id, f = `url(#${id})`;
  const s = { stroke: f, fill: 'none', strokeLinecap: 'round' };
  const stone = (x, y, r) => <circle cx={x} cy={y} r={r} fill={p.dia ? '#fff' : f} stroke={p.dia ? '#9FB4C0' : 'none'} strokeWidth=".8" />;
  const shapes = {
    Rings: <><circle cx="50" cy="62" r="22" {...s} strokeWidth="6" />{p.dia ? <path d="M50 20l9 9-9 13-9-13z" fill="#fff" stroke="#9FB4C0" strokeWidth=".8" /> : stone(50, 36, 4.5)}</>,
    Necklaces: <><path d="M18 22Q50 98 82 22" {...s} strokeWidth="2.4" />{stone(50, 63, 6)}{stone(40, 55, 2.4)}{stone(60, 55, 2.4)}</>,
    Earrings: [34, 66].map((x) => <g key={x}><circle cx={x} cy="22" r="3" fill={f} /><path d={`M${x} 25v16`} {...s} strokeWidth="2" /><path d={`M${x} 42c-9 8-9 20 0 24c9-4 9-16 0-24z`} fill={p.dia ? '#fff' : f} stroke={p.dia ? '#9FB4C0' : 'none'} strokeWidth=".8" /></g>),
    Bracelets: <><ellipse cx="50" cy="55" rx="31" ry="22" {...s} strokeWidth="6" /><ellipse cx="50" cy="55" rx="24" ry="15" {...s} strokeWidth="1.2" opacity=".6" />{stone(50, 33, 3)}</>,
  };
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={p.n} className="art">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      {shapes[p.cat]}
    </svg>
  );
}
