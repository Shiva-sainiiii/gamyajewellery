import Shop from '../../components/Shop';
export default function Page({ searchParams }) {
  const m = searchParams.metal || 'all', c = searchParams.cat || 'all', o = searchParams.occ || 'all', q = searchParams.q || '';
  return <Shop key={m + c + o + q} m={m} c={c} o={o} q={q} />;
}
