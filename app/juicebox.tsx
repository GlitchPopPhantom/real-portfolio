"use client";
import InstrumentForge from '@/components/InstrumentForge';

export default function JuiceboxHome() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* This is the heart of the site */}
      <div className="w-full max-w-4xl">
        <InstrumentForge />
      </div>
      
      <footer className="mt-8 text-[10px] font-mono text-[#00FF41] opacity-40">
        JUICEBOX ENGINE // CORE_V1.0
      </footer>
    </main>
  );
}
