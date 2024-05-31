const CommingSoon = () => {
  return (
    <>
      <div className="w-full min-w-[100vw] md:min-w-[80vw] h-screen bg-whiteSmoke dark:bg-gradient-to-tr from-black via-brand2 to-gray-900">
        <div className="pt-14 md:pt-16 xl:pt-20">
          <div className="flex-1 flex flex-col items-center justify-center text-black dark:text-neutral-200">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl tracking-wider font-bold font-serif mt-12 text-center">Coming</h1>
            <h1 className="text-brand-500 text-6xl lg:text-7xl xl:text-8xl tracking-wider font-bold font-serif">Soon</h1>
            <div className="flex flex-col items-center space-y-4 mt-14">
              <p className="uppercase text-sm">Kami akan memberi tahu jika metode ini tersedia !</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommingSoon;
