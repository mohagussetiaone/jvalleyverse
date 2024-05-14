import Banner from "./components/Banner";
import { TechStack } from "./components/TechStack";
import { MetodePembelajaran } from "./components/MetodePembelajaran";
import { Gallery } from "./components/Gallery";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <>
      <Banner />
      <TechStack />
      <MetodePembelajaran />
      <Gallery />
      <Testimonial />
    </>
  );
}
