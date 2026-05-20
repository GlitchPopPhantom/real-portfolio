"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Upload, Play } from "lucide-react";

interface Note {
  id: string;
  note: string;
  start: number;
  duration: number;
}

export default function InstrumentForge() {
  const [isEngineStarted, setIsEngineStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(120);

  const [fileName, setFileName] = useState("");
  const [instName, setInstName] = useState("");

  const [currentNotes, setCurrentNotes] = useState<Note[]>([]);

  const [instruments, setInstruments] = useState<
    {
      name: string;
      sampler: Tone.Sampler;
    }[]
  >([]);

  const [activeInstIdx, setActiveInstIdx] = useState(0);

  const player = useRef<Tone.Player | null>(null);

  const partRef = useRef<Tone.Part | null>(null);

  const NOTES = [
    "C6","B5","A#5","A5","G#5","G5","F#5","F5",
    "E5","D#5","D5","C#5",
    "C5","B4","A#4","A4","G#4","G4","F#4","F4",
    "E4","D#4","D4","C#4",
    "C4","B3","A#3","A3","G#3","G3","F#3","F3",
    "E3","D#3","D3","C3"
  ];

  const COLORS = [
    "#D1107A",
    "#A810D1",
    "#5F10D1",
    "#102AD1",
    "#1088D1",
    "#10D1B5",
    "#10D11A",
    "#94D110",
    "#F7E60A",
    "#F2A10D",
    "#E36210",
    "#D11010"
  ];

  const startEngine = async () => {
    await Tone.start();

    Tone.Transport.bpm.value = bpm;

    setIsEngineStarted(true);
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);

    setFileName(
      file.name.split(".")[0]
    );

    if (player.current) {
      player.current.dispose();
    }

    player.current = new Tone.Player(
      url,
      () => {
        setLoaded(true);
      }
    ).toDestination();
  };

  const captureInstrument = () => {
    if (!player.current || !loaded) return;

    const buffer =
      player.current.buffer.get();

    if (!buffer) return;

    const sampler =
      new Tone.Sampler({
        urls: {
          C4: buffer
        }
      }).toDestination();

    setInstruments(prev => [
      ...prev,
      {
        name:
          instName ||
          fileName,
        sampler
      }
    ]);

    setInstName("");
  };

  const addNote = (
    note: string,
    step: number
  ) => {

    setCurrentNotes(prev => [
      ...prev,
      {
        id:
          crypto.randomUUID(),

        note,

        start:
          step * 192,

        duration:
          192
      }
    ]);

  };

  const deleteNote = (
    id:string
  ) => {

    setCurrentNotes(
      prev=>
      prev.filter(
        n=>
        n.id!==id
      )
    );

  };

  useEffect(() => {

    if(partRef.current){
      partRef.current.dispose();
    }

    partRef.current =
      new Tone.Part(

      (
        time,
        noteObj: Note
      )=>{

        const inst =
          instruments[
            activeInstIdx
          ];

        if(!inst)
          return;

        inst.sampler
        .triggerAttackRelease(
          noteObj.note,
          "16n",
          time
        );

      },

      currentNotes.map(
        n=>({

          time:
          Tone.Time(
            n.start,
            "i"
          ).toSeconds(),

          ...n

        })
      )

    );

    partRef.current.loop =
      true;

    partRef.current.loopEnd =
      "2m";

    if(isPlaying){

      partRef.current.start(
        0
      );

    }

  },[
    currentNotes,
    instruments,
    activeInstIdx,
    isPlaying
  ]);



  const togglePlayback=()=>{

    if(isPlaying){

      Tone.Transport.stop();

      setIsPlaying(
        false
      );

    }

    else{

      Tone.Transport.start();

      setIsPlaying(
        true
      );

    }

  };



return(

<div className="text-white font-mono">

<div
className="
flex
justify-between
items-center
mb-6
border-b
border-white/10
pb-4
"
>

<h1
className="
text-4xl
font-black
text-[#D1107A]
"
>

JUICEBOX_OS

</h1>

<div
className="
flex
items-center
gap-4
"
>

<input
type="number"
value={bpm}
onChange={(e)=>
setBpm(
Number(
e.target.value
)
)
}
className="
bg-[#111]
w-20
text-center
"
/>

{!isEngineStarted && (

<button
onClick={
startEngine
}
className="
bg-[#10D11A]
text-black
font-bold
px-4
py-2
"
>
BOOT
</button>

)}

</div>

</div>



<div className="grid lg:grid-cols-12 gap-6">

<div className="lg:col-span-3">

<div

onDrop={(e)=>{

e.preventDefault();

if(
e.dataTransfer.files?.[0]
){

processFile(
e.dataTransfer.files[0]
);

}

}}

onDragOver={(e)=>
e.preventDefault()
}

className="
relative
h-24
border-2
border-dashed
border-[#1088D1]
flex
justify-center
items-center
cursor-pointer
"
>

<input

type="file"

accept="audio/*"

className="
absolute
inset-0
opacity-0
cursor-pointer
"

onChange={(e)=>{

if(
e.target.files?.[0]
){

processFile(
e.target.files[0]
);

}

}}

 />

<Upload size={18}/>
<span className="ml-2">
Import
</span>

</div>



{loaded && (

<div className="mt-4 space-y-2">

<button

onClick={()=>
player.current?.start()
}

className="
bg-white
text-black
w-full
py-2
"
>

<Play className="mx-auto"/>

</button>


<input

value={instName}

onChange={(e)=>
setInstName(
e.target.value
)
}

placeholder="NAME"

className="
w-full
bg-black
border-b
"
/>

<button

onClick={
captureInstrument
}

className="
bg-[#10D11A]
text-black
w-full
py-2
font-bold
"

>

CAPTURE

</button>

</div>

)}

</div>



<div className="lg:col-span-9">

<button

onClick={
togglePlayback
}

className="
mb-4
bg-[#10D11A]
text-black
px-6
py-2
"

>

{isPlaying
? "STOP"
: "PLAY"}

</button>


<div
className="
relative
overflow-auto
bg-[#030303]
border
border-white/10
h-[500px]
"
>

<div
className="
inline-grid
grid-cols-[60px_1fr]
"
>

<div
className="
sticky
left-0
bg-[#050505]
z-20
"
>

{NOTES.map(
(note,i)=>(

<div

key={note}

className="
h-6
w-[60px]
pl-2
text-[8px]
border-b
border-white/10
flex
items-center
"

style={{
color:
COLORS[
i %
COLORS.length
]
}}

>

{note}

</div>

)

)}

</div>



<div
className="
relative
w-[1536px]
h-[864px]
bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
bg-[size:48px_24px]
"
>

{currentNotes.map(
n=>{

const noteIndex=
NOTES.indexOf(
n.note
);

return(

<div

key={n.id}

onContextMenu={(e)=>{

e.preventDefault();

deleteNote(
n.id
);

}}

className="
absolute
"

style={{

left:
`${(n.start/192)*48}px`,

top:
`${noteIndex*24}px`,

width:
`${(n.duration/192)*48}px`,

height:"24px",

backgroundColor:
COLORS[
noteIndex %
COLORS.length
]

}}

>

</div>

);

}

)}

{currentNotes.map((n) => {

  const noteIndex =
    NOTES.indexOf(n.note);

  return (

    <div
      key={n.id}

      onContextMenu={(e)=>{

        e.preventDefault();

        deleteNote(
          n.id
        );

      }}

      className="absolute"

      style={{

        left:
        `${(n.start/192)*48}px`,

        top:
        `${noteIndex*24}px`,

        width:
        `${(n.duration/192)*48}px`,

        height:"24px",

        backgroundColor:
        COLORS[
          noteIndex %
          COLORS.length
        ]

      }}

    >

    </div>

  );

})}
