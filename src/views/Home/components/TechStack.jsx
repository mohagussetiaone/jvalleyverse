import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";
import ReactJs from "../../../assets/tech/reactjs.png";
import ViteJs from "../../../assets/tech/vitejs.png";
import NextJs from "../../../assets/tech/nextjs.png";
import TailwindCss from "../../../assets/tech/tailwindcss.png";
import NodeJs from "../../../assets/tech/nodejs.png";

export function TechStack() {
  return (
    <div className="h-auto flex gap-8 px-24 -mt-24 antialiased bg-gradient-to-l from-black to-brand2 items-center justify-center relative overflow-hidden">
      <div className="w-3/12items-center">
        <div className="flex">
          <h3 className="text-4xl text-gray-200 font-bold mb-2">Teknologi</h3>
        </div>
        <div className="flex">
          <h3 className="text-2xl text-brand-500">yang dipelajari</h3>
        </div>
      </div>
      <div className="w-9/12">
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "React JS",
    image: ReactJs,
  },
  {
    name: "Vite JS",
    image: ViteJs,
  },
  {
    name: "Node JS",
    image: NodeJs,
  },
  {
    name: "Tailwind CSS",
    image: TailwindCss,
  },
  {
    name: "Next JS",
    image: NextJs,
  },
];
