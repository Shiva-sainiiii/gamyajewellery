'use client';
import { useEffect, useRef, useState } from 'react';
import Art from './Art';
import { imgUrl } from '../lib/images';
// Product photo with shimmer while loading and a line-art fallback if it fails.
export default function Pic({ p, className = '', eager = false }) {
  const [st, setSt] = useState('load');
  const ref = useRef(null);
  useEffect(() => { if (ref.current && ref.current.complete && ref.current.naturalWidth) setSt('ok'); }, []);
  if (st === 'bad' || !p.img) return <div className={'pic fb ' + className}><Art p={p} /></div>;
  return (
    <div className={'pic ' + st + ' ' + className}>
      <img ref={ref} src={imgUrl(p)} alt={p.n} loading={eager ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer"
        onLoad={() => setSt('ok')} onError={() => setSt('bad')} draggable="false" />
    </div>
  );
}
