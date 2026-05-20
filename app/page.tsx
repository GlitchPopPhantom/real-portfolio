"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [loadingText, setLoadingText] = useState("");

  const [cursorVisible, setCursorVisible] =
    useState(true);

  const [hi, setHi] = useState("");
  const [im, setIm] = useState("");
  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [highlight, setHighlight] =
    useState(false);

  const [showButton, setShowButton] =
    useState(false);

  const [showPortfolio, setShowPortfolio] =
    useState(false);

  function sleep(ms:number){

    return new Promise(
      resolve=>setTimeout(resolve,ms)
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
        text.slice(0,i)
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
        text.slice(0,i)
      );

      await sleep(50);

    }

  }


  useEffect(()=>{

    async function run(){

      await typeText(
        "Loading",
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

        await sleep(250);

      }


      setCursorVisible(
        true
      );


      await backspace(
        "Loading",
        setLoadingText
      );


      setLoading(
        false
      );


      await sleep(300);


      await typeText(
        "Hi",
        setHi
      );

      await sleep(300);


      await typeText(
        "I'm",
        setIm
      );

      await sleep(300);


      await typeText(
        "Adenipekun",
        setFirstName
      );

      await sleep(300);


      await typeText(
        "Adetunji",
        setLastName
      );


      await sleep(1000);

      setHighlight(
        true
      );


      await sleep(1400);

      setShowButton(
        true
      );

    }

    run();

  },[]);



if(loading){

return(

<div className="
h-screen
bg-black
flex
items-center
justify-center
font-mono
text-[#00FF41]
">

<div
className="
relative
text-5xl
w-[9ch]
"
>

{loadingText}

<span
className="
absolute
left-[8ch]
"
>

{cursorVisible
?
"|"
:
" "}

</span>

</div>

</div>

)

}




return(

<div className="
bg-black
text-[#00FF41]
font-mono
min-h-screen
">

<div
className="
max-w-screen-xl
mx-auto
px-6
lg:px-24
flex
flex-col
lg:flex-row
"
>



<header
className="
lg:w-[40%]
h-screen
sticky
top-0
flex
flex-col
justify-center
"
>

<div>


<div
className="
text-5xl
font-bold
leading-tight
"
>

<div
className={`
transition-all
duration-[2000ms]

${
showPortfolio
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
showPortfolio
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


<div
className={`
text-[#00FF41]
transition-all
duration-[1500ms]

${
showPortfolio
?
"text-white"
:
""
}
`}
>

{firstName}

</div>


<div>

{
highlight
?
<>
Ade

<span
className="
text-white
transition-colors
duration-[2500ms]
"
>

tunji

</span>
</>

:
lastName
}

</div>


</div>



{
showButton
&&
!showPortfolio
&&(

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
"

>

See my portfolio

</button>

)}



{showPortfolio&&(

<>

<p className="
mt-8
text-lg
">

Fullstack Engineer |
Systems & Architecture

</p>


<p className="
mt-5
max-w-xs
opacity-70
">

Architecting scalable,
high-concurrency web
applications using
React & Django.

</p>



<nav className="
mt-16
">

<ul className="
space-y-6
">

<li>

<a
href="#about"
className="
hover:text-white
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
"
>

—— PROJECTS

</a>

</li>

</ul>

</nav>



<div className="
mt-auto
pt-24
opacity-60
text-sm
">

<p>
tunjiadenipekun@gmail.com
</p>

<p className="
mt-2
">
+234 906 470 7767
</p>

</div>

</>

)}

</div>

</header>




<main
className={`
transition-all
duration-[1500ms]

${
showPortfolio
?
"lg:w-[60%] opacity-100 py-24"
:
"opacity-0 w-0 overflow-hidden"
}
`}
>

<section
id="about"
className="
mb-28
"
>

<h2 className="
text-white
mb-6
">

ABOUT

</h2>

<p className="
opacity-70
leading-relaxed
">

Fullstack engineer
focused on scalable
systems, modular
architecture and
interactive software.

</p>

</section>



<section
id="experience"
className="
mb-28
"
>

<h2 className="
text-white
mb-6
">

EXPERIENCE

</h2>

<div className="
mb-16
">

Backend Engineering Intern —
Nigerian Breweries PLC

</div>

<div>

Software Engineering Intern —
Lagos State Ministry

</div>

</section>




<section
id="projects"
>

<h2 className="
text-white
mb-6
">

PROJECTS

</h2>


<a
href="https://github.com/GlitchPopPhantom/Qboid"
target="_blank"
className="
block
mb-6
p-5
border
border-[#00FF41]/20
hover:bg-[#00FF41]/10
transition-all
"
>

Qboid —
Modular Combat Engine

</a>

</section>

</main>

</div>

</div>

);

}
