import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-[100vw] h-[100vh] absolute z-20">{children}</div>;
}
