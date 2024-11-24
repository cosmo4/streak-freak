import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from '../app/components/Header';

// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



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
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-8 bg-blue-50 min-h-screen`}
      >
        <Header />
        <main>
          {children}
        </main>
      </body>
    </UserProvider>
    </html>
  );
}