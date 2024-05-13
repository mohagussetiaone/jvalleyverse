import Banner from "./components/Banner";
import { TechStack } from "./components/TechStack";
import { MetodePembelajaran } from "./components/MetodePembelajaran";
import { Gallery } from "./components/Gallery";

export default function Home() {
  return (
    <>
      <Banner />
      <TechStack />
      <MetodePembelajaran />
      <Gallery />
    </>
  );
}
