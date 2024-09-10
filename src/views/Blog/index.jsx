import Blog from "./components/Blog";
import { useAuthValidation } from "@/lib/authValidation";

const Blogs = () => {
  useAuthValidation();

  return <Blog />;
};

export default Blogs;
