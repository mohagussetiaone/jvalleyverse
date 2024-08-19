import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import BatchImage1 from "@/assets/batch/batch1.png";
import BatchImage2 from "@/assets/batch/batch2.jpg";
import BatchImage3 from "@/assets/batch/batch8.jpg";
import BannerJvalleyverse from "@/assets/logo/logo.png";

const content = [
  {
    title: "Awal mula berdirinya sekolah IT Gratis Jvalley Comunity",
    description:
      "Bermula atas keprihatinan Bpk Fadli selaz selaku CEO / Founder Jvalley. atas keresahan kaum muda mudi pada susahnya mencari lapangan pekerjaan, beliau ingin memajukkan bahwa semua dapat berkarier setingi-tingginya, mengingat besarnya potensi di industri IT kemudian beliau membuka untuk kelas kursus pemrogramman berbasis web hingga sekarang",
    content: <img src={BatchImage1} className="h-full w-full object-cover" alt="awalmula.jpg" />,
  },
  {
    title: "Program Jvalley Community",
    description:
      "Program berjalan pada Jvalley community, beliau menunjukkan konsistensi, pengorbanan serta keseriusannya untuk mengajarkan skill tanpa membeda bedakan antar satu dengan lainnya, program harus berjalan dengan lancar serta jika ada yang mempunyai kendala maka beliau akan memberikan solusi masukkan, sesekali ada challenge untuk mengukur kemampuan siswa.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img src={BatchImage2} className="h-full w-full object-cover" alt="program.jpg" />
      </div>
    ),
  },
  {
    title: "Perjalanan yang tidak mudah",
    description:
      "Pada perjalanannya tidak selalu mudah, yang paling sulit adalah ketika penyelenggaraan batch 8 dimana tempat balai latihan kursus dikenakan biaya bulanan oleh oknum tertentu, mengingat kursus gratis ini tidak ada investor tidak mempunyai pendapatan maka beliau menghentikan batch 8 tersebut, beliau hanya ingin mencerdaskan semua yang telah bergabung pada komunitas Jvalley.",
    content: <img src={BatchImage3} className="h-full w-full object-cover" alt="perjalanan.jpg" />,
  },
  {
    title: "Jvalleyverse bagian dari jvalley comunity",
    description:
      "Setiap batch mempunyai tantangan tersendiri, dari lokasi belajar yang jauh hingga kepesertaan. Moh Agus Setiawan selaku alumni Jvalley memberikan inovasi pembelajaran secara daring agar aksesibilitas yang luas, fleksibilitas, dan kemudahan yang didapatkan relatif lebih mudah untuk diikuti oleh siapapun dan dimanapun.",
    content: <img src={BannerJvalleyverse} className="h-full w-full object-contain" alt="jvalleyverse.jpg" />,
  },
];

export default function About() {
  return (
    <div>
      <h3 className="text-2xl flex justify-center py-4 bg-white dark:bg-background-900 dark:text-white">Tentang Kami</h3>
      <StickyScroll content={content} />
    </div>
  );
}
