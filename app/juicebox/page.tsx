"use client";

import InstrumentForge from "@/components/InstrumentForge";
import Link from "next/link";

export default function JuiceboxHome() {

  return (

    <main className="
      min-h-screen
      bg-black
      p-4
      text-white
      relative
    ">

      {/* Back button */}

      <Link
        href="/"
        className="
        absolute
        top-6
        left-6
        border
        border-[#00FF41]/30
        px-4
        py-2
        text-[#00FF41]
        hover:bg-[#00FF41]/10
        transition-all
        font-mono
        "
      >
        ← Back
      </Link>


      <div className="
        flex
        justify-center
        items-center
        min-h-screen
      ">

        <div className="
          w-full
          max-w-6xl
        ">

          <InstrumentForge/>

        </div>

      </div>


      <footer
        className="
        text-center
        text-[10px]
        text-[#00FF41]
        opacity-40
        font-mono
        pb-6
        "
      >

        JUICEBOX ENGINE // CORE_V1.0

      </footer>

    </main>

  );

}
