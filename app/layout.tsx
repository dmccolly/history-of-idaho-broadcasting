import React from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

export const metadata = {
  title: 'Boise Radio History',
  description: 'Exploring the rich history of radio broadcasting in Boise, Idaho',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}