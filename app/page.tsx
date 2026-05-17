"use client";

import React, {
  useEffect,
  useState
} from "react";

export default function Home() {
  const [stage,setStage]=useState(0);
  const [text,setText]=useState("");


  const [showPortfolio,setShowPortfolio]=
  useState(false);

  const [showButton,setShowButton]=
  useState(false);


  useEffect(()=>{

    let mounted=true;

    async function sleep(ms:number){
      return new Promise(r=>setTimeout(r,ms));
    }

    async function run(){

      // TYPE LOADING

      let load="Loading...";

      for(let i=0;i<=load.length;i++){

        if(!mounted)return;

        setText(load.slice(0,i));

        await sleep(100);

      }


      // BLINK CURSOR 3x

      await sleep(900);


      // BACKSPACE

      for(
        let i=load.length;
        i>=0;
        i--
      ){

        setText(
          load.slice(0,i)
        );

        await sleep(50);

      }


      await sleep(300);

      setStage(1);

      await sleep(300);

      setStage(2);

      await sleep(500);

      setStage(3);

      await sleep(700);

      setStage(4);

      await sleep(700);

      setStage(5);

      await sleep(1500);

      setShowButton(true);

    }

    run();

    return ()=>{
      mounted=false;
    };

  },[]);


  useEffect(()=>{

    const scroll=()=>{

      if(
      window.scrollY>10
      ){

        setShowButton(
          true
        );

      }

    };

    window.addEventListener(
      "scroll",
      scroll
    );

    return ()=>{

      window.removeEventListener(
        "scroll",
        scroll
      );

    };

  },[]);


  return(

<div className="bg-black min-h-screen overflow-hidden font-mono text-[#00FF41]">

<div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.2)_51%)] bg-[length:100%_4px]" />


<div className="h-screen flex items-center">

<div
className={`
transition-all
duration-[1500ms]
w-full
px-20
${showPortfolio
?
"translate-x-[-40vw]"
:
"justify-center"}
flex
`}
>

<div>

{/* LOADING */}

{stage===0&&(

<div className="text-5xl">

{text}

<span
className="
animate-pulse
inline-block
w-[12px]
"
>

|

</span>

</div>

)}



{/* HI */}

{stage>=1&&(

<div>

<div
className={`
text-5xl
transition-all
duration-[2000ms]

${stage>=5
?
"text-white"
:
"text-[#00FF41]"
}

`}
>

Hi

</div>


{stage>=2&&(

<div
className={`
text-5xl mt-4
transition-all duration-[2000ms]

${stage>=5
?
"text-white"
:
"text-[#00FF41]"
}
`}
>

I'm

</div>

)}


{stage>=3&&(

<div
className="
text-5xl mt-4
text-[#00AA33]
"
>

Adenipekun

</div>

)}

{stage>=4&&(

<div
className="
text-5xl mt-2
"
>

<span className="text-[#005511]">

Ade

</span>

<span className="text-white">

tunji

</span>

</div>

)}

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
mt-20
opacity-70
hover:opacity-100
transition-all
border
border-[#00FF41]/30
px-6
py-3
"

>

See my portfolio ↓

</button>

)}

</div>



{/* RIGHT PANEL */}

<div
className={`
absolute
right-0
top-0
h-full
w-[55vw]
transition-all
duration-[1500ms]

${
showPortfolio
?
"translate-x-0"
:
"translate-x-full"
}
`}
>

<div className="pt-32 px-20">

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

</div>

);

}
