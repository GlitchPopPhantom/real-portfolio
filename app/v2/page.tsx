"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  { id: "01", title: "Ray Blazer", path: "/Ray-Blazer" },
  { id: "02", title: "Kobo Pay", path: "/kobo-pay" },
  { id: "03", title: "Whiplash", path: "/whiplash" },
  { id: "04", title: "Coming Soon", path: "/" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" as const // <-- Adding "as const" fixes the TypeScript type widening error
    } 
  },
};

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans selection:bg-cyan-500">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-6">
            ADENIPEKUN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              ADETUNJI.
            </span>
          </h1>
          <p className="text-2xl text-slate-400 max-w-xl">
            Digital designer and developer specializing in high-fidelity motion interfaces and complex system architecture.
          </p>
        </motion.div>

        {/* Work Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link href={project.path} key={project.id}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
                className="aspect-square bg-slate-900 rounded-3xl p-8 flex flex-col justify-end border border-slate-800 hover:border-cyan-500 transition-colors group cursor-pointer"
              >
                <div className="text-cyan-400 font-mono mb-2 text-sm">{project.id} // PROJECT</div>
                <h3 className="text-4xl font-bold">{project.title}</h3>
                <div className="w-12 h-1 bg-white mt-4 group-hover:w-24 transition-all" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Footer / Contact */}
        <motion.footer variants={itemVariants} className="mt-32 border-t border-slate-800 pt-12 flex justify-between">
          <div className="font-mono text-slate-500">OPEN FOR COLLABORATION</div>
          <div className="text-right">
            <a href="mailto:hello@dev.com" className="text-4xl font-bold hover:text-cyan-400 transition-colors">hello@dev.com</a>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Portfolio;