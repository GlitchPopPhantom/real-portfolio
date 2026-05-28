"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function FuzzyLogic() {
  const [bgOffset, setBgOffset] = useState(0);
  
  // Refs to handle smooth interpolation (lerping)
  const requestRef = useRef<number | null>(null);
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      
      // Update our target destination
      targetOffset.current -= delta * 0.4; 
      lastScrollY.current = currentScrollY;
    };

    // Animation frame loop to continuously smooth out the position change
    const updateAnimation = () => {
      // Lerp formula: Current = Current + (Target - Current) * EaseFactor
      // 0.08 adds a beautiful, fluid easing effect
      currentOffset.current += (targetOffset.current - currentOffset.current) * 0.08;
      
      setBgOffset(currentOffset.current);
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <main className="min-h-[160vh] bg-[#050505] text-[#E0E0E0] font-mono p-8 selection:bg-orange-500/30 overflow-x-hidden relative">
      {/* Endless White Mesh Grid - Now silky smooth via RequestAnimationFrame */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15]" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '75px 75px',
          backgroundPositionX: `${bgOffset}px`,
          willChange: 'background-position' // Optimizes GPU rendering performance
        }} 
      />

      {/* Header navbar */}
      <header className="relative z-10 flex justify-between items-center pb-6 mb-24">
        <div className="text-xl font-bold tracking-widest text-orange-500">RAY BLAZER</div>
        <nav className="flex gap-8 text-xs uppercase tracking-tighter opacity-60">
          <span>[ENGINE_CORE]</span>
          <span>[WEB_PROTOCOLS]</span>
          <span>[TERMINAL_ACCESS]</span>
        </nav>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto">
        
        {/* Hero Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-40 items-start">
          
          {/* Hero Left: Branding */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h1 className="text-7xl sm:text-8xl font-black tracking-tighter leading-none mb-8">
              ENGINEERING<br />
              <span className="text-orange-500">INTERACTIVE</span><br />
              SYSTEMS
            </h1>
            <div className="h-[2px] w-24 bg-orange-500 mb-8" />
            <p className="text-xl text-white/70 max-w-xl leading-relaxed">
              RAY BLAZER operates at the intersection of game engine deployment and heavy-concurrency web design. We deploy logic frameworks that handle complex asset pipelines and real-time state synchronization seamlessly.
            </p>
          </motion.div>

          {/* Hero Right: Diagnostic Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 bg-[#0d0d0f]/90 backdrop-blur-sm border border-white/10 rounded p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 text-xs tracking-widest opacity-50">
              <span>SYSTEM_MONITOR // STATUS: ACTIVE</span>
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-orange-500">[SYS_INIT]</span>
                <span className="text-white/40">INITIALIZING CORE VECTOR_MATH_ENG</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-orange-500">[WEB_PIPE]</span>
                <span className="text-white/80">WS_CONN_ESTABLISHED (PING: 14ms)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-orange-500">[RENDERER]</span>
                <span className="text-emerald-400">VULKAN_PIPELINE COMPRESSED // 144 FPS</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-orange-500">[COMPILER]</span>
                <span className="text-white/40">OPTIMIZING NEXTJS HYDRATION ROUTERS</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex gap-4 text-center">
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-2 rounded">
                <div className="text-[10px] text-white/40">WEB STACK</div>
                <div className="text-sm font-bold text-white/90">v16.1.6</div>
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-2 rounded">
                <div className="text-[10px] text-white/40">SIM ENGINE</div>
                <div className="text-sm font-bold text-orange-400">RAY_CORE_V2</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Segment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-8">
          {[
            { tag: "01", title: "GAME_ENGINE", desc: "Performance-optimized combat systems, physics simulation, and entity-component architecture layouts." },
            { tag: "02", title: "WEB_STACK", desc: "High-concurrency web portals, heavy-duty server clusters, and highly interactive frontend visualization dashboards." },
            { tag: "03", title: "SIMULATION", desc: "Probabilistic computational rendering and data modeling for real-time generative feedback patterns." }
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="text-orange-500 text-xs mb-3 group-hover:translate-x-1 transition-transform inline-block">{item.tag}</div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}