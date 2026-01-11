import { ChefHat } from "lucide-react"
import Link from "next/link"
const Footer = () => {
  return (
    <footer className="bg-back_nav_footer w-full mt-22.5 py-15   ">
      <div className="flex flex-col  gap-10 md:flex-row md:justify-around xl:w-300 xl:justify-between mx-auto">
      <div className="flex flex-col gap-5 px-5">
        <div className="flex gap-2 items-center">
            <ChefHat className="text-black  bg-primary p-1.5 rounded-lg" size={38} />
            <p className="text-2xl italic text-primary font-extrabold"><span className="text-white">SMART</span>CHEF</p>
        </div>
        <p className="text-secondary leading-9  max-w-85">
        Making healthy cooking accessible, personalized, and efficient through smart technology.
        </p> 
      </div>
      <div className="flex flex-col gap-5 px-5">
        <p className="text-white text-lg font-bold">Product</p>
        <div className="flex flex-col gap-3  text-white/70 ">
        <Link className="hover:text-primary transition-colors duration-300" href={"/fridge"}>Fridge Search</Link>
        <Link className="hover:text-primary transition-colors duration-300" href={"/nutrition"}>Nutrition Tracker</Link>
        <Link className="hover:text-primary transition-colors duration-300" href={"/daily"}>Daily Picks</Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-5 ">
        <p className="text-white text-lg font-bold">Company</p>
        <div className="flex flex-col gap-3 text-white/70 ">
        <Link className="hover:text-primary transition-colors duration-300" href={"/about"}>About Us</Link>
        </div>
      </div>
      </div>
      <div className="h-px mt-10 mb-10 bg-white/5 w-full"></div>
      <p className="text-center text-sm text-secondary/40">© 2026 Smart Chef Inc. All rights reserved. Built with love and healthy ingredients.</p>


    </footer>
  )
}

export default Footer