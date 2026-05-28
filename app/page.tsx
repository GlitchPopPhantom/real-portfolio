"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  },
};

// Add your preferred image path or remote URL to the imageSrc strings below
const projectData = [
  {
    title: "Alternate Portfolio",
    subtitle: "TypeScript, React, Next.js, Framer",
    description: "Just in case this particular website is not to your liking. Or you're just interested in seeing the same thing being pitched to you in a new way.",
    path: "/v2",
    isExternal: false,
    imageSrc: "/images/z4", 
  },
  {
    title: "Kobo Pay",
    subtitle: "Global Financial Orchestration",
    description: "A secure cross-border ledger and processing router engineering low-latency multi-currency clearing pipelines alongside strict real-time transaction tracking modules.",
    path: "/kobo-pay",
    isExternal: false,
    imageSrc: "/images/z3",
  },
  {
    title: "Whiplash",
    subtitle: "Workflow Automation SaaS Platform",
    description: "An enterprise workflow distribution motor running event-driven worker chains to streamline background data sanitization, API syncing, and recursive script tasks.",
    path: "/whiplash",
    isExternal: false,
    imageSrc: "/images/z2",
  },
  {
    title: "Ray Blazer",
    subtitle: "High-Fidelity Engineering Concept",
    description: "An interactive architectural showcase leveraging advanced WebGL elements, high-density matrix transformations, and fine-tuned responsive math configurations.",
    path: "/ray-blazer",
    isExternal: false,
    imageSrc: "/images/z1",
  },
  {
    title: "Juicebox",
    subtitle: "Interactive Audio Workstation",
    description: "An in-browser digital audio workstation enabling modular sound synthesis, real-time audio manipulation, and visual node-mapping built entirely with the Web Audio API.",
    path: "/juicebox",
    isExternal: false,
    imageSrc: "/images/z6",
  },
  {
    title: "Qboid ↗",
    subtitle: "Modular Combat Engine",
    description: "An isolated vector collision environment written in raw canvas code to map directional force arrays, complex hitboxes, and systemic combat behavior trees.",
    path: "https://github.com/GlitchPopPhantom/Qboid",
    isExternal: true,
    imageSrc: "/images/z7",
  },
];

function MainPortfolio() {
  const searchParams = useSearchParams();
  const isPortfolio = searchParams.get("portfolio") === "true";

  const [loading, setLoading] = useState(!isPortfolio);
  const [loadingText, setLoadingText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const [hi, setHi] = useState(isPortfolio ? "Hi" : "");
  const [im, setIm] = useState(isPortfolio ? "I'm" : "");
  const [firstName, setFirstName] = useState(isPortfolio ? "Adenipekun" : "");
  const [lastName, setLastName] = useState(isPortfolio ? "Adetunji" : "");

  const [highlight, setHighlight] = useState(isPortfolio);
  const [showButton, setShowButton] = useState(isPortfolio);
  const [showPortfolio, setShowPortfolio] = useState(isPortfolio);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeText(text: string, setter: React.Dispatch<React.SetStateAction<string>>) {
    for (let i = 0; i <= text.length; i++) {
      setter(text.slice(0, i));
      await sleep(90);
    }
  }

  async function backspace(text: string, setter: React.Dispatch<React.SetStateAction<string>>) {
    for (let i = text.length; i >= 0; i--) {
      setter(text.slice(0, i));
      await sleep(50);
    }
  }

  useEffect(() => {
    if (isPortfolio) return;

    async function run() {
      await typeText("Loading", setLoadingText);

      for (let i = 0; i < 6; i++) {
        setCursorVisible((v) => !v);
        await sleep(250);
      }
      setCursorVisible(true);

      await backspace("Loading", setLoadingText);
      setLoading(false);

      await sleep(300);
      await typeText("Hi", setHi);

      await sleep(300);
      await typeText("I'm", setIm);

      await sleep(300);
      await typeText("Adenipekun", setFirstName);

      await sleep(300);
      await typeText("Adetunji", setLastName);

      await sleep(1000);
      setHighlight(true);

      await sleep(1500);
      setShowButton(true);
    }

    run();
  }, [isPortfolio]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-[#00FF41] font-mono">
        <div className="relative text-5xl w-[9ch]">
          {loadingText}
          <span className="absolute left-[8ch]">
            {cursorVisible ? "|" : " "}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-[#00FF41] font-mono min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row">
        
        <header
          className={`h-screen sticky top-0 flex flex-col transition-all duration-[1800ms] ${
            showPortfolio
              ? "lg:w-[40%] justify-start pt-18"
              : "w-full items-center justify-center"
          }`}
        >
          <div>
            <div className="text-5xl font-bold leading-tight">
              <div
                className={`transition-all duration-[2000ms] ${
                  showPortfolio ? "opacity-0 h-0 overflow-hidden" : ""
                } ${highlight ? "text-white" : "text-[#00FF41]"}`}
              >
                {hi}
              </div>

              <div
                className={`transition-all duration-[2000ms] ${
                  showPortfolio ? "opacity-0 h-0 overflow-hidden" : ""
                } ${highlight ? "text-white" : "text-[#00FF41]"}`}
              >
                {im}
              </div>

              <div
                className={`transition-colors duration-[1500ms] ${
                  showPortfolio ? "text-white" : "text-[#00FF41]"
                }`}
              >
                {showPortfolio ? `${firstName} ${lastName}` : firstName}
              </div>

              <div>
                {!showPortfolio &&
                  (highlight ? (
                    <>
                      Ade
                      <span className="text-white transition-colors duration-[2500ms]">
                        tunji
                      </span>
                    </>
                  ) : (
                    lastName
                  ))}
              </div>
            </div>

            {showButton && !showPortfolio && (
              <button
                onClick={() => setShowPortfolio(true)}
                className="mt-16 border border-[#00FF41]/30 px-6 py-3 hover:bg-[#00FF41]/10 transition-all"
              >
                See my portfolio
              </button>
            )}

            {showPortfolio && (
              <>
                <p className="mt-8 text-lg font-bold text-white">
                  Software Engineer
                </p>

                <p className="mt-4 max-w-xs opacity-70 text-sm leading-relaxed">
                  Performance-driven engineer specializing in scalable architecture, React, and Django backends.
                </p>

                <nav className="mt-12">
                  <ul className="space-y-4 text-sm">
                    <li>
                      <a href="#about" className="hover:text-white transition-colors">
                        —— ABOUT
                      </a>
                    </li>
                    <li>
                      <a href="#experience" className="hover:text-white transition-colors">
                        —— EXPERIENCE
                      </a>
                    </li>
                    <li>
                      <a href="#skills" className="hover:text-white transition-colors">
                        —— SKILLS
                      </a>
                    </li>
                    <li>
                      <a href="#projects" className="hover:text-white transition-colors">
                        —— PROJECTS
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="mt-8 text-sm opacity-60">
                  <p className="mb-2">+234 906 470 7767</p>
                  <p>tunjiadenipekun@gmail.com</p>
                </div>
              </>
            )}
          </div>
        </header>

        <main
          className={`transition-all duration-[1500ms] ${
            showPortfolio
              ? "lg:w-[60%] opacity-100 py-24"
              : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          {/* ABOUT SECTION */}
          <section id="about" className="mb-28">
            <h2 className="text-white mb-8 text-xl font-bold">ABOUT</h2>
            <p className="opacity-80 leading-relaxed">
              Performance-driven Backend Engineer specializing in architecting scalable, high-concurrency web applications. With a foundation in React and deep expertise in bridging the gap between sophisticated UI/UX and robust Django-based backends, I focus on building optimized, accessible, and maintainable digital products. I specialize in turning complex architectural requirements into fluid, low-latency user experiences through advanced state management, modular component design, and rigorous performance engineering.
            </p>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="mb-28">
            <h2 className="text-white mb-8 text-xl font-bold">EXPERIENCE</h2>
            
            <div className="mb-12">
              <h3 className="text-white text-lg mb-1">Frontend Engineering Intern</h3>
              <div className="text-sm opacity-60 mb-4 tracking-wide">
                Nigerian Breweries PLC | Mar 2024 – Sept 2024
              </div>
              <ul className="list-disc pl-5 space-y-3 opacity-80 leading-relaxed">
                <li>Spearheaded the revitalization of internal logistics dashboards, replacing legacy interfaces with high-performance React/TypeScript modules.</li>
                <li>Optimized data-heavy visualizations for supply chain monitoring, reducing page load latency by 35% through advanced memoization and code-splitting strategies.</li>
                <li>Collaborated with stakeholders to implement a mobile-first UI for field distributors, significantly increasing data entry accuracy across the region.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg mb-1">Software Engineering Intern</h3>
              <div className="text-sm opacity-60 mb-4 tracking-wide">
                Lagos State Ministry of Science and Technology | July 2023 – Sept 2023
              </div>
              <ul className="list-disc pl-5 space-y-3 opacity-80 leading-relaxed">
                <li>Engineered accessible, citizen-facing web portals using modern JavaScript frameworks, ensuring compliance with international web accessibility (WCAG) standards.</li>
                <li>Developed modular UI components for state-wide digital initiatives, facilitating a 50% faster rollout for subsequent government service modules.</li>
                <li>Optimized frontend security protocols and form handling for high-volume traffic during public service registration drives.</li>
              </ul>
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills" className="mb-28">
            <h2 className="text-white mb-8 text-xl font-bold">TECHNICAL SKILLS</h2>
            
            <div className="grid md:grid-cols-2 gap-8 opacity-80">
              <div>
                <h3 className="text-white mb-3">Languages & Core</h3>
                <p className="leading-relaxed">
                  TypeScript, JavaScript (ES6+), Python, C++, HTML5, CSS3/Sass <br/>
                  <span className="opacity-70 text-sm mt-1 block">Data Structures, Algorithms, Modular Architecture</span>
                </p>
              </div>

              <div>
                <h3 className="text-white mb-3">Frameworks & Libraries</h3>
                <p className="leading-relaxed">
                  React.js, Next.js, Tailwind CSS, Ember, Backbone, jQuery <br/>
                  <span className="opacity-70 text-sm mt-1 block">Django, Node.js, Express</span>
                </p>
              </div>

              <div>
                <h3 className="text-white mb-3">Architecture & UI Systems</h3>
                <p className="leading-relaxed">
                  UI/UX Design Systems, Figma, Accessibility (A11y/WCAG), Mobile-First Responsiveness <br/>
                  <span className="opacity-70 text-sm mt-1 block">Contentful, WordPress</span>
                </p>
              </div>

              <div>
                <h3 className="text-white mb-3">Tools & Infrastructure</h3>
                <p className="leading-relaxed">
                  Git/GitHub, REST APIs, CI/CD Pipelines, Agile/Scrum <br/>
                  <span className="opacity-70 text-sm mt-1 block">Cordova, Android Web App Development</span>
                </p>
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION (2x3 GRID) */}
          <section id="projects" className="space-y-6">
            <h2 className="text-white mb-8 text-xl font-bold">PROJECTS</h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {projectData.map((project, index) => (
                <motion.div key={index} variants={itemVariants} className="h-full">
                  {project.isExternal ? (
                    <a
                      href={project.path}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col h-full border border-[#00FF41]/20 hover:border-[#00FF41]/50 bg-black hover:bg-[#00FF41]/5 transition-all group overflow-hidden"
                    >
                      {/* Image Container */}
                      <div className="w-full h-40 bg-[#00FF41]/10 relative overflow-hidden border-b border-[#00FF41]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={project.imageSrc} 
                          alt={project.title}
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 filter grayscale sepia hue-rotate-[90deg] saturate-[200%]"
                        />
                      </div>
                      {/* Text Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-white text-lg mb-0.5 group-hover:text-[#00FF41] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[#00FF41]/60 text-[11px] mb-3 font-semibold tracking-wide uppercase">
                          {project.subtitle}
                        </p>
                        <p className="opacity-70 text-xs font-sans tracking-normal leading-relaxed flex-grow">
                          {project.description}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={project.path}
                      className="flex flex-col h-full border border-[#00FF41]/20 hover:border-[#00FF41]/50 bg-black hover:bg-[#00FF41]/5 transition-all group overflow-hidden"
                    >
                      {/* Image Container */}
                      <div className="w-full h-40 bg-[#00FF41]/10 relative overflow-hidden border-b border-[#00FF41]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={project.imageSrc} 
                          alt={project.title}
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 filter grayscale sepia hue-rotate-[90deg] saturate-[200%]"
                        />
                      </div>
                      {/* Text Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-white text-lg mb-0.5 group-hover:text-[#00FF41] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[#00FF41]/60 text-[11px] mb-3 font-semibold tracking-wide uppercase">
                          {project.subtitle}
                        </p>
                        <p className="opacity-70 text-xs font-sans tracking-normal leading-relaxed flex-grow">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MainPortfolio />
    </Suspense>
  );
}
