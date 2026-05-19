"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [loadingText, setLoadingText] = useState("");

  const [hi, setHi] = useState("");
  const [im, setIm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [cursorVisible, setCursorVisible] =
    useState(true);

  const [highlight, setHighlight] =
    useState(false);

  const [hideIntro, setHideIntro] =
    useState(false);

  const [showButton, setShowButton] =
    useState(false);

  const [showPortfolio, setShowPortfolio] =
    useState(false);

  async function sleep(ms:number){
    return new Promise(
      resolve=>setTimeout(
        resolve,
        ms
      )
    );
  }


  async function typeText(
    text:string,
    setter:React.Dispatch<
      React.SetStateAction<string>
    >
  ){

    for(
      let i=0;
      i<=text.length;
      i++
    ){

      setter(
        text.slice(
          0,
          i
        )
      );

      await sleep(90);

    }

  }


  async function backspace(
    text:string,
    setter:React.Dispatch<
      React.SetStateAction<string>
    >
  ){

    for(
      let i=text.length;
      i>=0;
      i--
    ){

      setter(
        text.slice(
          0,
          i
        )
      );

      await sleep(55);

    }

  }


  useEffect(()=>{

    async function run(){

      await typeText(
        "Loading...",
        setLoadingText
      );


      // blink 3x

      for(
        let i=0;
        i<6;
        i++
      ){

        setCursorVisible(
          v=>!v
        );

        await sleep(
          250
        );

      }

      setCursorVisible(
        true
      );


      await backspace(
        "Loading...",
        setLoadingText
      );


      await sleep(
        300
      );


      await typeText(
        "Hi",
        setHi
      );

      await sleep(
        300
      );

      await typeText(
        "I'm",
        setIm
      );

      await sleep(
        300
      );


      await typeText(
        "Adenipekun",
        setFirstName
      );

      await sleep(
        300
      );


      await typeText(
        "Adetunji",
        setLastName
      );

      await sleep(
        1200
      );

      setHighlight(
        true
      );

      await sleep(
        2500
      );

      setHideIntro(
        true
      );

      await sleep(
        1200
      );

      setShowButton(
        true
      );

    }

    run();

  },[]);



return(

<div className="bg-black text-[#00FF41] min-h-screen font-mono overflow-hidden">

<div className="max-w-screen-xl mx-auto min-h-screen flex flex-col lg:flex-row px-10 lg:px-24">



<div
className={`
transition-all
duration-[1800ms]
flex
items-center

${
showPortfolio
?
"lg:w-[40%] lg:items-start pt-24"
:
"w-full justify-center"
}
`}
>

<div>


{!hi&&(

<div
className="
text-5xl
w-[12ch]
mx-auto
text-center
"
>

{loadingText}

<span
className="
inline-block
absolute
ml-1
"
>

{cursorVisible
?
"|"
:
" "}

</span>

</div>

)}




{hi&&(

<div
className="
text-5xl
leading-relaxed
transition-all
duration-[1800ms]
"
>

<div
className={`
transition-all
duration-[2000ms]

${
hideIntro
?
"opacity-0 h-0 overflow-hidden"
:
""
}

${
highlight
?
"text-white"
:
"text-[#00FF41]"
}
`}
>

{hi}

</div>



<div
className={`
transition-all
duration-[2000ms]

${
hideIntro
?
"opacity-0 h-0 overflow-hidden"
:
""
}

${
highlight
?
"text-white"
:
"text-[#00FF41]"
}
`}
>

{im}

</div>




<div className="text-white font-bold">

{firstName}

</div>



<div className="font-bold">

{
highlight
?
<>

Ade

<span
className="
transition-colors
duration-[2500ms]
text-white
"
>

tunji

</span>

</>

:
lastName
}

</div>



{showPortfolio&&(

<>

<p className="mt-8 text-lg text-[#00FF41]">

Fullstack Engineer |
Systems & Architecture

</p>


<p className="mt-8 opacity-70 max-w-xs text-sm">

Architecting scalable,
high-concurrency web
applications with
React and Django.

</p>



<nav className="mt-20">

<ul className="space-y-6 text-sm">

<li>

<a
href="#about"
className="
hover:text-white
transition-colors
"
>

—— ABOUT

</a>

</li>



<li>

<a
href="#experience"
className="
hover:text-white
transition-colors
"
>

—— EXPERIENCE

</a>

</li>



<li>

<a
href="#projects"
className="
hover:text-white
transition-colors
"
>

—— PROJECTS

</a>

</li>

</ul>

</nav>


<div className="mt-32 text-sm opacity-60">

<p>

tunjiadenipekun@gmail.com

</p>

<p className="mt-2">

+234 906 470 7767

</p>

</div>

</>

)}

{showButton&&(

<button

onClick={()=>
setShowPortfolio(
true
)
}

className="
mt-16
border
border-[#00FF41]/30
px-6
py-3
hover:bg-[#00FF41]/10
transition-all
text-sm
"

>

See my portfolio

</button>

)}

</div>

)}

</div>

</div>



<div
className={`
transition-all
duration-[1800ms]

${
showPortfolio
?
"lg:w-[60%] opacity-100"
:
"w-0 opacity-0"
}
`}
>

<div className="py-24 pl-20">

<section
id="about"
className="mb-28"
>

<h2 className="text-white text-xl mb-8">

About

</h2>

<p className="opacity-70 leading-relaxed">

Fullstack engineer
focused on scalable
systems, modular
architecture and
interactive software.

</p>

</section>




<section
id="experience"
className="mb-28"
>

<h2 className="text-white text-xl mb-8">

Experience

</h2>


<div className="mb-16">

<h3>

Backend Engineering Intern —
Nigerian Breweries PLC

</h3>

<p className="mt-4 opacity-70">

Revitalized logistics
dashboards using
React and TypeScript.

</p>

</div>



<div>

<h3>

Software Engineering Intern —
Lagos State Ministry

</h3>

<p className="mt-4 opacity-70">

Built modular
citizen-facing
systems.

</p>

</div>

</section>




<section
id="projects"
>

<h2 className="text-white text-xl mb-8">

Projects

</h2>



<a
href="https://github.com/GlitchPopPhantom/Qboid"
target="_blank"
className="
block
mb-6
p-6
border
border-[#00FF41]/20
hover:bg-[#00FF41]/10
transition-all
"
>

Qboid —
Combat Engine

</a>



<a
href="#"
className="
block
p-6
border
border-[#00FF41]/20
hover:bg-[#00FF41]/10
transition-all
"
>

Game Architecture &
Interactive Systems

</a>


</section>

</div>

</div>


</div>

</div>

);

}
