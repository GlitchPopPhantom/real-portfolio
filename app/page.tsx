export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row min-h-screen bg-black font-mono text-[#00FF41]">
      
      {/* LEFT SECTION (40% - Static/Sticky) */}
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-between lg:py-24">
        <div>
          <h1 className="text-white text-4xl font-bold tracking-tight sm:text-5xl">
            Adenipekun Adetunji
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight sm:text-xl">
            Fullstack Engineer | Systems & Architecture
          </h2>
          <p className="mt-4 max-w-xs leading-normal text-[#00FF41]/70">
            Architecting scalable, high-concurrency web applications with React & Django.
          </p>
          
          <nav className="hidden lg:block mt-16">
            <ul className="w-max uppercase tracking-widest text-xs font-bold">
              <li className="py-3 cursor-pointer hover:text-white">—— Experience</li>
              <li className="py-3 cursor-pointer hover:text-white opacity-50">—— Projects</li>
              <li className="py-3 cursor-pointer opacity-50">—— Skills</li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex items-center opacity-50 text-xs">
          System Status: Online | Buffer: 0x88234
        </div>
      </header>

      {/* RIGHT SECTION (60% - Scrolling) */}
      <main className="lg:w-[60%] lg:py-24">
        
        {/* RELEVANT EXPERIENCE */}
        <section id="experience" className="mb-24 scroll-mt-16">
          <h3 className="uppercase tracking-widest text-sm font-bold mb-8 lg:hidden">Experience</h3>
          
          <div className="group mb-12 transition-all">
            <div className="flex flex-col sm:flex-row justify-between mb-2">
              <h4 className="font-medium text-white">Backend Engineering Intern — Nigerian Breweries PLC</h4>
              <span className="text-xs uppercase opacity-50">Mar — Sep 2024</span>
            </div>
            <p className="text-sm leading-normal opacity-80">
              Spearheaded the revitalization of internal logistics dashboards, replacing legacy interfaces with high-performance React/TypeScript modules. Optimized data-heavy visualizations reducing page load latency by 35% through advanced memoization.
            </p>
          </div>

          <div className="group mb-12 transition-all">
            <div className="flex flex-col sm:flex-row justify-between mb-2">
              <h4 className="font-medium text-white">Software Engineering Intern — Lagos State Ministry of Science and Technology</h4>
              <span className="text-xs uppercase opacity-50">July — Sep 2023</span>
            </div>
            <p className="text-sm leading-normal opacity-80">
              Engineered accessible, citizen-facing web portals using modern JavaScript frameworks. Developed modular UI components for state-wide digital initiatives, facilitating a 50% faster rollout for government service modules.
            </p>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-24">
          <h3 className="uppercase tracking-widest text-sm font-bold mb-8">Selected Projects</h3>
          
          <div className="mb-12">
            <h4 className="text-white mb-2">Game Architecture & Interactive Systems</h4>
            <p className="text-sm opacity-80 mb-4">
              Developed multiple game engines exploring Shader Math and WebGL. Built complex state management systems to handle real-time UI updates in high-latency environments.
            </p>
            <div className="flex flex-wrap gap-2">
              {['WebGL', 'Shader Math', 'C++', 'JavaScript'].map(skill => (
                <span key={skill} className="px-3 py-1 text-[10px] rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20">{skill}</span>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-white mb-2">Advanced App Development (Capstone)</h4>
            <p className="text-sm opacity-80 mb-4">
              Architected a full-stack mobile application with offline-first synchronization and real-time WebSocket notifications. Maintained a 100/100 Lighthouse score.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'WebSockets', 'PWA'].map(skill => (
                <span key={skill} className="px-3 py-1 text-[10px] rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20">{skill}</span>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section id="skills" className="mb-24">
          <h3 className="uppercase tracking-widest text-sm font-bold mb-8">Technical Skills</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white mb-2 font-bold underline">Languages</p>
              <ul className="opacity-70">
                <li>TypeScript / JavaScript</li>
                <li>Python / C++</li>
                <li>HTML5 / CSS3</li>
              </ul>
            </div>
            <div>
              <p className="text-white mb-2 font-bold underline">Frameworks</p>
              <ul className="opacity-70">
                <li>React.js / Next.js</li>
                <li>Django / Node.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
