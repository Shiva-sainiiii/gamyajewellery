export default function Logo({ small = false }) {
  return (
    <span className={'lg' + (small ? ' sm' : '')}>
      <svg viewBox="0 0 48 44" aria-hidden="true">
        <defs><linearGradient id="lgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9a441" /><stop offset="1" stopColor="#8a2332" /></linearGradient></defs>
        <path d="M6 4h36M24 4v6" stroke="url(#lgg)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M33 14c-2-3.500-6-5-10-5-8 0-13 5.500-13 12.500S15 34 23 34c5 0 9-2 10-6v-6H23" stroke="url(#lgg)" strokeWidth="2.800" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M24 40l3 2-3 2-3-2 3-2z" fill="#d9a441" />
      </svg>
      <span className="lt"><b>GAMYA</b><small>JEWELLERY</small></span>
    </span>
  );
}
