'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Pic from '../../../components/Pic';
import Card from '../../../components/Card';
import Icon from '../../../components/Icon';
import Reveal from '../../../components/Reveal';
import { useStore } from '../../../components/Store';
import { imgUrl } from '../../../lib/images';
import { PRODUCTS, byId, price, inr, purity, COLORS, WA } from '../../../lib/data';

const SIZES = { Rings: ['8', '10', '12', '14', '16', '18', '20', '22'], Bracelets: ['2.2', '2.4', '2.6', '2.8', '2.10'] };

export default function Product() {
  const { id } = useParams(); const router = useRouter();
  const { rates, add, wished, wishToggle, seen, recent, toast } = useStore();
  const p = byId[id];
  const [size, setSize] = useState(''), [err, setErr] = useState(false), [pin, setPin] = useState(''), [eta, setEta] = useState(null), [zoom, setZoom] = useState(null), [open, setOpen] = useState('det'), [vid, setVid] = useState(false);
  const ready = useRef(false);
  useEffect(() => { if (p) seen(p.id); setSize(''); setEta(null); window.scrollTo(0, 0); }, [id]); // eslint-disable-line
  if (!p) return <div className="wrap sec none"><Icon n="gem" size={48} sw={1} /><h1 className="h1s">We could not find this piece</h1><Link className="btn gold" href="/shop">Back to jewellery</Link></div>;

  const b = price(p, rates), sizes = SIZES[p.cat];
  const vs = [p, ...p.v.map((x) => byId[x]).filter(Boolean)].filter((x, i, a) => a.findIndex((y) => y.col === x.col) === i);
  const sim = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id && x.metal === p.metal).slice(0, 8);
  const rc = recent.filter((r) => r !== p.id).map((r) => byId[r]).filter(Boolean).slice(0, 6);

  const need = () => { if (sizes && !size) { setErr(true); toast('Please choose a size first', 'err'); document.getElementById('sizes')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return true; } return false; };
  const addBag = () => { if (!need()) add(p.id, size); };
  const buy = () => { if (!need()) { add(p.id, size, 1, false); router.push('/checkout'); } };
  const check = () => {
    if (!/^\d{6}$/.test(pin)) return setEta({ bad: 'Enter a valid 6 digit pincode.' });
    const d = new Date(Date.now() + (pin[0] === '1' ? 3 : 6) * 864e5);
    setEta({ ok: 'Free insured delivery by ' + d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) + '. Showroom pickup available tomorrow.' });
  };
  const mv = (e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom([((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100]); };
  const share = async () => { try { if (navigator.share) await navigator.share({ title: p.n, url: location.href }); else { await navigator.clipboard.writeText(location.href); toast('Link copied'); } } catch {} };
  const Acc = ({ k, t, children }) => <div className={'acc' + (open === k ? ' on' : '')}><button onClick={() => setOpen(open === k ? '' : k)}>{t}<Icon n="down" size={20} /></button><div className="accb"><div>{children}</div></div></div>;

  return (
    <div className="wrap sec pdp">
      <nav className="crumb"><Link href="/">Home</Link><Icon n="chev" size={12} /><Link href={`/shop?cat=${p.cat}`}>{p.cat}</Link><Icon n="chev" size={12} /><span>{p.n}</span></nav>
      <div className="pd">
        <div className="gal">
          <div className={'zoom' + (zoom ? ' z' : '')} onMouseMove={mv} onMouseLeave={() => setZoom(null)}>
            <Pic p={p} eager />
            {zoom && p.img && <span className="zl" style={{ backgroundImage: `url(${imgUrl(p)})`, backgroundPosition: `${zoom[0]}% ${zoom[1]}%` }} />}
            <span className="tagx">{purity(p)}</span>
          </div>
          <div className="gbtns">
            <button className={'ib' + (wished(p.id) ? ' on' : '')} onClick={() => wishToggle(p.id)} aria-label="Wishlist"><Icon n="heart" fill={wished(p.id)} size={22} /></button>
            <button className="ib" onClick={share} aria-label="Share"><Icon n="share" size={20} /></button>
          </div>
          {vs.length > 1 && <div className="thumbs">{vs.map((v) => <Link key={v.id} href={`/product/${v.id}`} className={v.id === p.id ? 'on' : ''} replace><Pic p={v} /></Link>)}</div>}
        </div>

        <div className="info">
          <p className="eyebrow dark">{p.coll}</p>
          <h1>{p.n}</h1>
          <p className="mut">{p.d}</p>
          <div className="prr"><b className="pr">{inr(b.total)}</b><span className="mut">MRP incl. all taxes</span></div>
          <button className="lnk bk" onClick={() => setOpen('price')}>View price breakup</button>

          {vs.length > 1 && (
            <div className="blk"><h4>Metal colour: <span>{COLORS[p.col].label}</span></h4>
              <div className="swr">{vs.map((v) => <Link key={v.id} href={`/product/${v.id}`} replace className={'sw' + (v.id === p.id ? ' on' : '')} title={COLORS[v.col].label} style={{ background: COLORS[v.col].hex }} aria-label={COLORS[v.col].label} />)}</div></div>
          )}
          {sizes && (
            <div className={'blk' + (err && !size ? ' shake' : '')} id="sizes"><h4>{p.cat === 'Rings' ? 'Ring size (India)' : 'Bracelet size (inches)'} {err && !size && <span className="bad">Select a size</span>}</h4>
              <div className="sz">{sizes.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => { setSize(s); setErr(false); }}>{s}</button>)}</div></div>
          )}

          <div className="buy">
            <button className="btn gold lg" onClick={addBag}><Icon n="bag" size={20} /> Add to bag</button>
            <button className="btn dark lg" onClick={buy}>Buy now</button>
          </div>
          <div className="alts">
            <button onClick={() => setVid(true)}><Icon n="video" size={20} />Video call with an expert</button>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi, I am interested in ' + p.n + ' (' + p.id.toUpperCase() + ')')}`} target="_blank" rel="noreferrer"><Icon n="whatsapp" size={20} />Ask on WhatsApp</a>
          </div>

          <div className="blk dl">
            <h4>Delivery</h4>
            <div className="row"><input inputMode="numeric" maxLength={6} placeholder="Enter pincode" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} onKeyDown={(e) => e.key === 'Enter' && check()} /><button className="btn alt" onClick={check}>Check</button></div>
            {eta && <p className={eta.bad ? 'bad' : 'good'}><Icon n={eta.bad ? 'info' : 'truck'} size={18} />{eta.bad || eta.ok}</p>}
          </div>

          <div className="trust">{[['shield', 'BIS hallmarked'], ['refresh', '7 day returns'], ['truck', 'Insured delivery'], ['gem', 'Lifetime exchange']].map(([i, t]) => <span key={t}><Icon n={i} size={26} sw={1.2} />{t}</span>)}</div>

          <Acc k="det" t="Product details">
            <table className="dt"><tbody>
              <tr><td>Product code</td><td>{p.id.toUpperCase()}</td></tr>
              <tr><td>Metal</td><td>{purity(p)}</td></tr>
              <tr><td>Gross weight</td><td>{p.w} g</td></tr>
              {p.dia > 0 && <tr><td>Diamonds</td><td>{p.ct ? p.ct + ' ct, ' : ''}VVS-VS, F-G colour, certified</td></tr>}
              {p.gem && <tr><td>Gemstones</td><td>{p.g.filter((g) => !g.startsWith('diamond')).join(', ')}</td></tr>}
              <tr><td>Occasion</td><td>{p.occ}</td></tr>
            </tbody></table>
          </Acc>
          <Acc k="price" t="Price breakup">
            <table className="dt"><tbody>
              <tr><td>{p.w} g × {inr(b.unit)} per gram</td><td>{inr(b.metal)}</td></tr>
              <tr><td>Making charges ({p.mk}%)</td><td>{inr(b.making)}</td></tr>
              {p.st > 0 && <tr><td>Diamonds and gemstones</td><td>{inr(b.stone)}</td></tr>}
              <tr><td>GST (3%)</td><td>{inr(b.gst)}</td></tr>
              <tr className="tt"><td>Total</td><td>{inr(b.total)}</td></tr>
            </tbody></table>
            <p className="mut">Priced from today’s demo rate. Update the rate at /admin and this price changes everywhere.</p>
          </Acc>
          <Acc k="ship" t="Delivery and returns"><p>Free insured delivery, signed for with an OTP. Unworn pieces with tags can be returned within 7 days. Lifetime exchange and buyback at the day’s gold rate.</p></Acc>
        </div>
      </div>

      {sim.length > 0 && <Reveal className="rel"><h2>You may also like</h2><div className="rscroll">{sim.map((x) => <div className="ritem" key={x.id}><Card p={x} /></div>)}</div></Reveal>}
      {rc.length > 0 && <Reveal className="rel"><h2>Recently viewed</h2><div className="rscroll">{rc.map((x) => <div className="ritem" key={x.id}><Card p={x} /></div>)}</div></Reveal>}

      <div className="sbar"><div><b>{p.n}</b><span>{inr(b.total)}</span></div><button className="btn gold" onClick={addBag}>Add to bag</button></div>
      {vid && <VideoCall p={p} close={() => setVid(false)} />}
    </div>
  );
}

function VideoCall({ p, close }) {
  const [f, setF] = useState({ n: '', ph: '', t: 'Today, 6 PM' }), [ok, setOk] = useState(false);
  const valid = f.n.trim() && /^\d{10}$/.test(f.ph);
  return (
    <div className="ov" onClick={close}><div className="mod" onClick={(e) => e.stopPropagation()}>
      <button className="x" onClick={close} aria-label="Close"><Icon n="close" size={22} /></button>
      {ok ? <div className="okbox"><svg className="tick" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg><h3>Video call booked</h3><p>{f.t}. We will WhatsApp you the link. (Demo)</p><button className="btn gold" onClick={close}>Done</button></div> : (
        <form className="form" onSubmit={(e) => { e.preventDefault(); if (valid) setOk(true); }}>
          <h2>Video call with an expert</h2><p className="mut">See the {p.n} live and ask anything.</p>
          <label>Your name<input value={f.n} onChange={(e) => setF({ ...f, n: e.target.value })} /></label>
          <label>Mobile number<input inputMode="numeric" maxLength={10} value={f.ph} onChange={(e) => setF({ ...f, ph: e.target.value.replace(/\D/g, '') })} /></label>
          <label>Slot<select value={f.t} onChange={(e) => setF({ ...f, t: e.target.value })}><option>Today, 6 PM</option><option>Tomorrow, 11 AM</option><option>Tomorrow, 5 PM</option></select></label>
          <button className="btn gold full" disabled={!valid}>Book video call</button>
        </form>
      )}
    </div></div>
  );
}
