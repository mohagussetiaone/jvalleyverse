import Question from "./components/Question";
import { useAuthValidation } from "@/lib/authValidation";

const Questions = () => {
  useAuthValidation();

  return <Question />;
};

export default Questions;
