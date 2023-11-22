import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import LeftNavigationbar from '@/components/Leftnavigationbar';
import MyHeader from '@/components/MyHeader';
import Providers from './providers';

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  variable: '--font-pretendard',
});
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} bg-zinc-100`}>
        <MyHeader />
        <LeftNavigationbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
