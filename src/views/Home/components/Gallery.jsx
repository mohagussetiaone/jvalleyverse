import { LayoutGrid } from "@/components/ui/layout-grid";
import { useTranslation } from "react-i18next";
import BatchImage2 from "@/assets/batch/batch2.jpg";
import BatchImage3 from "@/assets/batch/batch3.jpg";
import BatchImage6 from "@/assets/batch/batch6.jpg";
import BatchImage8 from "@/assets/batch/batch8.jpg";

export function Gallery() {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gradient-to-tl text-center from-black via-background-500 to-gray-800 overflow-y-hidden pt-24">
      <div className="p-2 md:py-4 md:px-14 text-black dark:text-neutral-200">
        <h3 className="text-2xl md:text-4xl">{t("Moment sahabat Jvalleyverse")}</h3>
        <h3 className="text-sm md:text-xl py-4">{t("Jvalleyverse membangun komunitas asik, kebersamaan dalam setiap perbedaan")}</h3>
      </div>
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Jvalley batch 8</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">Saat itu berlangsung offline dan online pada Balai latihan khusus villa khayangan depok</p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Batch 10</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">Berpindah dari balai latihan khusus, kemudian bpk fadli membuka kembali kelas batch 10 di kediaman rumahnya</p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Bangkit belajar</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">Mengisi kegiatan belajar bersama komunitas jvalley</p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Ngoding asik bareng</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">Ngoding bareng kelas offline di batch 11</p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: BatchImage8,
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: BatchImage2,
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: BatchImage3,
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: BatchImage6,
  },
];
