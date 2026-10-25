const T = { gold: ['#EBCB80', '#9A7424', '#F3ECDD'], silver: ['#F2F4F5', '#858B91', '#E8ECEE'], diamond: ['#EBCB80', '#A07B2C', '#E7EEF0'] };
export default function Art({ p }) {
  const [a, b, bg] = T[p.metal], id = 'g' + p.id, f = `url(#${id})`;
  const s = { stroke: f, fill: 'none', strokeLinecap: 'round' };
  const dia = p.metal === 'diamond';
  const stone = (x, y, r) => <circle cx={x} cy={y} r={r} fill={dia ? '#fff' : f} stroke={dia ? '#9FB4C0' : 'none'} strokeWidth=".8" />;
  const shapes = {
    ring: <><circle cx="50" cy="62" r="22" {...s} strokeWidth="7" />{dia ? <path d="M50 20l9 9-9 13-9-13z" fill="#fff" stroke="#9FB4C0" strokeWidth=".8" /> : stone(50, 36, 5)}</>,
    necklace: <><path d="M18 22Q50 98 82 22" {...s} strokeWidth="3" />{stone(50, 63, 6)}</>,
    earring: [34, 66].map((x) => <g key={x}><circle cx={x} cy="22" r="3" fill={f} /><path d={`M${x} 25v16`} {...s} strokeWidth="2" /><path d={`M${x} 42c-9 8-9 20 0 24c9-4 9-16 0-24z`} fill={dia ? '#fff' : f} stroke={dia ? '#9FB4C0' : 'none'} strokeWidth=".8" /></g>),
    bangle: <><ellipse cx="50" cy="55" rx="30" ry="26" {...s} strokeWidth="6" /><ellipse cx="50" cy="55" rx="23" ry="19" {...s} strokeWidth="1.5" opacity=".6" /></>,
    chain: <path d="M14 36Q50 100 86 36" {...s} strokeWidth="4.5" strokeDasharray="6 3" />,
    pendant: <><path d="M28 14Q50 44 72 14" {...s} strokeWidth="2" /><path d="M50 42c-15 12-15 30 0 40c15-10 15-28 0-40z" fill={f} />{dia && <circle cx="50" cy="62" r="5" fill="#fff" stroke="#9FB4C0" strokeWidth=".8" />}</>,
  };
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={p.name} style={{ background: bg }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      {shapes[p.art]}
    </svg>
  );
}
