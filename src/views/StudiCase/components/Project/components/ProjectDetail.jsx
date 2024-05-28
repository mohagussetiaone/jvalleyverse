import { IoMdGitMerge } from "react-icons/io";

const ProjectDetail = () => {
  return (
    <>
      <div className="w-[100vw] px-4 h-full my-6">
        <div className="flex w-full h-[250px] md:[300px] xl:[350px] justify-center">
          <iframe src="https://www.youtube.com/embed/SIDgKNa363k?si=Hh-wKdji-Q36UgPC" frameBorder="0" allowfullscreen></iframe>
        </div>
        <div className="w-full gap-4 mt-6">
          <div className="flex text-start flex-col text-black bg-white p-2 md:p-4 xl:p-6 rounded-lg">
            <div className="mb-6">
              <button className="inline-flex gap-2 bg-blue-100 text-brand2 rounded-full px-4 py-1 text-sm font-semibold mr-2 mb-2 self-start">
                <IoMdGitMerge className="w-5 h-5 mt-0.5" />2 Chapter
              </button>
              <h4 className="text-3xl font-bold ">Build A SaaS: AI Companion</h4>
              <p>
                In this comprehensive tutorial, we ll explore the intricate details of building an advanced SaaS AI Companion using Next.js 13. Our AI Companion taps into the power of embeddings and the Pinecone vector database to ensure
                long-term memory retention, supplemented by the fast caching abilities of the Upstash Redis database. We will also use MySQL and Prisma for storing companions.
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 md:gap-4 xl:gap-6">
              <div className="col-span-2 bg-gray-200 text-start flex-col rounded-lg p-4 mb-2">
                <div className="flex flex-col gap-6">
                  <h4 className="text-3xl font-bold ">Ready to start building?</h4>
                  <p>Track your progress, watch with subtitles, change quality & speed, and more.</p>
                  <button className="text-white">Get Started</button>
                </div>
              </div>
              <div className="col-span-1 my-4 md:my-0">
                <div className="flex gap-4 justify-center">
                  <div className="flex w-[140px] flex-col items-center gap-2 justify-center border border-gray-500 rounded-lg px-1 md:py-3 cursor-pointer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeddXnTI381NYUe0tXjZQK-8CVy5s4qysapwLUq2gHDw&s" className="w-14" />
                    <p>Source Code</p>
                  </div>
                  <div className="flex w-[140px] flex-col items-center gap-2 justify-center border border-gray-500 rounded-lg px-1 md:py-3 cursor-pointer">
                    <img src="https://img.freepik.com/premium-vector/discord-modern-logo_578229-177.jpg?w=740" className="w-14" />
                    <p>Discord</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
