const Input = ({ handleSearch }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white pt-8">
        Perlu bantuan?{" "}
        <a href="https://nethome.id/bantuan" target="_blank" className="text-white">
          Tanyakan kepada kami
        </a>
      </h1>
      <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden mb-5 mt-3 bg-white mx-6">
        <input className="appearance-none dark:bg-navy-700 bg-white border-none w-full text-gray-700 py-2 pl-5 -mr-1 leading-tight focus:outline-none" type="text" placeholder="Masukkan kata kunci" onChange={handleSearch} />
        <button className="flex-shrink-0 bg-blue-700 hover:bg-blue-900 text-sm text-white py-2 px-3 rounded-r-md" type="button">
          <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/search--v1.png" alt="search--v1" />
        </button>
      </div>
    </>
  );
};

export default Input;
