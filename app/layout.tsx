import Link from 'next/link';
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
            <Link href="/dashboard" aria-label="Go to dashboard" className="brand-wrap">
              <img src="/robot-logo.svg" alt="G-Squad logo" className="app-logo" />
              <div className="app-title">G-Squad</div>
            </Link>

            <nav className="header-actions" aria-label="Header actions">
              <Link href="/dashboard" className="btn header-btn">
                Log in
              </Link>
            </nav>
          </div>
        </header>

        <main className="app-main">{children}</main>

        <nav className="app-bottom-nav" aria-label="Bottom navigation">
          <Link href="/dashboard" className="nav-item">Dashboard</Link>
          <Link href="/trade" className="nav-item">Trade</Link>
          <Link href="/reports" className="nav-item">Reports</Link>
        </nav>
      </body>
    </html>
  );
}
