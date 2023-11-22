import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MemberDetailPage',
  description: 'MemberDetail Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full ml-[18vw] py-16">{children}</div>;
}
