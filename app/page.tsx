'use client';

import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

function Splash() {
  return (
    <div className="app-center">
      <div className="splash-card">
        <div className="splash-title">G-Squad</div>
        <div className="splash-sub">Deriv Auto Trading Bot</div>
        <div style={{ marginTop: '1rem' }} className="small-muted">Preparing dashboard...</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 6000); // 6 seconds
    return () => clearTimeout(t);
  }, []);

  return showSplash ? <Splash /> : <Dashboard />;
}
