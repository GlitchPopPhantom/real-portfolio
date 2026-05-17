"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [line4, setLine4] = useState("");

  const [cursorVisible, setCursorVisible] =
    useState(true);

  const [showIntro, setShowIntro] =
    useState(false);

  const [showButton, setShowButton] =
    useState(false);

  const [showPortfolio, setShowPortfolio] =
    useState(false);

  async function sleep(ms:number){
    return new Promise(
      r=>setTimeout(r,ms)
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

    async function sequence(){

      await typeText(
        "Loading...",
        setLine1
      );


      // blink exactly 3x

      for(
        let i=0;
        i<6;
        i++
      ){

        setCursorVisible(
          p=>!p
        );

        await sleep(
          300
        );

      }

      setCursorVisible(
        true
      );


      await backspace(
        "Loading...",
        setLine1
      );


      await sleep(400);

      setShowIntro(
        true
      );

      setLine1("");

      await typeText(
        "Hi",
        setLine1
      );

      await sleep(300);

      await typeText(
        "I'm",
        setLine2
      );

      await sleep(300);

      await typeText(
        "Adenipekun",
        setLine3
      );

      await sleep(300);

      await typeText(
        "Adetunji",
        setLine4
      );

      await sleep(800);

      setShowButton(
        true
      );

    }

    sequence();

  },[]);


  return(

<div className="bg-black text-[#00FF41] min-h-screen font-mono overflow-hidden">

<div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,.2)_51%)] bg-[length:100%_4px]" />

<div className="max-w-screen-xl mx-auto min-h-screen flex flex-col lg:flex-row px-8 lg:px-24">

<div
className={`
transition-all
duration-[1500ms]
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

<div className="text-5xl leading-relaxed">

{line1}

{!showIntro&&cursorVisible&&(

<span
className="
inline-block
w-[14px]
"
>

|

</span>

)}

</div>


{showIntro&&(

<>

<div
className={`text-5xl mt-2 ${
line1==="Hi"
?
"text-white"
:
""
}`}
>

{line1}

</div>

<div
className={`text-5xl mt-2 ${
line2==="I'm"
?
"text-white"
:
""
}`}
>

{line2}

</div>


<div className="text-5xl mt-2">

{line3}

</div>


<div className="text-5xl mt-2">

{"Ade"}

<span
className={`
transition-all
duration-[2000ms]

${
line4==="Adetunji"
?
"text-white"
:
""
}
`}
>

{"tunji"}

</span>

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
duration-[1500ms]
overflow-hidden

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

Qboid —
Modular Combat Engine

</div>

</div>

</div>

</div>

</div>

  );

}
