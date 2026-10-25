'use client';
import { useState } from 'react';
import Art from './Art';
import { IMG } from '../lib/images';
export default function Pic({ k, p, alt = '', className = '' }) {
  const [bad, setBad] = useState(false);
  const src = IMG[k || (p && p.id)];
  if (!src || bad) return p ? <Art p={p} /> : <div className={'ph ' + className} aria-hidden="true" />;
  return <img className={className} src={src} alt={alt || (p && p.name) || ''} loading="lazy" onError={() => setBad(true)} />;
}
