function ColorCircles() {
  return (
    <>
      <div className="p-10 bg-black flex gap-10 flex-wrap">
        <div className="w-40 text-8xl font-serif h-40 flex justify-center items-center text-sky-200 border-2 rounded-full border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
          <span>E</span>
        </div>
        <div className="w-40 text-8xl font-serif h-40 flex justify-center items-center text-purple-200 border-2 rounded-full border-purple-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#b454fc,0_0_15px_#b454fc,0_0_30px_#b454fc]">
          <span>T</span>
        </div>
        <div className="w-40 text-8xl font-serif h-40 flex justify-center items-center text-teal-200 border-2 rounded-full border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#639B95,0_0_15px_#639B95,0_0_30px_#639B95]">
          <span>L</span>
        </div>
      </div>
      <div className="p-10 bg-black flex gap-10 flex-wrap">
        <div className="w-40 text-8xl font-serif h-40 flex justify-center items-center  text-sky-200 border-2 rounded-full border-sky-200 -inset-1 bg-gradient-to-r from-sky-600 to-sky-300 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
          <span>E</span>
        </div>
        <div className="w-40 text-8xl font-serif h-40 flex justify-center items-center  text-purple-200 border-2 rounded-full border-purple-200 -inset-1 bg-gradient-to-r from-purple-600 to-purple-300 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#b454fc,0_0_15px_#b454fc,0_0_30px_#b454fc]">
          <span>T</span>
        </div>
        <div className="w-40 text-8xl font-serif h-40 flex justify-center items-center  text-teal-200 border-2 rounded-full border-teal-200 -inset-1 bg-gradient-to-r from-teal-600 to-teal-200 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#639B95,0_0_15px_#639B95,0_0_30px_#639B95]">
          <span>L</span>
        </div>
      </div>

      <div className="relative flex-wrap gap-10 w-full font-serif h-1/2 p-10 box-border rounded-lg bg-sky-200 shadow-xl flex">
        <div className="h-[150px]  font-serif w-[150px] bg-gradient-to-r from-sky-600 text-sky-200 to-sky-300 m-auto box-border rounded-full shadow-[5px_5px_10px_#88d3fb,-5px_-5px_10px_#abe0fc] flex justify-center items-center text-8xl">
          E
        </div>
        <div className="h-[150px]  font-serif w-[150px] m-auto text-purple-200  bg-gradient-to-r from-purple-600 to-purple-300 box-border rounded-full shadow-[5px_5px_10px_#d5b0f8,-5px_-5px_10px_#e8cdfe] flex justify-center items-center text-8xl">
          T
        </div>
        <div className="h-[150px]  font-serif w-[150px] text-teal-200 bg-gradient-to-r  transition-all  from-teal-600 to-teal-200 m-auto box-border rounded-full shadow-[5px_5px_10px_#4ce6d9,-5px_-5px_10px_#8fefe7] flex justify-center items-center text-8xl hover:shadow-[inset_6px_6px_6px_#8fefe7,inset_-6px_-6px_12px_#4ce6d9] hover:from-teal-200 hover:to-teal-200 hover:text-teal-800 ">
          L
        </div>
      </div>
      <div className="relative flex-wrap gap-10 w-full font-serif h-1/2 p-10 box-border rounded-lg bg-purple-200 shadow-xl flex">
        <div className="h-[150px]  font-serif w-[150px] m-auto box-border border-none text-sky-800  bg-sky-200 rounded-full  flex justify-center items-center outline-none text-8xl shadow-[inset_6px_6px_6px_#abe0fc,inset_-6px_-6px_12px_#88d3fb]">
          E
        </div>

        <div className="h-[150px]  font-serif w-[150px] m-auto box-border border-none text-purple-800   rounded-full  flex justify-center items-center outline-none text-8xl bg-purple-200 shadow-[inset_6px_6px_6px_#e8cdfe,inset_-6px_-6px_12px_#d5b0f8]">
          T
        </div>

        <div className="h-[150px]  font-serif w-[150px] m-auto box-border border-none text-teal-800   bg-teal-200 rounded-full  flex justify-center items-center outline-none text-8xl shadow-[inset_6px_6px_6px_#8fefe7,inset_-6px_-6px_12px_#4ce6d9]">
          L
        </div>
      </div>
      <div className="relative flex-wrap gap-10 w-full font-serif h-1/2 p-10 box-border rounded-lg bg-slate-800 shadow-xl flex">
        <div className="h-[150px]  font-serif w-[150px] bg-gradient-to-r from-sky-600 text-sky-200 to-sky-300 m-auto box-border rounded-full shadow-[5px_5px_10px_#88d3fb,-5px_-5px_10px_#abe0fc] flex justify-center items-center text-8xl">
          E
        </div>
        <div className="h-[150px]  font-serif w-[150px] m-auto text-purple-200  bg-gradient-to-r from-purple-600 to-purple-300 box-border rounded-full shadow-[5px_5px_10px_#d5b0f8,-5px_-5px_10px_#e8cdfe] flex justify-center items-center text-8xl">
          T
        </div>
        <div className="h-[150px]  font-serif w-[150px] text-teal-200 bg-gradient-to-r from-teal-600 to-teal-200 m-auto box-border rounded-full shadow-[5px_5px_10px_#4ce6d9,-5px_-5px_10px_#8fefe7] flex justify-center items-center text-8xl hover:shadow-[inset_6px_6px_6px_#8fefe7,inset_-6px_-6px_12px_#4ce6d9] hover:from-teal-200 hover:to-teal-200 hover:text-teal-800 transition-all ">
          L
        </div>
      </div>
      <div className="relative flex-wrap gap-10 w-full font-serif h-1/2 p-10 box-border rounded-lg  bg-slate-800 shadow-xl flex">
        <div className="h-[150px]  font-serif w-[150px] m-auto box-border border-none text-sky-800  bg-sky-200 rounded-full  flex justify-center items-center outline-none text-8xl shadow-[inset_6px_6px_6px_#abe0fc,inset_-6px_-6px_12px_#88d3fb]">
          E
        </div>

        <div className="h-[150px]  font-serif w-[150px] m-auto box-border border-none text-purple-800   rounded-full  flex justify-center items-center outline-none text-8xl bg-purple-200 shadow-[inset_6px_6px_6px_#e8cdfe,inset_-6px_-6px_12px_#d5b0f8]">
          T
        </div>

        <div className="h-[150px]  font-serif w-[150px] m-auto box-border border-none text-teal-800   bg-teal-200 rounded-full  flex justify-center items-center outline-none text-8xl shadow-[inset_6px_6px_6px_#8fefe7,inset_-6px_-6px_12px_#4ce6d9]">
          L
        </div>
      </div>
    </>
  );
}

export default ColorCircles;
