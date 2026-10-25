'use client';
import { useState } from 'react';
export default function Enquiry() {
  const [n, setN] = useState(''), [ph, setPh] = useState(''), [done, setDone] = useState(false);
  const ok = n.trim() && /^\d{10}$/.test(ph);
  if (done) return <p><b>Thank you, {n}.</b> This is a demo, so nobody will call, but on the live site this reaches the shop.</p>;
  return (
    <div>
      <label>Your name<input value={n} onChange={(e) => setN(e.target.value)} /></label>
      <label>Mobile number<input inputMode="numeric" maxLength="10" value={ph} onChange={(e) => setPh(e.target.value)} /></label>
      <button className="btn" disabled={!ok} onClick={() => setDone(true)}>Request a call back</button>
    </div>
  );
}
