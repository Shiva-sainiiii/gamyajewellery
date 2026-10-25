'use client';
import { useState } from 'react';
import { useStore } from './Store';
import { rateOf, inr } from '../lib/data';
export default function RateBoard() {
  const { rates } = useStore();
  const [w, setW] = useState(10);
  return (
    <div className="board">
      <h2>Today’s rates</h2>
      <table><tbody>
        {[24, 22, 18].map((k) => <tr key={k}><td>{k}K gold</td><td>{inr(rateOf(rates, k))} / g</td></tr>)}
        <tr><td>Silver</td><td>{inr(rates.silver)} / g</td></tr>
      </tbody></table>
      <label>Weight <input type="number" min="1" value={w} onChange={(e) => setW(Math.max(0, +e.target.value))} /> g of 22K gold</label>
      <p><b>{inr(w * rateOf(rates, 22))}</b> before making charges and GST</p>
      <small>Demo rates. The shop owner updates them from the admin page and every price changes.</small>
    </div>
  );
}
