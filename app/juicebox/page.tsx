"use client";

import { useRouter } from "next/navigation";
import InstrumentForge from "@/components/InstrumentForge";

export default function JuiceboxPage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-black p-6">

      <button
        onClick={()=>{
          router.push("/?portfolio=true");
        }}

        className="
        border
        border-[#00FF41]/30
        px-4
        py-2
        text-[#00FF41]
        font-mono
        mb-4
        hover:bg-[#00FF41]/10
        "
      >
        ← Back
      </button>

      <InstrumentForge/>

    </main>

  );

}
