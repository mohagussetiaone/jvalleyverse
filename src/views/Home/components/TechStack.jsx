import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ReactJs from "@/assets/tech/reactjs.png";
import ViteJs from "@/assets/tech/vitejs.png";
import NextJs from "@/assets/tech/nextjs.png";
import TailwindCss from "@/assets/tech/tailwindcss.png";
import NodeJs from "@/assets/tech/nodejs.png";
import { useTranslation } from "react-i18next";

export function TechStack() {
  const { t } = useTranslation();
  return (
    <div className="h-24 md:h-auto flex px-4 md:px-20 xl:px-24 -mt-24 md:-mt-32 antialiased bg-white dark:bg-primaryDark/50 items-center justify-center relative overflow-hidden">
      <div className="w-3/12 items-center">
        <div className="flex flex-col">
          <h3 className="text-md text-center md:text-2xl xl:text-4xl -ml-4 md:-ml-28 text-black dark:text-gray-200  font-bold mb-2">{t("Teknologi")}</h3>
          <h3 className="text-xs flex md:text-lg xl:text-2xl md:-ml-8 xl:ml-0 text-brand-500">{t("yang dipelajari")}</h3>
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
