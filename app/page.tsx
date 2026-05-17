"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [loadingText, setLoadingText] =
    useState("");

  const [hi, setHi] =
    useState("");

  const [im, setIm] =
    useState("");

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [cursorVisible,setCursorVisible] =
    useState(true);

  const [highlight,setHighlight] =
    useState(false);

  const [showPortfolio,setShowPortfolio] =
    useState(false);

  const [showButton,setShowButton] =
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


      await sleep(400);

      await typeText(
        "Hi",
        setHi
      );

      await sleep(250);

      await typeText(
        "I'm",
        setIm
      );

      await sleep(250);

      await typeText(
        "Adenipekun",
        setFirstName
      );

      await sleep(250);

      await typeText(
        "Adetunji",
        setLastName
      );


      await sleep(700);

      setHighlight(
        true
      );

      await sleep(800);

      setShowButton(
        true
      );

    }

    run();

  },[]);


  return(

<div className="bg-black min-h-screen text-[#00FF41] font-mono overflow-hidden">

<div className="max-w-screen-xl mx-auto min-h-screen flex flex-col lg:flex-row px-10 lg:px-24">


<div
className={`
transition-all
duration-[1400ms]
flex
items-center

${
showPortfolio
?
"lg:w-[40%] justify-start"
:
"w-full justify-center"
}
`}
>

<div>

{/* loading */}

{!hi&&(

<div className="text-5xl">

<span>

{loadingText}

</span>

<span
className="
inline-block
w-[16px]
text-left
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

<div className="text-5xl leading-relaxed">

<div
className={
highlight
?
"text-white"
:
""
}
>

{hi}

</div>


<div
className={
highlight
?
"text-white"
:
""
}
>

{im}

</div>


<div>

{firstName}

</div>


<div>

{
highlight
?
<>
{"Ade"}

<span
className="
text-white
transition-all
duration-[1500ms]
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
px-5
py-3
hover:bg-[#00FF41]/10
transition-all
"
>

See my portfolio ↓

</button>

)}

</div>

</div>


<div
className={`
transition-all
duration-[1400ms]

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

<h2 className="text-white text-3xl mb-10">

Experience

</h2>

<div className="mb-8">

Backend Engineering Intern

</div>

<div>

Software Engineering Intern

</div>


<h2 className="text-white text-3xl mt-20 mb-10">

Projects

</h2>

<div>

Qboid Combat Engine

</div>

</div>

</div>


</div>

</div>

  );

}
