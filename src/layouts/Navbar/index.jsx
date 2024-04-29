import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import logoJv from "../../assets/logo/logojv.png";
import { RxHamburgerMenu } from "react-icons/rx";

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
          <div className="justify-end md:flex">
            <img src={logoJv} alt="logoJv.png" className="h-10" />
          </div>
          <div className="gap-4 items-center hidden md:flex">
            <Link to={"/home"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
              Dashboard
            </Link>
            <MenuItem setActive={setActive} active={active} item="Kursus">
              <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem title="Algochurn" href="https://algochurn.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="Prepare for tech interviews like never before." />
                <ProductItem title="Tailwind Master Kit" href="https://tailwindmasterkit.com" src="https://assets.aceternity.com/demos/tailwindmasterkit.webp" description="Production ready Tailwind css components for your next project" />
                <ProductItem
                  title="Moonbeam"
                  href="https://gomoonbeam.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                  description="Never write from scratch again. Go from idea to blog in minutes."
                />
                <ProductItem title="Rogue" href="https://userogue.com" src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png" description="Respond to government RFPs, RFIs and RFQs 10x faster using AI" />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Tentang">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hobby">Hobby</HoveredLink>
                <HoveredLink href="/individual">Individual</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                <HoveredLink href="/enterprise">Enterprise</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Testimoni">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hobby">Hobby</HoveredLink>
                <HoveredLink href="/individual">Individual</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                <HoveredLink href="/enterprise">Enterprise</HoveredLink>
              </div>
            </MenuItem>
          </div>
          <div className="flex gap-4">
            <div className="flex md:hidden">
              <button className="px-4">
                <RxHamburgerMenu className="w-4 h-4" />
                <p className="sr-only">Menu</p>
              </button>
            </div>
            <div className="hidden md:block md:mt-1.5">
              <button className="btn py-1 px-3">Mulai</button>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
}
