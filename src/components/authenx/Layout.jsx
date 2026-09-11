import React from 'react';
import { Outlet } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import Header from './Header';

export default function Layout() {
  return (
    <div className="relative min-h-screen text-slate-100">
      <AnimatedBackground />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6">
        <p className="label-mono text-center text-[10px] text-slate-500">
          AUTHENX · AI-Assisted Screening · Hackathon Prototype · Fictional/Mock Documents Only
        </p>
      </footer>
    </div>
  );
}