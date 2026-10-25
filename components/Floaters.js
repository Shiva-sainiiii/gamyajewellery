'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { WA } from '../lib/data';

export default function Floaters() {
  const [top, setTop] = useState(false), [bub, setBub] = useState(false);
  useEffect(() => {
    const f = () => setTop(window.scrollY > 700); f();
    window.addEventListener('scroll', f, { passive: true });
    const t = setTimeout(() => setBub(true), 2500);
    return () => { window.removeEventListener('scroll', f); clearTimeout(t); };
  }, []);
  return (
    <>
      <button className={'totop' + (top ? ' show' : '')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Icon n="up" size={22} /></button>
      <div className="help">
        {bub && <div className="bubble">How can I help you?<button onClick={() => setBub(false)} aria-label="Dismiss"><Icon n="close" size={14} /></button></div>}
        <a className="wa" href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi Gamya, I need help choosing jewellery')}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3a13 13 0 00-11 19.800L3 29l6.400-2A13 13 0 1016 3zm0 23.700a10.700 10.700 0 01-5.500-1.500l-.4-.2-3.800 1.200 1.200-3.700-.3-.4A10.700 10.700 0 1116 26.700zm5.900-8c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.700 8.700 0 01-4.300-3.800c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 00-.9.400 3.700 3.700 0 00-1.100 2.700 6.400 6.400 0 001.300 3.400 14.700 14.700 0 005.700 5c2.100.9 2.900 1 3.900.8a3.300 3.300 0 002.200-1.500 2.700 2.700 0 00.2-1.500c-.1-.1-.3-.2-.6-.4z" /></svg>
        </a>
      </div>
    </>
  );
}
