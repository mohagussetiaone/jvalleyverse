const DetailCardProductSkeleton = () => {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md bg-clip-border w-full p-4 animate-pulse">
      <div className="relative grid h-[35rem] overflow-hidden text-gray-700 bg-gray-300 dark:bg-slate-700 bg-clip-border place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-gray-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          ></path>
        </svg>
      </div>
      <div className="h-[23rem] overflow-hidden mt-4 text-gray-700 bg-gray-300 dark:bg-slate-700 bg-clip-border">
        <div className="w-56 h-10 m-4 justify-start mb-2 font-sans text-base antialiased font-light bg-white dark:bg-gray-300 text-inherit">&nbsp;</div>
        <div className="max-w-7xl h-4 m-4 justify-start  font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit">&nbsp;</div>
        <div className="max-w-7xl h-4 m-4 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit">&nbsp;</div>
        <div className="max-w-7xl h-4 m-4 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit">&nbsp;</div>
        <div className="flex">
          <div className="w-4/6 h-44 m-4 mb-6 rounded-lg justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit" style={{ paddingTop: "16px" }}>
            <div className="w-96 h-10 m-2 mx-auto justify-center font-sans text-base antialiased font-light bg-white dark:bg-gray-300 text-inherit"></div>
            <div className="max-w-7xl h-6 mt-2 m-2 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-300 text-inherit"></div>
            <div className="max-w-7xl h-10 mt-8 m-2 rounded-xl justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-300 text-inherit"></div>
          </div>
          <div className="w-1/6 h-32 m-2 mb-6 rounded-lg justify-between font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit" style={{ paddingTop: "16px" }}></div>
          <div className="w-1/6 h-32 m-2 mb-6 rounded-lg justify-between font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit" style={{ paddingTop: "16px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default DetailCardProductSkeleton;
