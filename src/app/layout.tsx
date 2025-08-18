import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/sections/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Otonom AI',
  description: 'Never miss a customer inquiry again. Our AI agent handles inbound messages, qualifies leads, and routes complex issues to your team.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
