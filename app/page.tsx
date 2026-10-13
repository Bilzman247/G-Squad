'use client';

import { useEffect, useState } from 'react';

type RiskKind = 'low' | 'medium' | 'high';
type ContractKind = 'rise' | 'fall';

type BotState = {
  running: boolean;
  stake: number;
  risk: RiskKind;
  contract: ContractKind;
  symbol: string;
  status: string;
  startedAt: string | null;
  lastTickAt: string | null;
};

export default function Dashboard() {
  const [stake, setStake] = useState<number>(1);
  const [risk, setRisk] = useState<RiskKind>('medium');
  const [contract, setContract] = useState<ContractKind>('rise');
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<string>('Bot idle');
  const [isLoading, setIsLoading] = useState(false);

  async function refreshStatus() {
    try {
      const res = await fetch('/api/bot/status');
      const data = await res.json();
      const state: BotState = data.state ?? {
        running: false,
        stake: 1,
        risk: 'medium',
        contract: 'rise',
        symbol: 'Volatility 100 (1s) Index',
        status: 'Idle',
        startedAt: null,
        lastTickAt: null,
      };
      setRunning(Boolean(state.running));
      setStake(Number(state.stake) || 1);
      setRisk(state.risk ?? 'medium');
      setContract(state.contract ?? 'rise');
      setMessage(state.status ?? 'Bot idle');
    } catch {
      setMessage('Bot status unavailable');
    }
  }

  useEffect(() => {
    refreshStatus();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      refreshStatus();
    }, 2000);
    return () => clearInterval(timer);
  }, [running]);

  async function startBot() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bot/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stake, risk, contract }),
      });
      const data = await res.json();
      setRunning(Boolean(data.state?.running));
      setMessage(data.message ?? 'Bot started');
      await refreshStatus();
    } catch {
      setMessage('Failed to start bot');
    } finally {
      setIsLoading(false);
    }
  }

  async function stopBot() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bot/stop', { method: 'POST' });
      const data = await res.json();
      setRunning(false);
      setMessage(data.message ?? 'Bot stopped');
      await refreshStatus();
    } catch {
      setMessage('Failed to stop bot');
    } finally {
      setIsLoading(false);
    }
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
          <select value={risk} onChange={(e) => setRisk(e.target.value as RiskKind)}>
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
          <button className="btn" onClick={startBot} disabled={isLoading || running || stake <= 0}>Start Bot</button>
          <button className="btn btn-stop" onClick={stopBot} disabled={isLoading || !running}>Stop Bot</button>
        </div>

        <div className="status">{message}</div>
        <div style={{ marginTop: '0.5rem' }} className="small-muted">Fixed symbol: Volatility 100 (1s) Index — Contract types: Rise / Fall</div>
        <div style={{ marginTop: '1rem' }} className="small-muted">Strategy details are intentionally hidden from the UI.</div>
      </div>
    </div>
  );
}
