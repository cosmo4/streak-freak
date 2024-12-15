import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import Header from '../app/components/Header';

// app/layout.jsx


export const metadata: Metadata = {
  title: "Streak Freak",
  description: "Track your habits and get rewarded",
  icons: {
    icon: '/favicon-1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className="antialiased p-8 bg-blue-50 min-h-screen"
        >
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}