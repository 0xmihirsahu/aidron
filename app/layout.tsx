import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { WalletProvider } from '@/components/wallet-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const title = 'Agenxy';
const description =
  'Affordable and Lightweight AI agents on Aptos. Build no code agents using Fast and Affordable Small Language Models in minutes.';
// TODO: Replace with your actual domain
const url = 'https://agenxy.live';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    // TODO: Add apple-touch-icon.png to public folder
    apple: '/favicon.png',
  },
  keywords: [
    'AI agents',
    'Aptos',
    'no-code',
    'Small Language Models',
    'SLM',
    'blockchain',
    'Web3',
    'AI',
    'Agents',
  ],
  authors: [{ name: 'AGENXY Team', url }],
  creator: 'AGENXY Team',
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: '/agenxy-name-black.svg', // In public folder
        width: 1200,
        height: 630,
        alt: description,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/agenxy-name-black.svg'], // In public folder
    // TODO: Replace with your Twitter handle
    creator: '@agenxy_ai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <WalletProvider>
          <Toaster richColors />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
