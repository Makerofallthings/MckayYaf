import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}