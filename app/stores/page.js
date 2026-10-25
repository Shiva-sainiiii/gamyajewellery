'use client';
import { useState } from 'react';
import Icon from '../../components/Icon';
import Reveal from '../../components/Reveal';

const S = [
  ['Sonipat, Model Town (flagship)', 'Shop 12, Model Town Market, Sonipat, Haryana 131001', '10 AM – 8:30 PM', 'Mon – Sun', '28.9948,77.0151'],
  ['Rohtak, Delhi Road', 'Near Bus Stand, Delhi Road, Rohtak, Haryana 124001', '10:30 AM – 8 PM', 'Mon – Sat', '28.8955,76.6066'],
  ['Delhi, Karol Bagh', '2nd Floor, Ajmal Khan Road, Karol Bagh, New Delhi', '11 AM – 8 PM', 'Mon – Sun', '28.6519,77.1909'],
];
export default function Stores() {
  const [f, setF] = useState({ n: '', ph: '', s: 0, d: 'Tomorrow, 12 PM' }), [ok, setOk] = useState(false);
  const valid = f.n.trim() && /^\d{10}$/.test(f.ph);
  return (
    <div className="wrap sec">
      <h1 className="h1s">Our showrooms</h1><p className="sub">Demo locations. Replace these with the shop’s real addresses in app/stores/page.js.</p>
      <div className="stg">
        <div className="stl">{S.map(([n, a, h, d, ll], i) => (
          <Reveal key={n} delay={i * 80} className={'stc' + (f.s === i ? ' on' : '')}>
            <h3><Icon n="pin" size={22} />{n}</h3><p>{a}</p><p className="mut"><Icon n="clock" size={16} /> {h}, {d}</p>
            <div className="stb"><a className="btn alt" href={`https://www.google.com/maps/search/?api=1&query=${ll}`} target="_blank" rel="noreferrer">Directions</a><button className="btn" onClick={() => { setF({ ...f, s: i }); setOk(false); document.getElementById('bk')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>Book a visit</button></div>
          </Reveal>))}
        </div>
        <Reveal from="right" className="cbox" id="bk">
          {ok ? <div className="okbox"><svg className="tick" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg><h3>Visit booked</h3><p>{S[f.s][0]}, {f.d}. We will keep your shortlist ready. (Demo)</p></div> : (
            <form className="form" onSubmit={(e) => { e.preventDefault(); if (valid) setOk(true); }}>
              <h2>Book a showroom visit</h2>
              <label>Your name<input value={f.n} onChange={(e) => setF({ ...f, n: e.target.value })} /></label>
              <label>Mobile number<input inputMode="numeric" maxLength={10} value={f.ph} onChange={(e) => setF({ ...f, ph: e.target.value.replace(/\D/g, '') })} /></label>
              <label>Showroom<select value={f.s} onChange={(e) => setF({ ...f, s: +e.target.value })}>{S.map(([n], i) => <option key={n} value={i}>{n}</option>)}</select></label>
              <label>Preferred slot<select value={f.d} onChange={(e) => setF({ ...f, d: e.target.value })}><option>Tomorrow, 12 PM</option><option>Tomorrow, 4 PM</option><option>This weekend, 11 AM</option></select></label>
              <button className="btn gold full" disabled={!valid}>Confirm visit</button>
            </form>)}
        </Reveal>
      </div>
    </div>
  );
}
