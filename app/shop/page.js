import Shop from '../../components/Shop';
export default function Page({ searchParams }) {
  return <Shop key={JSON.stringify(searchParams)} init={searchParams} />;
}
