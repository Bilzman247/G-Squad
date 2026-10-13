'use client';

import { useEffect, useRef, useState } from 'react';

export default function Dashboard() {
  const [stake, setStake] = useState<number>(1);
  const [risk, setRisk] = useState<string>('medium');
  const [contract, setContract] = useState<'rise'|'fall'>('rise');
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<string>('');
  const tickRef = useRef<number | null>(null);
  const tradesRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (tickRef.current) {
        clearInterval(tickRef.current);
      }
    };
  }, []);

  function startBot() {
    if (running) return;
    setRunning(true);
    setMessage('Bot started');
    tradesRef.current = 0;
    // Simulate ticks or bot activity every 1s — this is only a placeholder.
    // Real trading logic is not exposed in the UI.
    tickRef.current = window.setInterval(() => {
      tradesRef.current += 1;
      setMessage(`Running — simulated trades: ${tradesRef.current}`);
    }, 1000);
  }

  function stopBot() {
    setRunning(false);
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    setMessage('Bot stopped');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>G-Squad Dashboard</h1>
        <div className="small-muted">Symbol: <strong>Volatility 100 (1s) Index</strong></div>
      </div>

      <div className="card">
        <div style={{ marginBottom: '1rem' }} className="small-muted">Trading mode: <strong>Auto</strong></div>

        <div className="form-row">
          <label>Stake amount</label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
          />
        </div>

        <div className="form-row">
          <label>Risk management</label>
          <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-row">
          <label>Contract</label>
          <div className="contracts">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" name="contract" checked={contract === 'rise'} onChange={() => setContract('rise')} />
              Rise
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" name="contract" checked={contract === 'fall'} onChange={() => setContract('fall')} />
              Fall
            </label>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={startBot} disabled={running || stake <= 0}>Start Bot</button>
          <button className="btn btn-stop" onClick={stopBot} disabled={!running}>Stop Bot</button>
        </div>

        <div className="status">{message}</div>
        <div style={{ marginTop: '0.5rem' }} className="small-muted">Fixed symbol: Volatility 100 (1s) Index — Contract types: Rise / Fall</div>

        <div style={{ marginTop: '1rem' }} className="small-muted">Strategy details are intentionally hidden from the UI.</div>
      </div>
    </div>
  );
}
