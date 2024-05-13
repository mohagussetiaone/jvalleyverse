import { useState } from "react";
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import logoJv from "@/assets/logo/logojv.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuMoonStar, LuSunMoon } from "react-icons/lu";

export default function NavbarDemo() {
  return (
    <>
      <Navbar />
    </>
  );
}

function Navbar(className) {
  const [active, setActive] = useState(null);
  return (
    <div className={cn("fixed -top-1 left-0 w-full px-4 md:px-14 bg-white z-50 border-b border-brand-50", className)}>
      <Menu setActive={setActive} className="w-full bg-[#11090E]">
        <div className="flex mx-auto justify-between">
          <Link to="/" className="justify-end md:flex">
            <img src={logoJv} alt="logoJv.png" className="h-10" />
          </Link>
          <div className="gap-4 items-center hidden md:flex">
            <MenuItem setActive={setActive} active={active} item="Jalur belajar">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="UI/UX Design"
                  href="https://algochurn.com"
                  src="https://cdn-images-1.medium.com/max/1600/1*2PLgANgjyO4PBYuKoWsFTg.png"
                  description="Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik."
                />
                <ProductItem
                  title="Frontend Developer"
                  href="https://tailwindmasterkit.com"
                  src="https://yourserveradmin.com/wp-content/uploads/2020/04/react.jpg"
                  description="Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien."
                />
                <ProductItem
                  title="Backend Developer"
                  href="https://gomoonbeam.com"
                  src="https://dz2cdn1.dzone.com/storage/temp/14227892-1607949763897.png"
                  description="Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem"
                />
                <ProductItem
                  title="Database"
                  href="https://userogue.com"
                  src="https://www.exabytes.co.id/blog/wp-content/uploads/2021/10/ilustrasi-relational-database-1024x670.jpg"
                  description="Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya."
                />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Studi Kasus">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="Ecommerce Jajanian"
                  href="https://algochurn.com"
                  src="https://assets.aceternity.com/demos/algochurn.webp"
                  description="Jajanian adalah aplikasi yang memudahkan pembeli untuk membeli jajanan secara online"
                />
                <ProductItem title="Dashboard Jajanian" href="https://tailwindmasterkit.com" src="https://assets.aceternity.com/demos/tailwindmasterkit.webp" description="Aplikasi ini memudahkan untuk manajemen online store jajanian" />
                <ProductItem
                  title="Moonbeam"
                  href="https://gomoonbeam.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                  description="Never write from scratch again. Go from idea to blog in minutes."
                />
                <ProductItem title="Rogue" href="https://userogue.com" src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png" description="Respond to government RFPs, RFIs and RFQs 10x faster using AI" />
              </div>
            </MenuItem>
            <Link to={"/about"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
              Tentang
            </Link>
            <Link to={"/testimoni"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
              Testimoni
            </Link>
          </div>
          <div className="flex gap-4">
            <span className="cursor-pointer">
              <LuSunMoon className="mt-1.5 w-8 h-8 text-gray-800" />
            </span>
            <div className="flex md:hidden">
              <button className="px-4">
                <RxHamburgerMenu className="w-4 h-4" />
                <p className="sr-only">Menu</p>
              </button>
            </div>
            <div className="flex gap-2">
              <Link to="/signin" className="hidden md:block md:mt-1">
                <button className="btn border bg-white text-brand-500 border-brand-500 hover:border-brand-700 hover:bg-gray-100 py-1 px-3">Masuk</button>
              </Link>
              <Link to="/signup" className="hidden md:block md:mt-1">
                <button className="btn text-white bg-brand-500 hover:bg-brand-800 hover:border-brand-800 py-1 px-3">Daftar</button>
              </Link>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
}
