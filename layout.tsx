import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Creovate — Discover creators',
  description: 'One place for creators and all their social accounts.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
