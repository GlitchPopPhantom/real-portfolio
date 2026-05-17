"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("experience");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--x",
      `${e.clientX - rect.left}px`
    );

    e.currentTarget.style.setProperty(
      "--y",
      `${e.clientY - rect.top}px`
    );
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-[#00FF41]">

        <div className="text-2xl flex items-center">

          Loading...

          <span className="ml-1 animate-pulse">
            _
          </span>

        </div>

      </div>
    );
  }

  return (
    <>
      <div
        className="
        pointer-events-none
        fixed
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(
        to_bottom,
        transparent_50%,
        rgba(0,255,65,0.15)_51%
        )]
        bg-[length:100%_4px]
        "
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row min-h-screen bg-black font-mono text-[#00FF41] scroll-smooth">

        {/* LEFT */}

        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-between lg:py-24">

          <div>

            <h1 className="text-[#d7ffd9] text-4xl font-bold tracking-tight sm:text-5xl">
              Adenipekun Adetunji
            </h1>

            <h2 className="mt-3 text-lg sm:text-xl">
              Fullstack Engineer | Systems & Architecture
            </h2>

            <p className="mt-4 max-w-xs leading-relaxed text-[#00FF41]/55">
              Architecting scalable high-concurrency web
              applications with React and Django.
            </p>

            <nav className="hidden lg:block mt-16">

              <ul className="space-y-3 uppercase text-xs tracking-[0.3em]">

                {[
                  "experience",
                  "projects",
                  "skills"
                ].map((section)=>(
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className={`
                      transition-all
                      duration-300
                      ${
                        activeSection===section
                        ? "text-white"
                        : "opacity-50 hover:opacity-100"
                      }
                      `}
                    >
                      —— {section}
                    </a>
                  </li>
                ))}

              </ul>

            </nav>

          </div>

          <div className="mt-8 text-xs opacity-50 space-y-1">

            <p>[ STATUS ] ONLINE</p>
            <p>[ REGION ] LAGOS-NG</p>
            <p>[ BUILD ] 2026.05</p>

          </div>

        </header>


        {/* RIGHT */}

        <main className="lg:w-[60%] lg:py-24 max-w-3xl">

          <section
            id="experience"
            className="mb-24 scroll-mt-20"
          >

            <h3 className="uppercase tracking-widest text-sm font-bold mb-8 lg:hidden">
              Experience
            </h3>


            {[
              {
                role:"Backend Engineering Intern",
                company:"Nigerian Breweries PLC",
                date:"Mar — Sep 2024",
                desc:"Spearheaded logistics dashboard modernization with React/TypeScript. Reduced heavy visualization load times by 35%."
              },
              {
                role:"Software Engineering Intern",
                company:"Lagos State Ministry of Science and Technology",
                date:"July — Sep 2023",
                desc:"Built citizen-facing web platforms with modular architecture and accessibility principles."
              }

            ].map((job)=>(
              <div
                key={job.role}
                onMouseMove={handleMouseMove}
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x) var(--y), rgba(0,255,65,.08), transparent 40%)"
                }}
                className="
                mb-12
                p-5
                rounded-xl
                border
                border-[#00FF41]/10
                transition-all
                hover:border-[#00FF41]/30
                "
              >

                <div className="flex justify-between flex-col sm:flex-row">

                  <h4 className="text-white">

                    {job.role}
                    {" — "}
                    {job.company}

                  </h4>

                  <span className="opacity-50 text-xs">
                    {job.date}
                  </span>

                </div>

                <p className="mt-4 text-sm text-[#00FF41]/55 leading-relaxed">

                  {job.desc}

                </p>

              </div>
            ))}

          </section>



          <section
            id="projects"
            className="mb-24 scroll-mt-20"
          >

            <h3 className="uppercase tracking-widest text-sm mb-8">
              Selected Projects
            </h3>


            <a
              href="https://github.com/GlitchPopPhantom/Qboid"
              target="_blank"
              rel="noreferrer"
              onMouseMove={handleMouseMove}
              style={{
                background:
                  "radial-gradient(600px circle at var(--x) var(--y), rgba(0,255,65,.08), transparent 40%)"
              }}
              className="
              block
              p-6
              mb-12
              rounded-xl
              border
              border-[#00FF41]/10
              bg-[#00FF41]/[0.02]
              hover:border-[#00FF41]
              hover:scale-[1.02]
              transition-all
              "
            >

              <h4 className="text-xl font-semibold text-white mb-3">
                Qboid — Modular Combat Engine
              </h4>

              <p className="opacity-70 leading-relaxed mb-5">

                Built a custom C++ combat engine with
                projectile systems, attack editing,
                recoil physics, tuning tools and
                modular architecture.

              </p>

              <div className="flex flex-wrap gap-2">

                {[
                  "C++",
                  "Raylib",
                  "Physics",
                  "Combat",
                  "Game Systems"
                ].map(skill=>(

                  <SkillChip
                    key={skill}
                    text={skill}
                  />

                ))}

              </div>

            </a>

          </section>


          <section
            id="skills"
            className="scroll-mt-20"
          >

            <h3 className="uppercase tracking-widest text-sm mb-8">
              Technical Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "React",
                "Next.js",
                "TypeScript",
                "Django",
                "Node",
                "C++",
                "Python",
                "WebSockets",
                "Raylib",
                "Tailwind"
              ].map(skill=>(

                <SkillChip
                  key={skill}
                  text={skill}
                />

              ))}

            </div>

          </section>

        </main>

      </div>
    </>
  );
}

function SkillChip({text}) {

  return (

    <span
      className="
      px-3
      py-1
      rounded-full
      text-xs
      border
      border-[#00FF41]/20
      bg-[#00FF41]/5
      "
    >
      {text}
    </span>

  );
}
