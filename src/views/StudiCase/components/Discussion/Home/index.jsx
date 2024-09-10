import HomeCard from "./components/HomeCard";
import { useAuthValidation } from "@/lib/authValidation";

const Discussion = () => {
  useAuthValidation();

  return <HomeCard />;
};

export default Discussion;
