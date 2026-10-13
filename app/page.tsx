export default function HomePage() {
  return (
    <main style={{ padding: '3rem', fontFamily: 'sans-serif' }}>
      <h1>G-Squad</h1>
      <p>Deriv Auto Trading Bot</p>
      <p>
        This project is a Next.js application for the G-Squad Deriv trading workflow,
        including OAuth authorization, account access, and real-time market connectivity.
      </p>
      <ul>
        <li>Deriv OAuth integration</li>
        <li>Account and token management</li>
        <li>WebSocket market access</li>
        <li>Auto trading bot execution layer</li>
      </ul>
    </main>
  );
}
