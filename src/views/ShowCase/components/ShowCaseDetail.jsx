import { Link } from "react-router-dom";
import ReactImg from "@/assets/tech/reactjs.png";
import ViteImg from "@/assets/tech/vitejs.png";
import NextImg from "@/assets/tech/nextjs.png";
import TailwindImg from "@/assets/tech/tailwindcss.png";
import NodeImg from "@/assets/tech/nodejs.png";
// import GitHubImg from "@/assets/tech/github.png";
// import { GrLinkNext } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";

const ShowCaseDetail = () => {
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container py-10 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/3 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg" />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue
              bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
            </p>
            <div className="py-6">
              <div className="title-font font-medium text-xl text-gray-900">
                <span>Link Preview : </span>
                <Link to="https://jvalleyverse.vercel.app" target="_blank">
                  https://jvalleyverse.vercel.app
                </Link>
              </div>
              <div className="title-font font-medium text-xl text-gray-900">
                <span>Link Github : </span>
                <Link to="https://jvalleyverse.vercel.app" target="_blank">
                  https://jvalleyverse.vercel.app
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <h2 className="text-gray-900 title-font font-medium">Teknologi yang dipakai :</h2>
              </div>
              <div className="flex gap-2 pt-4">
                <img src={ReactImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={ViteImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={NextImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={TailwindImg} className="w-14 h-14 rounded-md mr-4" />
                <img src={NodeImg} className="w-14 h-14 rounded-md mr-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseDetail;
