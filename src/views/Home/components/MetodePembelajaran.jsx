import { WobbleCard } from "@/components/ui/wobble-card.tsx";
import OnlineClass from "@public/onlineclass.jpeg";

export function MetodePembelajaran() {
  return (
    <div className="bg-gradient-to-bl from-black via-brand2 to-gray-800 pt-24 pb-4 md:pb-0">
      <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-3xl text-xl lg:text-4xl font-bold text-center relative z-20">Mengapa bergabung bersama kami</h1>
        <div className="flex flex-col items-center justify-center text-base md:text-lg md:py-6 p-4">
          <h4>Saatnya belajar dengan praktisi yang berpengalaman,</h4>
          <h4 className="hidden md:block">Tak hanya mendapatkan pembelajaran, juga dapat bertukar kreativitas untuk membangun kredibilitas komunitas Jvalleyverse</h4>
        </div>
      </div>
      <div className="py-4 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-4 w-auto px-4 md:px-14 ">
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-brand-500 min-h-[150px] lg:min-h-[250px]" className="cursor-pointer">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">9 Batch sudah terselenggara</h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">Lebih dari 100 orang telah mengikuti kelas Batch 9</p>
              <p className="mt-4 text-left underline text-base/6 text-neutral-200">Anda juga dapat mengikuti kelas!</p>
            </div>
            <div>
              <img src={OnlineClass} alt="jvalleyclass.jpg" className="md:max-w-sm" />
            </div>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-brand2" className="cursor-pointer">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">Anda dapat mengikuti kelas</h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">Kami telah menyediakan platform pelatihan secara daring agar anda dapat belajar melalui website</p>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            <button className="bg-brand-500">Register sekarang</button>
          </p>
        </WobbleCard>
      </div>
    </div>
  );
}
