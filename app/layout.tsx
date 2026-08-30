import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wally Club — RWA Foundation',
  description:
    'A mission-driven 1,000-piece NFT collection supporting the RWA Foundation and fair onchain markets for everyone.',
  icons: {
    icon: '/wally-logo-mark.png',
    apple: '/wally-logo-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
