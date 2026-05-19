"use client";

import React, { useEffect, useState } from "react";

export default function Home() {

const [loading,setLoading]=useState(true);

const [loadingText,setLoadingText]=
useState("");

const [cursorVisible,setCursorVisible]=
useState(true);

const [hi,setHi]=useState("");
const [im,setIm]=useState("");
const [firstName,setFirstName]=
useState("");

const [lastName,setLastName]=
useState("");

const [highlight,setHighlight]=
useState(false);

const [hideIntro,setHideIntro]=
useState(false);

const [showButton,setShowButton]=
useState(false);

const [showPortfolio,setShowPortfolio]=
useState(false);



function sleep(ms:number){

return new Promise(
resolve=>
setTimeout(resolve,ms)
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



// blink exactly 3x

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



if(loading){

return(

<div className="bg-black min-h-screen flex items-center justify-center text-[#00FF41] font-mono">

<div
className="
text-5xl
relative
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

<div className="bg-black text-[#00FF41] min-h-screen font-mono">

<div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row min-h-screen">



<header
className={`
transition-all
duration-[1800ms]

lg:flex
lg:flex-col

${
showPortfolio
?
"lg:w-[40%] lg:py-24"
:
"w-full flex items-center justify-center"
}
`}
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
duration-[2500ms]

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
duration-[2500ms]

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


<div
className="
text-[#00FF41]
"
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



{showButton&&(

<button

onClick={()=>
setShowPortfolio(
true
)
}

className="
mt-14
border
border-[#00FF41]/30
px-5
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

<p className="mt-8 text-lg">

Fullstack Engineer |
Systems & Architecture

</p>


<p className="mt-5 opacity-70 max-w-xs">

Architecting scalable,
high-concurrency web
applications with
React & Django.

</p>



<nav className="mt-16">

<ul className="space-y-6">

<li>

<a
href="#about"
className="hover:text-white"
>

—— ABOUT

</a>

</li>

<li>

<a
href="#experience"
className="hover:text-white"
>

—— EXPERIENCE

</a>

</li>

<li>

<a
href="#projects"
className="hover:text-white"
>

—— PROJECTS

</a>

</li>

</ul>

</nav>


<div className="mt-24 opacity-60 text-sm">

<p>
tunjiadenipekun@gmail.com
</p>

<p className="mt-2">
+234 906 470 7767
</p>

</div>

</>

)}

</div>

</header>




<div
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
className="mb-24"
>

<h2 className="text-white mb-6">

ABOUT

</h2>

<p className="opacity-70">

Fullstack engineer focused on
modular systems,
architecture and interactive
software.

</p>

</section>



<section
id="experience"
className="mb-24"
>

<h2 className="text-white mb-6">

EXPERIENCE

</h2>

<div className="mb-12">

Backend Engineering Intern —
Nigerian Breweries PLC

</div>


<div>

Software Engineering Intern —
Lagos State Ministry

</div>

</section>




<section id="projects">

<h2 className="text-white mb-6">

PROJECTS

</h2>


<a
href="https://github.com/GlitchPopPhantom/Qboid"
target="_blank"
className="
block
mb-8
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


<a
href="#"
className="
block
p-5
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

);

}
