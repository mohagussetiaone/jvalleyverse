import { useTranslation } from "react-i18next";
import Testimonial1 from "@/assets/testimonial/mohagus.jpeg";
import Testimonial2 from "@/assets/testimonial/nursholeh.jpeg";
import Testimonial3 from "@/assets/testimonial/husnul.jpeg";

const testimonials = [
  {
    name: "Moh Agus Setiawan",
    position: "Frontend Developer at PT Remala Abadi Tbk",
    image: Testimonial1,
    quote: "Dukungan Komunitas Platform ini menyediakan forum diskusi dan komunitas online aktif di mana peserta dapat bertukar pikiran, bertanya, dan mendapatkan dukungan dari sesama pelajar serta instruktur.",
  },

  {
    name: "Husnul Khatimah",
    position: "UI UX Designer PT Solusi Aplikasi Andalan Semesta",
    image: Testimonial3,
    quote: "Antarmuka platform Jvalleyverse sangat ramah pengguna, membuat saya mudah mengakses semua materi kursus. Kursus ini sangat membantu dalam meningkatkan keterampilan desain saya.",
  },
  {
    name: "Felisha Putri",
    position: "Software Engineer",
    image: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Jvalleyverse menawarkan kursus yang sangat relevan dengan kebutuhan industri saat ini. Setiap modul disajikan dengan sangat detail dan dilengkapi dengan contoh-contoh nyata yang memudahkan pemahaman",
  },
  {
    name: "Nur Muhammad Sholeh",
    position: "Frontend Engineer",
    image: Testimonial2,
    quote: "Jvalleyverse benar-benar memberikan saya pengetahuan yang mendalam dan relevan.",
  },
  {
    name: "Satya Syauqi",
    position: "Pelajar",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Dengan dukungan komunitas yang aktif, saya dapat berdiskusi dan bertukar pikiran dengan sesama pelajar dan instruktur. Ini sangat membantu dalam memperdalam pemahaman saya tentang topik yang dipelajari",
  },
  {
    name: "Yoga Saputra",
    position: "Backend Engineer",
    image: "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    quote: "Jvalleyverse menyediakan akses ke berbagai sumber daya tambahan yang sangat berguna. Ini sangat membantu dalam memperdalam pemahaman saya tentang topik yang dipelajari",
  },
];

const Testimonial = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonies" className="py-20 bg-whiteSmoke dark:bg-primaryDark/90 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100 text-center px-2">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center text-black dark:text-neutral-200">
            <h1 className="mb-5 text-3xl font-semibold md:text-center md:text-4xl">{t("Testimoni sahabat Jvalleyverse")}</h1>
            <p className="text-md md:text-center md:text-2xl">{t("Bagaimana mengulas dan memberi rating kepada kami")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 px-2 md:px-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`space-y-8 ${index >= 2 ? "hidden sm:block" : ""} ${index >= 4 ? "hidden lg:block" : ""}`}>
              <div className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 dark:bg-gradient-to-r from-brand-900 to-secondaryDark blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <div>
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white dark:bg-primaryDark/90 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img src={testimonial.image} className="w-12 h-12 bg-center bg-cover border rounded-full" alt={testimonial.name} />
                        <div className="text-black dark:text-neutral-200">
                          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                          <p className="text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                      <p className="leading-normal text-black dark:text-neutral-200 text-md">{testimonial.quote}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
