import { Helmet } from "react-helmet-async";
import Banner from "./components/Banner";
import { TechStack } from "./components/TechStack";
import { MetodePembelajaran } from "./components/MetodePembelajaran";
import { Gallery } from "./components/Gallery";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Jvalleyverse - Home</title>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logosmalldark.png" />
        <meta data-rh="true" name="robots" content="index,follow" />
        <meta data-rh="true" name="googlebot" content="index,follow" />
        <meta name="google-site-verification" content="rfHxt49m6Pm8OYRF_sbphjX7fCLLlfY_RibGFeNQuzs" />
        <meta name="viewport" content="width=device-width" />
        <meta name="title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta name="description" content="Bergabunglah dengan Jvalleyverse komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta name="keywords" content="jvalleyverse, jvalley, komunitas IT, IT gratis, belajar IT, forum IT, dukungan IT, diskusi IT, pengembangan IT, jaringan IT, teknologi informasi, pemrograman" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jvalleyverse" />
        <meta property="og:title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta property="og:description" content="Bergabunglah dengan jvalleyverse komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jvalleyverse.vercel.app/" />
        <meta property="og:image" content="/logosmalldark.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta name="twitter:description" content="Bergabunglah dengan komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta name="twitter:image" content="/logosmalldark.png" />
      </Helmet>
      <Banner />
      <TechStack />
      <MetodePembelajaran />
      <Gallery />
      <Testimonial />
    </>
  );
}
