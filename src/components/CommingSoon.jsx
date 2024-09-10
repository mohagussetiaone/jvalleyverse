import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CommingSoon = () => {
  const navigate = useNavigate();
  function backToHome() {
    navigate(-1);
  }

  return (
    <>
      <div className="w-full min-w-[100vw] md:min-w-[80vw] min-h-screen bg-whiteSmoke dark:bg-gradient-to-r from-black via-background-900 to-background-600">
        <div className="pt-14 md:pt-16 xl:pt-20">
          <div className="flex-1 flex flex-col items-center justify-center text-black dark:text-neutral-200">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl tracking-wider font-bold font-serif mt-12 text-center">Coming</h1>
            <h1 className="text-brand-500 text-6xl lg:text-7xl xl:text-8xl tracking-wider font-bold font-serif">Soon</h1>
            <div className="flex flex-col items-center space-y-4 mt-14">
              <p className="uppercase text-sm">Kami akan memberi tahu jika metode ini tersedia !</p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="flex gap-2 bg-brand-500 hover:bg-brand-800 hover:border-brand-800 text-white" onClick={backToHome}>
              <MdOutlineArrowBack className="w-5 h-5 mt-1" />
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommingSoon;
