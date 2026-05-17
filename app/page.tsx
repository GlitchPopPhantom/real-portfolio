"use client";

import React, { useEffect, useState } from "react";

type SkillChipProps = {
  text: string;
};

type Experience = {
  role: string;
  company: string;
  date: string;
  desc: string;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [activeSection, setActiveSection] =
    useState("experience");

  /* Typed loading animation */

  useEffect(() => {
    const fullText = "Loading...";
    let index = 0;

    const typingInterval =
      setInterval(() => {
        if (index < fullText.length) {
          setLoadingText(
            fullText.slice(
              0,
              index + 1
            )
          );

          index++;
        }
      }, 120);

    const finishTimeout =
      setTimeout(() => {
        clearInterval(
          typingInterval
        );

        setLoading(false);
      }, 2200);

    return () => {
      clearInterval(
        typingInterval
      );

      clearTimeout(
        finishTimeout
      );
    };
  }, []);


  /* active nav tracking */

  useEffect(() => {
    if (loading) return;

    const sections =
      document.querySelectorAll(
        "section"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setActiveSection(
                  entry.target.id
                );
              }
            }
          );
        },
        {
          threshold: 0.35
        }
      );

    sections.forEach(
      (section) =>
        observer.observe(
          section
        )
    );

    return () => {
      sections.forEach(
        (section) =>
          observer.unobserve(
            section
          )
      );
    };
  }, [loading]);


  /* cursor glow effect */

  const handleMouseMove = (
    e: React.MouseEvent<
      HTMLDivElement | HTMLAnchorElement
    >
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--x",
      `${
        e.clientX -
        rect.left
      }px`
    );

    e.currentTarget.style.setProperty(
      "--y",
      `${
        e.clientY -
        rect.top
      }px`
    );
  };


  const experience: Experience[] =
    [
      {
        role:
          "Backend Engineering Intern",

        company:
          "Nigerian Breweries PLC",

        date:
          "Mar — Sep 2024",

        desc:
          "Revitalized internal logistics dashboards using React and TypeScript. Reduced page load times by 35%."
      },

      {
        role:
          "Software Engineering Intern",

        company:
          "Lagos State Ministry of Science and Technology",

        date:
          "July — Sep 2023",

        desc:
          "Built citizen-facing web systems using modular frontend architecture."
      }
    ];


  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "C++",
    "Django",
    "Node.js",
    "Tailwind",
    "Raylib",
    "WebSockets"
  ];


  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">

        <div className="text-[#00FF41] text-3xl flex items-center">

          {loadingText}

          <span
            className="
            ml-[2px]
            animate-pulse
            inline-block
          "
          >
            |
          </span>

        </div>

      </div>
    );
  }


  return (
    <>
      {/* scanlines */}

      <div
        className="
        pointer-events-none
        fixed
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.15)_51%)]
        bg-[length:100%_4px]
      "
      />

      <div className="bg-black text-[#00FF41] font-mono min-h-screen">

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row">

          {/* left */}

          <header
            className="
            lg:w-[40%]
            lg:h-screen
            lg:sticky
            lg:top-0
            py-24
            flex
            flex-col
            justify-between
          "
          >
            <div>

              <h1 className="text-white text-5xl font-bold">

                Adenipekun Adetunji

              </h1>

              <h2 className="mt-4 text-xl">

                Fullstack Engineer |
                Systems & Architecture

              </h2>

              <p className="mt-6 max-w-xs text-[#00FF41]/60">

                Architecting scalable
                high-concurrency web
                systems with React
                and Django.

              </p>


              <nav className="hidden lg:block mt-16">

                <ul className="space-y-4 text-xs uppercase tracking-[0.3em]">

                  {[
                    "experience",
                    "projects",
                    "skills"
                  ].map(
                    (
                      section
                    ) => (
                      <li
                        key={
                          section
                        }
                      >
                        <a
                          href={`#${section}`}
                          className={`transition-all duration-300 ${
                            activeSection ===
                            section
                              ? "text-white"
                              : "opacity-50 hover:opacity-100"
                          }`}
                        >
                          —— {section}
                        </a>
                      </li>
                    )
                  )}

                </ul>

              </nav>

            </div>


            <div className="text-xs opacity-50 space-y-1">

              <p>
                [ STATUS ]
                ONLINE
              </p>

              <p>
                [ REGION ]
                LAGOS-NG
              </p>

              <p>
                [ BUILD ]
                2026.05
              </p>

            </div>

          </header>


          {/* right */}

          <main className="lg:w-[60%] py-24 max-w-3xl">

            <section
              id="experience"
              className="mb-28 scroll-mt-20"
            >

              <h3 className="mb-8 uppercase text-sm tracking-[0.3em]">

                Experience

              </h3>

              {experience.map(
                (
                  job
                ) => (
                  <div
                    key={
                      job.role
                    }
                    onMouseMove={
                      handleMouseMove
                    }
                    style={{
                      background:
                        "radial-gradient(600px circle at var(--x) var(--y), rgba(0,255,65,.08), transparent 40%)"
                    }}
                    className="mb-8 p-6 rounded-2xl border border-[#00FF41]/10 hover:border-[#00FF41]/30 transition-all"
                  >

                    <div className="flex flex-col sm:flex-row justify-between">

                      <h4 className="text-white">

                        {job.role}
                        {" — "}
                        {
                          job.company
                        }

                      </h4>

                      <span className="text-xs opacity-50">

                        {
                          job.date
                        }

                      </span>

                    </div>

                    <p className="mt-4 text-sm text-[#00FF41]/60">

                      {
                        job.desc
                      }

                    </p>

                  </div>
                )
              )}

            </section>


            <section
              id="projects"
              className="mb-28 scroll-mt-20"
            >

              <h3 className="mb-8 uppercase text-sm tracking-[0.3em]">

                Projects

              </h3>

              <a
                href="https://github.com/GlitchPopPhantom/Qboid"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={
                  handleMouseMove
                }
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x) var(--y), rgba(0,255,65,.08), transparent 40%)"
                }}
                className="block p-6 rounded-2xl border border-[#00FF41]/10 bg-[#00FF41]/[0.02] hover:border-[#00FF41] hover:scale-[1.02] transition-all"
              >

                <h4 className="text-xl text-white mb-3">

                  Qboid —
                  Modular Combat Engine

                </h4>

                <p className="mb-5 text-[#00FF41]/60">

                  Built a modular
                  C++ combat engine
                  with projectiles,
                  physics systems
                  and live tuning.

                </p>

                <div className="flex flex-wrap gap-2">

                  {[
                    "C++",
                    "Raylib",
                    "Physics",
                    "Combat"
                  ].map(
                    (
                      skill
                    ) => (
                      <SkillChip
                        key={
                          skill
                        }
                        text={
                          skill
                        }
                      />
                    )
                  )}

                </div>

              </a>

            </section>


            <section
              id="skills"
            >

              <h3 className="mb-8 uppercase text-sm tracking-[0.3em]">

                Skills

              </h3>

              <div className="flex flex-wrap gap-3">

                {skills.map(
                  (
                    skill
                  ) => (
                    <SkillChip
                      key={
                        skill
                      }
                      text={
                        skill
                      }
                    />
                  )
                )}

              </div>

            </section>

          </main>

        </div>

      </div>
    </>
  );
}


function SkillChip({
  text
}: SkillChipProps) {
  return (
    <span className="px-3 py-1 rounded-full text-xs border border-[#00FF41]/20 bg-[#00FF41]/5">

      {text}

    </span>
  );
}
