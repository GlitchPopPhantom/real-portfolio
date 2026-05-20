"use client";
import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Upload, Scissors, Play, Square, Save, RotateCcw, Plus, Power, X, ChevronRight, Hash } from 'lucide-react';

// --- TYPES ---
interface Note {
  id: string;
  note: string;
  start: number; // in "ticks" (192 ticks = 16th note)
  duration: number; // in ticks
}

interface SavedPattern {
  id: string;
  name: string;
  notes: Note[];
}

export default function Juicebox() {
  const [isEngineStarted, setIsEngineStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [fileName, setFileName] = useState("");
  const [instName, setInstName] = useState("");
  const [trim, setTrim] = useState({ start: 0, end: 1, duration: 1 });
  
  // Storage
  const [history, setHistory] = useState<AudioBuffer[]>([]);
  const [instruments, setInstruments] = useState<{name: string, sampler: Tone.Sampler}[]>([]);
  const [activeInstIdx, setActiveInstIdx] = useState(0);
  
  // Pattern State
  const [currentNotes, setCurrentNotes] = useState<Note[]>([]);
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([]);
  const [activePatternId, setActivePatternId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);

  const player = useRef<Tone.Player | null>(null);
  const partRef = useRef<Tone.Part | null>(null);

  // C3 to C6 Chromatic Scale
  const NOTES = ["C6","B5","A#5","A5","G#5","G5","F#5","F5","E5","D#5","D5","C#5",
                  "C5","B4","A#4","A4","G#4","G4","F#4","F4","E4","D#4","D4","C#4",
                  "C4","B3","A#3","A3","G#3","G3","F#3","F3","E3","D#3","D3","C3"];
  
  const COLORS = ["#D1107A", "#A810D1", "#5F10D1", "#102AD1", "#1088D1", "#10D1B5", "#10D11A", "#94D110", "#F7E60A", "#F2A10D", "#E36210", "#D11010"];

  const startEngine = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    setIsEngineStarted(true);
  };

  useEffect(() => { Tone.Transport.bpm.value = bpm; }, [bpm]);

  // --- AUDIO LOGIC ---
  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setFileName(file.name.split('.')[0]);
    if (player.current) player.current.dispose();
    player.current = new Tone.Player(url, () => {
      setTrim({ start: 0, end: player.current!.buffer.duration, duration: player.current!.buffer.duration });
      setLoaded(true);
    }).toDestination();
  };

  const captureInstrument = () => {
    if (!player.current || !loaded) return;
    const sampler = new Tone.Sampler({
      {
   C4: audioBuffer
}
    }).toDestination();
    
    // THE ANTI-LOOP KILLER: Ensure Sampler doesn't loop internal buffer
    sampler.context.resume();
    setInstruments([...instruments, { name: instName || fileName, sampler }]);
    setInstName("");
  };

  // --- PIANO ROLL ACTIONS ---
  const addNote = (noteName: string, step: number) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      note: noteName,
      start: step * 192,
      duration: 192,
    };
    setCurrentNotes([...currentNotes, newNote]);
  };

  const deleteNote = (id: string) => {
    setCurrentNotes(currentNotes.filter(n => n.id !== id));
  };

  const resizeNote = (id: string, newDuration: number) => {
    setCurrentNotes(currentNotes.map(n => 
      n.id === id ? { ...n, duration: Math.max(48, newDuration) } : n
    ));
  };

  const savePattern = () => {
    const name = prompt("Enter Pattern Name:");
    if (!name) return;
    const newPat = { id: Date.now().toString(), name, notes: [...currentNotes] };
    setSavedPatterns([...savedPatterns, newPat]);
    setActivePatternId(newPat.id);
  };

  const loadPattern = (pat: SavedPattern) => {
    setActivePatternId(pat.id);
    setCurrentNotes(pat.notes);
  };

  // --- SEQUENCER ---
  useEffect(() => {
    if (partRef.current) partRef.current.dispose();
    
    partRef.current = new Tone.Part((time, noteObj: Note) => {
      if (instruments[activeInstIdx]) {
        // triggerAttackRelease strictly cuts the audio at the duration
        instruments[activeInstIdx].sampler.triggerAttackRelease(
          noteObj.note, 
          Tone.Time(noteObj.duration, "i").toSeconds(), 
          time
        );
      }
    }, currentNotes.map(n => ({ time: Tone.Time(n.start, "i").toSeconds(), ...n })));
    
    partRef.current.loop = true;
    partRef.current.loopEnd = "2m"; // 2 bars
    if (isPlaying) partRef.current.start(0);
  }, [currentNotes, instruments, activeInstIdx, isPlaying]);

  const togglePlayback = () => {
    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white font-mono flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-2 border-white/10 pb-2">
        <h1 className="text-3xl font-black italic text-[#D1107A]">JUICEBOX_OS</h1>
        <div className="flex items-center gap-4">
          <input type="number" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="bg-[#111] w-16 text-[#94D110] text-center font-bold border border-white/10" />
          {!isEngineStarted && <button onClick={startEngine} className="bg-[#10D11A] text-black px-4 py-1 font-bold">BOOT</button>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: SAMPLER */}
        <div className="lg:col-span-3 space-y-4">
          <div onDrop={(e) => { e.preventDefault(); processFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}
            className="h-20 border-2 border-dashed border-[#1088D1] flex flex-col items-center justify-center cursor-pointer">
            <Upload size={16}/><span className="text-[9px] uppercase font-bold">Import</span>
          </div>
          {loaded && (
            <div className="p-2 bg-[#050505] border border-white/10 space-y-2">
              <button onClick={() => player.current?.start(undefined, trim.start, trim.end - trim.start)} className="w-full bg-white text-black py-1"><Play size={12} className="mx-auto"/></button>
              <input type="text" placeholder="NAME_UNIT..." value={instName} onChange={(e) => setInstName(e.target.value)} className="w-full bg-transparent border-b border-[#10D11A] text-[10px] outline-none" />
              <button onClick={captureInstrument} className="w-full bg-[#10D11A] text-black py-1 font-black text-[10px]">CAPTURE</button>
            </div>
          )}
          <div className="max-h-40 overflow-y-auto space-y-1">
            {instruments.map((inst, i) => (
              <div key={i} onClick={() => setActiveInstIdx(i)} className={`p-2 text-[9px] border cursor-pointer ${activeInstIdx === i ? 'border-[#D1107A] bg-[#D1107A]/10' : 'border-white/5'}`}>
                {inst.name.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* PIANO ROLL (FL STYLE) */}
        <div className="lg:col-span-9 flex flex-col gap-2">
          <div className="flex justify-between items-center bg-[#111] p-2">
            <span className="text-[10px] text-[#10D1B5] font-black italic">ROLL // {instruments[activeInstIdx]?.name || "EMPTY"}</span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentNotes([])} className="p-1 border border-white/10 hover:text-red-500"><X size={14}/></button>
              <button onClick={savePattern} className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase">Save Pat</button>
              <button onClick={togglePlayback} className={`px-6 py-1 text-[10px] font-black uppercase ${isPlaying ? 'bg-[#D1107A]' : 'bg-[#10D11A] text-black'}`}>{isPlaying ? "Stop" : "Play"}</button>
            </div>
          </div>

          <div className="relative overflow-auto bg-[#030303] border border-white/5 h-[500px]">
            {/* GRID LAYER */}
            <div className="inline-grid grid-cols-[60px_1fr] relative">
              <div className="sticky left-0 z-20 bg-[#050505]">
                {NOTES.map((note, i) => (
                  <div key={note} className="h-6 w-[60px] text-[8px] flex items-center pl-2 border-b border-white/5 font-bold" style={{color: COLORS[i % COLORS.length]}}>
                    {note}
                  </div>
                ))}
              </div>
              <div className="relative w-[1536px] h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_24px]">
                {/* Note Rendering */}
                {currentNotes.map((n) => {
                   const noteIndex = NOTES.indexOf(n.note);
                   return (
                     <div key={n.id} 
                      onContextMenu={(e) => { e.preventDefault(); deleteNote(n.id); }}
                      className="absolute group border-l-2 border-white/20"
                      style={{
                        left: `${(n.start / 192) * 48}px`,
                        top: `${noteIndex * 24}px`,
                        width: `${(n.duration / 192) * 48}px`,
                        height: '24px',
                        backgroundColor: COLORS[noteIndex % COLORS.length]
                      }}
                     >
                        {/* Drag Handle for Resizing */}
                        <div 
                          className="absolute right-0 top-0 w-2 h-full cursor-ew-resize hover:bg-white/30"
                          onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startDur = n.duration;
                            const onMove = (moveEvent: MouseEvent) => {
                              const diff = moveEvent.clientX - startX;
                              resizeNote(n.id, startDur + (diff * (192 / 48)));
                            };
                            const onUp = () => {
                              window.removeEventListener('mousemove', onMove);
                              window.removeEventListener('mouseup', onUp);
                            };
                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                          }}
                        />
                     </div>
                   );
                })}
                {/* Click to Add Layer */}
                {NOTES.map((note, noteIdx) => (
                   Array(32).fill(0).map((_, step) => (
                     <div key={`${note}-${step}`} 
                      onClick={() => addNote(note, step)}
                      className="absolute h-6 w-12 hover:bg-white/5 cursor-crosshair"
                      style={{ left: `${step * 48}px`, top: `${noteIdx * 24}px` }}
                     />
                   ))
                ))}
              </div>
            </div>
          </div>

          {/* Pattern Library */}
          <div className="flex gap-2 overflow-x-auto pt-2">
            {savedPatterns.map(p => (
              <button key={p.id} onClick={() => loadPattern(p)} className={`px-3 py-1 text-[9px] border font-black ${activePatternId === p.id ? 'border-[#D1107A] text-[#D1107A]' : 'border-white/10 text-white/40'}`}>
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
