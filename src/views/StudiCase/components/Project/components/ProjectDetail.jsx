import { IoMdGitMerge } from "react-icons/io";

const ProjectDetail = () => {
  return (
    <>
      <div className="w-[100vw] px-4 h-full">
        <div className="flex gap-4 flex-col md:flex-row ">
          <div className="w-1/2">
            <iframe height="315" width="450" src="https://www.youtube.com/embed/SIDgKNa363k?si=Hh-wKdji-Q36UgPC" frameBorder="0" allowfullscreen></iframe>
          </div>
          <div className="w-1/2 bg-white rounded-lg p-2">
            <div className="flex text-start flex-col text-black">
              <button className="inline-flex gap-2 bg-blue-100 text-brand2 rounded-full px-4 py-1 text-sm font-semibold mr-2 mb-2 self-start">
                <IoMdGitMerge className="w-5 h-5 mt-0.5" />2 Chapter
              </button>
              <h4 className="text-3xl font-bold ">Build A SaaS: AI Companion</h4>
              <p>
                In this comprehensive tutorial, we ll explore the intricate details of building an advanced SaaS AI Companion using Next.js 13. Our AI Companion taps into the power of embeddings and the Pinecone vector database to ensure
                long-term memory retention, supplemented by the fast caching abilities of the Upstash Redis database. We will also use MySQL and Prisma for storing companions.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 rounded-lg p-2">
            <div className="flex bg-gradient-to-tr from-black via-brand2 to-gray-900 text-start flex-col rounded-lg p-4">
              <div className="flex flex-col gap-6">
                <h4 className="text-3xl font-bold ">Ready to start building?</h4>
                <p>Track your progress, watch with subtitles, change quality & speed, and more.</p>
                <button>Get Started</button>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-3">
              <div className="flex w-[100px] flex-col gap-2 justify-center bg-white">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeddXnTI381NYUe0tXjZQK-8CVy5s4qysapwLUq2gHDw&s" className="w-14 justify-center" />
                <p>Source Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
