// app/layout.tsx
import './globals.css';
import { Blinker } from 'next/font/google';

const blinker = Blinker({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Spaces',
  description: 'Find and book amazing spaces',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={blinker.className}>
        {children}
      </body>
    </html>
  );
}
