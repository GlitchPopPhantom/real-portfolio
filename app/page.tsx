"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

function MainPortfolio() {
  const searchParams = useSearchParams();
  const isPortfolio = searchParams.get("portfolio") === "true";

  // Initialize states based on the URL parameter
  const [loading, setLoading] = useState(!isPortfolio);
  const [loadingText, setLoadingText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // If ?portfolio=true, instantly fill in the words
  const [hi, setHi] = useState(isPortfolio ? "Hi" : "");
  const [im, setIm] = useState(isPortfolio ? "I'm" : "");
  const [firstName, setFirstName] = useState(isPortfolio ? "Adenipekun" : "");
  const [lastName, setLastName] = useState(isPortfolio ? "Adetunji" : "");

  // Instantly trigger highlights and buttons if bypassing intro
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
    // Abort the animation completely if we're bypassing it
    if (isPortfolio) return;

    async function run() {
      await typeText("Loading", setLoadingText);

      // blink 3x
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
              ? "lg:w-[40%] justify-start pt-24"
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
                <p className="mt-8 text-lg">
                  Fullstack Engineer | Systems & Architecture
                </p>

                <p className="mt-6 max-w-xs opacity-70">
                  Architecting scalable high-concurrency web applications with
                  React & Django.
                </p>

                <nav className="mt-16">
                  <ul className="space-y-6 text-sm">
                    <li>
                      <a href="#about" className="hover:text-white">
                        —— ABOUT
                      </a>
                    </li>
                    <li>
                      <a href="#experience" className="hover:text-white">
                        —— EXPERIENCE
                      </a>
                    </li>
                    <li>
                      <a href="#projects" className="hover:text-white">
                        —— PROJECTS
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="mt-32 text-sm opacity-60">
                  <p>tunjiadenipekun@gmail.com</p>
                  <p className="mt-2">+234 906 470 7767</p>
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
          <section id="about" className="mb-28">
            <h2 className="text-white mb-6">ABOUT</h2>
            <p className="opacity-70 leading-relaxed">
              Fullstack engineer focused on modular systems, interactive software
              and scalable architecture.
            </p>
          </section>

          <section id="experience" className="mb-28">
            <h2 className="text-white mb-6">EXPERIENCE</h2>
            <div className="mb-16">
              Backend Engineering Intern — Nigerian Breweries PLC
            </div>
            <div>Software Engineering Intern — Lagos State Ministry</div>
          </section>

          <section id="projects">
            <h2 className="text-white mb-6">PROJECTS</h2>
            
            {/* Navigates cleanly over to the juicebox page */}
            <Link
              href="/juicebox"
              className="block p-5 border border-[#00FF41]/20 hover:bg-[#00FF41]/10 transition-all mb-6"
            >
              Juicebox — Interactive Audio Workstation
            </Link>

            <a
              href="https://github.com/GlitchPopPhantom/Qboid"
              target="_blank"
              rel="noreferrer"
              className="block mb-6 p-5 border border-[#00FF41]/20 hover:bg-[#00FF41]/10 transition-all"
            >
              Qboid — Modular Combat Engine
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}

// Next.js requires components utilizing `useSearchParams` to be wrapped in a 
// Suspense boundary so they do not break static rendering builds.
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MainPortfolio />
    </Suspense>
  );
}
```</Suspense>
