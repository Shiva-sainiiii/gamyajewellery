import Shop from '../../components/Shop';
export default function Page({ searchParams }) {
  const m = searchParams.metal || 'all', c = searchParams.cat || 'all';
  return <Shop key={m + c} m={m} c={c} />;
}
