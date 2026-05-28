"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 1. Added imageSrc to the array. 
// Make sure these match the exact filenames (with .png/.jpg) inside your public/images folder!
const projects = [
  { id: "_", title: "Ray Blazer", path: "/Ray-Blazer", imageSrc: "/images/z1.png" },
  { id: "_", title: "Kobo Pay", path: "/kobo-pay", imageSrc: "/images/z3.png" },
  { id: "_", title: "Whiplash", path: "/whiplash", imageSrc: "/images/z2.png" },
  { id: "_", title: "Terminal Based Portfolio", path: "/", imageSrc: "/images/z7.png" },
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
      ease: "easeOut" as const 
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
                // Added relative, overflow-hidden, and removed the solid bg-slate-900
                className="relative aspect-square rounded-3xl p-8 flex flex-col justify-end border border-slate-800 hover:border-cyan-500 transition-all group cursor-pointer overflow-hidden"
              >
                
                {/* 2. Image & Overlay Container */}
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.imageSrc} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Gradient overlay so the text pops */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Content Container (Needs relative z-10 to sit above the image) */}
                <div className="relative z-10">
                  <div className="text-cyan-400 font-mono mb-2 text-sm">{project.id} // PROJECT</div>
                  <h3 className="text-4xl font-bold drop-shadow-md">{project.title}</h3>
                  <div className="w-12 h-1 bg-white mt-4 group-hover:w-24 group-hover:bg-cyan-400 transition-all duration-300" />
                </div>

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
