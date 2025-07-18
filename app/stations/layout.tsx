import React from 'react';
import HeaderClient from '../../components/ui/header-client';
import FooterClient from '../../components/ui/footer-client';

export default function StationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeaderClient />
      <main className="grow">
        {children}
      </main>
      <FooterClient />
    </div>
  );
}