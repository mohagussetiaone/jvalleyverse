import { Link } from "react-router-dom";
import ReactImg from "@/assets/tech/reactjs.png";
import ViteImg from "@/assets/tech/vitejs.png";
import NextImg from "@/assets/tech/nextjs.png";
import TailwindImg from "@/assets/tech/tailwindcss.png";
import NodeImg from "@/assets/tech/nodejs.png";
import Project1 from "@/assets/project/project-1.png";
import { FaEye, FaGithub } from "react-icons/fa";

const ShowCaseDetail = () => {
  return (
    <section className="body-font overflow-hidden bg-white dark:bg-gradient-to-tr from-black via-brand2 to-gray-900">
      <div className="container py-10 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full md:pr-4">
            <div className="sticky top-4">
              <img alt="ecommerce" className="w-full h-auto object-cover object-center rounded border border-gray-200" src={Project1} />
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-6 mt-6 lg:mt-0 text-black dark:text-neutral-200">
            <h1 className="text-3xl title-font font-medium mb-1">Aplikasi Laundry Online</h1>
            <div className="py-2">
              <h6 className="text-sm">
                Dari <span className="font-semibold">Moh Agus Setiawan</span> Publish pada 20 April 2023
              </h6>
            </div>
            <p className="text-base font-normal text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
            {/* <p className="text-base font-semibold text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p> */}
            <div className="mt-4">
              <div>
                <h2 className="text-gray-900 dark:text-neutral-200 title-font font-medium">Teknologi yang dipakai :</h2>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                <img src={ReactImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={ViteImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={NextImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={TailwindImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={NodeImg} className="w-14 h-14 rounded-md mr-4" />
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-6">
              <Link
                to="https://jvalleyverse.vercel.app"
                target="_blank"
                className="flex gap-2 mt-6 text-gray-900 dark:text-neutral-200 bg-white dark:bg-brand2 hover:bg-gray-100 hover:text-black dark:hover:bg-brand2/70 border border-black py-2 px-8 focus:outline-none  rounded text-lg"
              >
                <FaEye className="w-5 h-5 mt-1" />
                Preview
              </Link>
              <Link to="https://github.com/mohagussetiaone" target="_blank" className="flex gap-2 mt-6 text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-black/90 hover:text-white rounded text-lg">
                <FaGithub className="w-5 h-5 mt-1" />
                Github
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseDetail;
