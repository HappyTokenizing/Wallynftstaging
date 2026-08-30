import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wally Club — RWA Foundation',
  description:
    'A mission-driven 1,000-piece NFT collection supporting the RWA Foundation and fair onchain markets for everyone.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
