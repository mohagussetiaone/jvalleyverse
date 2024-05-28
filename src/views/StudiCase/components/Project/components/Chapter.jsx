import { GrLinkNext } from "react-icons/gr";

const Chapter = () => {
  return (
    <div className="w-[100vw] px-4 h-full my-4">
      <div className="flex w-full justify-center">
        <iframe height="450" width="100vw" src="https://www.youtube.com/embed/SIDgKNa363k?si=Hh-wKdji-Q36UgPC" frameBorder="0" allowfullscreen className="rounded-lg"></iframe>
      </div>
      <div className="w-full bg-white rounded-lg dark:bg-gray-700 my-6 p-2 md:p-3 xl:p-4">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex w-[50%] flex-col gap-2 text-start">
            <div className="mb-3">
              <h3 className="text-black text-2xl">Introduction</h3>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
              <div className="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: "45%" }}></div>
            </div>
            <p className="text-black">45% Complete</p>
          </div>
          <div className="flex items-center">
            <button className="flex gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600">
              Selesaikan dan lanjutkan
              <GrLinkNext className="mt-1.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeddXnTI381NYUe0tXjZQK-8CVy5s4qysapwLUq2gHDw&s" className="w-14" />
          <p className="text-black">Source Code</p>
        </div>
        <div className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white">
          <img src="https://img.freepik.com/premium-vector/discord-modern-logo_578229-177.jpg?w=740" className="w-14" />
          <p className="text-black">Discord</p>
        </div>
        <div className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/023/986/704/small/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png" className="w-14" />
          <p className="text-black">Youtube</p>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
