import { WobbleCard } from "@/components/ui/wobble-card.tsx";
import OnlineClass from "/onlineclass.jpeg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function MetodePembelajaran() {
  const { t } = useTranslation();
  return (
    <div className="bg-whiteSmoke dark:bg-gradient-to-bl from-black via-background-500 to-gray-800 pt-24 pb-4 md:pb-0">
      <div className="w-full text-black dark:text-neutral-200 flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-3xl text-xl lg:text-4xl font-bold text-center relative z-20">{t("Mengapa bergabung bersama kami")}</h1>
        <div className="flex flex-col items-center justify-center text-base md:text-lg md:py-6 p-4">
          <h4>{t("Saatnya belajar dengan praktisi yang berpengalaman,")}</h4>
          <h4 className="hidden md:block">{t("Tak hanya mendapatkan pembelajaran, juga dapat bertukar kreativitas untuk membangun kredibilitas komunitas Jvalleyverse")}</h4>
        </div>
      </div>
      <div className="py-4 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-4 w-auto px-4 md:px-8 xl:px-10 ">
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-400 dark:bg-brand-500 min-h-[150px] lg:min-h-[250px]" className="cursor-pointer">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="max-w-xs text-black dark:text-white">
              <h2 className="text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em]">{t("12 Batch sudah terselenggara")}</h2>
              <p className="mt-4 text-left  text-base/6">{t("Lebih dari 1000+ orang telah mengikuti hingga Batch 12")}</p>
              <p className="mt-4 text-left underline text-base/6">{t("Sekarang waktunya anda !")}</p>
            </div>
            <div>
              <img src={OnlineClass} alt="jvalleyclass.jpg" className="md:max-w-sm" />
            </div>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-800 dark:bg-background-500">
          <div className="text-neutral-200">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">{t("Anda dapat mengikuti kelas")}</h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6">{t("Kami telah menyediakan platform pelatihan secara daring agar anda dapat belajar melalui website")}</p>
            <div className="mt-4 max-w-[26rem] text-left text-base/6">
              <Link to="/belajar/project" className="bg-brand-500 p-2 rounded-xl text-white">
                {t("Join Kelas!")}
              </Link>
            </div>
          </div>
        </WobbleCard>
      </div>
    </div>
  );
}
