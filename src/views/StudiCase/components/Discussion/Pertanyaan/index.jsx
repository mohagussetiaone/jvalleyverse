import PertanyaanSaya from "./components/PertanyaanSaya";
import { useAuthValidation } from "@/lib/authValidation";

const Pertanyaan = () => {
  useAuthValidation();

  return <PertanyaanSaya />;
};

export default Pertanyaan;
