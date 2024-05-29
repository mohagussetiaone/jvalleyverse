import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ReactJs from "@/assets/tech/reactjs.png";
import ViteJs from "@/assets/tech/vitejs.png";
import NextJs from "@/assets/tech/nextjs.png";
import TailwindCss from "@/assets/tech/tailwindcss.png";
import NodeJs from "@/assets/tech/nodejs.png";

export function TechStack() {
  return (
    <div className="h-24 md:h-auto flex px-4 md:px-24 -mt-24 md:-mt-32 antialiased bg-white dark:bg-gradient-to-l from-black to-brand2 items-center justify-center relative overflow-hidden">
      <div className="w-3/12 items-center">
        <div className="flex flex-col">
          <h3 className="text-md md:text-4xl -ml-4 md:-ml-28 text-black dark:text-gray-200  font-bold mb-2">Teknologi</h3>
          <h3 className="text-xs flex md:text-2xl text-brand-500">yang dipelajari</h3>
        </div>
      </div>
      <div className="w-9/12 py-0">
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "React JS",
    image: ReactJs,
    website: "https://react.dev",
  },
  {
    name: "Vite JS",
    image: ViteJs,
    website: "https://vitejs.dev",
  },
  {
    name: "Node JS",
    image: NodeJs,
    website: "https://nodejs.org",
  },
  {
    name: "Tailwind CSS",
    image: TailwindCss,
    website: "https://tailwindcss.com",
  },
  {
    name: "Next JS",
    image: NextJs,
    website: "https://nextjs.org",
  },
];
