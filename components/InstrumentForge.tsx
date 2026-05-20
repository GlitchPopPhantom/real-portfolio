"use client";

import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import {
  Upload,
  Play,
  X
} from "lucide-react";

interface Note {
  id: string;
  note: string;
  start: number;
  duration: number;
}

interface SavedPattern {
  id: string;
  name: string;
  notes: Note[];
}

export default function InstrumentForge() {

  const [isEngineStarted,setIsEngineStarted]=
    useState(false);

  const [loaded,setLoaded]=
    useState(false);

  const [isPlaying,setIsPlaying]=
    useState(false);

  const [bpm,setBpm]=
    useState(120);

  const [fileName,setFileName]=
    useState("");

  const [instName,setInstName]=
    useState("");

  const [history]=
    useState<AudioBuffer[]>([]);

  const [instruments,setInstruments]=
    useState<
      {
        name:string;
        sampler:Tone.Sampler
      }[]
    >([]);

  const [activeInstIdx,setActiveInstIdx]=
    useState(0);

  const [currentNotes,setCurrentNotes]=
    useState<Note[]>([]);

  const [savedPatterns,setSavedPatterns]=
    useState<SavedPattern[]>([]);

  const [activePatternId,setActivePatternId]=
    useState<string | null>(null);

  const player=
    useRef<Tone.Player|null>(null);

  const partRef=
    useRef<Tone.Part|null>(null);

  const NOTES=[

"C6","B5","A#5","A5",
"G#5","G5","F#5","F5",
"E5","D#5","D5","C#5",

"C5","B4","A#4","A4",
"G#4","G4","F#4","F4",
"E4","D#4","D4","C#4",

"C4","B3","A#3","A3",
"G#3","G3","F#3","F3",
"E3","D3","D#3","C3"

];

const COLORS=[

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



const startEngine=async()=>{

await Tone.start();

Tone.Transport.bpm.value=
bpm;

setIsEngineStarted(
true
);

};



useEffect(()=>{

Tone.Transport.bpm.value=
bpm;

},[bpm]);



const processFile=(
file:File
)=>{

const url=
URL.createObjectURL(
file
);

setFileName(
file.name.split(".")[0]
);

if(player.current)
player.current.dispose();

player.current=
new Tone.Player(
url,
()=>{

setLoaded(
true
);

}
).toDestination();

};



const captureInstrument=()=>{

if(
!player.current ||
!loaded
)
return;


const audioBuffer=
player.current
.buffer
.get();

if(!audioBuffer)
return;



const sampler=
new Tone.Sampler({

urls:{
C4:audioBuffer
}

}).toDestination();



setInstruments([

...instruments,

{

name:
instName||
fileName,

sampler

}

]);

setInstName("");

};



const addNote=(

noteName:string,
step:number

)=>{

const newNote={

id:
Math.random()
.toString(36)
.substr(2,9),

note:
noteName,

start:
step*192,

duration:
192

};

setCurrentNotes([

...currentNotes,
newNote

]);

};



const deleteNote=(id:string)=>{

setCurrentNotes(

currentNotes.filter(
n=>n.id!==id
)

);

};



const savePattern=()=>{

const name=
prompt(
"Pattern Name"
);

if(!name)
return;

const newPat={

id:
Date.now()
.toString(),

name,

notes:
[...currentNotes]

};

setSavedPatterns([

...savedPatterns,
newPat

]);

setActivePatternId(
newPat.id
);

};



const loadPattern=(

pat:SavedPattern

)=>{

setActivePatternId(
pat.id
);

setCurrentNotes(
pat.notes
);

};



useEffect(()=>{

if(partRef.current)
partRef.current.dispose();



partRef.current=
new Tone.Part(

(time,noteObj:Note)=>{

if(
instruments[
activeInstIdx
]
){

instruments[
activeInstIdx
]
.sampler
.triggerAttackRelease(

noteObj.note,

Tone.Time(
noteObj.duration,
"i"
).toSeconds(),

time

);

}

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


partRef.current.loop=
true;

partRef.current.loopEnd=
"2m";

if(isPlaying)
partRef.current.start(0);

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

<div
className="
p-4
bg-black
min-h-screen
text-white
font-mono
flex
flex-col
gap-4
"
>

<div
className="
flex
justify-between
items-center
border-b
border-white/10
pb-4
"
>

<h1
className="
text-3xl
font-black
text-[#D1107A]
"
>

JUICEBOX_OS

</h1>


<div
className="
flex
gap-4
items-center
"
>

<input

type="number"

value={bpm}

onChange={
e=>
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


{

!isEngineStarted &&

<button

onClick={
startEngine
}

className="
bg-[#10D11A]
text-black
px-4
py-1
font-bold
"
>

BOOT

</button>

}

</div>

</div>



<div
className="
grid
lg:grid-cols-12
gap-4
"
>

<div
className="
lg:col-span-3
space-y-4
"
>

<div

onDrop={e=>{

e.preventDefault();

processFile(
e.dataTransfer
.files[0]
);

}}

onDragOver={
e=>
e.preventDefault()
}

className="
h-24
border-2
border-dashed
border-[#1088D1]
flex
flex-col
justify-center
items-center
cursor-pointer
"
>

<Upload size={16}/>

Import

</div>



{

loaded &&

<div
className="
space-y-2
"
>

<button

onClick={()=>
player.current?.start()
}

className="
w-full
bg-white
text-black
py-2
"
>

<Play
className="mx-auto"
/>

</button>


<input

value={instName}

onChange={
e=>
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
w-full
bg-[#10D11A]
text-black
py-2
font-bold
"

>

CAPTURE

</button>

</div>

}


{

instruments.map(
(inst,i)=>(

<div

key={i}

onClick={()=>
setActiveInstIdx(i)
}

className="
border
p-2
cursor-pointer
"

>

{inst.name}

</div>

)

)

}

</div>



<div
className="
lg:col-span-9
"
>

<button

onClick={
togglePlayback
}

className="
mb-4
px-6
py-2
bg-[#10D11A]
text-black
font-bold
"

>

{

isPlaying
?
"STOP"
:
"PLAY"

}

</button>

</div>

</div>

</div>

);

}
