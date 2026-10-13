import './globals.css';

export const metadata = {
  title: 'G-Squad | Deriv Auto Trading Bot',
  description: 'A Next.js app for the G-Squad Deriv auto trading bot platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="app-header">
          <div className="header-inner">
            <img src="/robot-logo.svg" alt="G-Squad logo" className="app-logo" />
            <div className="app-title">G-Squad</div>
            <nav className="header-actions">
              <button className="btn header-btn">Log in</button>
            </nav>
          </div>
        </header>

        <main className="app-main">{children}</main>

        <nav className="app-bottom-nav" aria-label="Bottom navigation">
          <button className="nav-item">Dashboard</button>
          <button className="nav-item">Trade</button>
          <button className="nav-item">Reports</button>
        </nav>
      </body>
    </html>
  );
}
