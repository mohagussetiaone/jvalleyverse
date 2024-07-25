const DiscussionSkeleton = () => {
  const items = Array.from({ length: 5 });

  return (
    <div className="w-full grid grid-cols-12 bg-white dark:bg-gray-800 shadow-md bg-clip-border animate-pulse px-2">
      <div className="col-span-12 md:col-span-9 flex flex-col text-gray-700  px-4">
        <div className="flex justify-between">
          <div className="w-32 h-8 mt-8 m-2 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="w-44 h-8 mt-8 m-2 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-40 h-6 m-2 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="w-52 h-8 m-2 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
        </div>
        {items.map((_, index) => (
          <div key={index} className="h-[18rem] overflow-hidden my-4 text-gray-700 bg-gray-300 dark:bg-slate-700 bg-clip-border">
            <div className="flex justify-between mx-4 gap-2">
              <div className="flex">
                <div className="w-20 h-8 mt-8 m-2 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
                <div className="w-20 h-8 mt-8 m-2 rounded-xl justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
              </div>
              <div className="w-24 h-8 mt-8 m-2 rounded-xl justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
            </div>
            <div className="max-w-7xl h-6 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
            <div className="max-w-7xl h-6 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
            <div className="max-w-7xl h-4 m-2 mt-6 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
            <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
            <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
            <div className="flex justify-between mx-4 gap-2">
              <div className="flex">
                <div className="w-20 h-8 m-2 rounded-xl justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
                <div className="w-20 h-8 m-2 rounded-xl justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
                <div className="w-20 h-8 m-2 rounded-xl justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 m-2 rounded-full justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
                <div className="w-24 h-6 items-center align-middle m-2 rounded-full justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-12 md:col-span-3 flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md bg-clip-border px-2">
        <div className="h-[610px] overflow-hidden my-4 text-gray-700 bg-gray-300 dark:bg-slate-700 bg-clip-border">
          <div className="max-w-7xl h-8 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2 mt-6 justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>

          <div className="max-w-7xl h-4 mt-6 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>

          <div className="max-w-7xl h-4 mt-6 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>

          <div className="max-w-7xl h-4 mt-6 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
          <div className="max-w-7xl h-4 m-2  justify-start font-sans text-base antialiased font-light bg-white dark:bg-gray-400 text-inherit"></div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionSkeleton;
