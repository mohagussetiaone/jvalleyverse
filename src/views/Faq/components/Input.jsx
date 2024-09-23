const Input = ({ handleSearch }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center dark:text-neutral-200 pt-8">
        Perlu bantuan?{" "}
        <a href="https://nethome.id/bantuan" target="_blank" className="text-black dark:text-neutral-200">
          Tanyakan kepada kami
        </a>
      </h1>
      <div className="flex items-center border border-brand-500 rounded-xl overflow-hidden mb-5 mt-3 bg-white dark:bg-transparent mx-6">
        <input className="appearance-none  bg-white dark:bg-secondaryDark/20 border-none w-full p-4 pl-5 -mr-1 leading-tight focus:outline-none" type="text" placeholder="Masukkan kata kunci" onChange={handleSearch} />
        <button className="flex-shrink-0 bg-brand-700 hover:bg-brand-900 text-sm text-white py-2 px-3 rounded-r-md" type="button">
          <img width="35" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/search--v1.png" alt="search--v1" />
        </button>
      </div>
    </>
  );
};

export default Input;
