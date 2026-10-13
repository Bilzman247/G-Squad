import './globals.css';

export const metadata = {
  title: 'G-Squad | Deriv Auto Trading Bot',
  description: 'A Next.js app for the G-Squad Deriv auto trading bot platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
