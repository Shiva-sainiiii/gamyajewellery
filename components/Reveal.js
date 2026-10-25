'use client';
import { useEffect, useRef, useState } from 'react';
// Fades and lifts its children in when they scroll into view.
export default function Reveal({ children, delay = 0, as: T = 'div', className = '', from = 'up', ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) return setOn(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <T ref={ref} className={`rv ${from} ${on ? 'in' : ''} ${className}`} style={{ '--d': delay + 'ms' }} {...rest}>{children}</T>;
}
