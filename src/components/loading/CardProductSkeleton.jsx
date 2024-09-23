const CardProductSkeleton = () => {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md bg-clip-border rounded-xl w-[19rem] animate-pulse">
      <div className="relative grid h-44 overflow-hidden text-gray-700 bg-gray-300 dark:bg-slate-700 bg-clip-border rounded-t-xl place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-gray-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          ></path>
        </svg>
      </div>
      <div className="p-2">
        <div
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
          type="button"
        >
          &nbsp;
        </div>
      </div>
      <div className="p-2">
        <div className="block w-32 h-8 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">&nbsp;</div>
        <div className="flex gap-2">
          <div className="block min-w-14 h-6 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">&nbsp;</div>
          <div className="block min-w-14 h-6 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">&nbsp;</div>
          <div className="block min-w-14 h-6 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = () => {
  const skeletons = Array(6).fill(<CardProductSkeleton />);

  return (
    <div className="dark:bg-gradient-to-r from-background-900 to-primaryDark ">
      <div className="flex justify-between mx-6 pt-6">
        <div className="block min-w-56 h-8 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-slate-500 rounded-lg text-inherit">&nbsp;</div>
        <div className="block min-w-28 h-8 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-slate-500 rounded-lg text-inherit">&nbsp;</div>
      </div>
      <div className="grid grid-cols-3 gap-6 p-6">
        {skeletons.map((skeleton, index) => (
          <div key={index}>{skeleton}</div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGrid;
