"use client";
import { ChefHat, Menu,House,Utensils,Dna,Sparkles,Heart,Info,X,ChevronRight} from "lucide-react"
import { useSavedRecipesStore } from "@/store/savedRecipes";
import Link from "next/link"
import {useState } from "react"
import { usePathname } from "next/navigation";

const NavBar = () => {
    const {savedRecipes}= useSavedRecipesStore();
    const pathname=usePathname();
    const[isOpen,setIsOpen]=useState<boolean>(false);
  return (
    <nav className="w-full fixed z-100 top-0 bg-back_nav_footer border border-border_nav_footer  py-6 flex items-center justify-between xl:justify-center">
        <div className="flex items-center justify-between w-full xl:w-300">
        <Link href="/" className="group flex ml-4 gap-2 items-center">
            <ChefHat className="text-black  bg-primary p-1.5 rounded-lg group-hover:rotate-10 transition-transform duration-300" size={40} />
            <p className="text-2xl italic text-primary font-extrabold"><span className="text-white">SMART</span>CHEF</p>
        </Link>
        <Menu onClick={()=>{
            setIsOpen(true);
        }} className={`mr-6 text-white lg:hidden cursor-pointer ${isOpen&&"hidden"}`} />
        <X className={`mr-6 text-white lg:hidden cursor-pointer ${!isOpen&&"hidden"}`} onClick={()=>{
            setIsOpen(false);
        }}/>
        <ul className={`lg:hidden absolute z-50 top-full  left-0 w-full bg-[#141c38] flex flex-col items-start gap-5 text-lg text-secondary font-bold p-4 transition-all duration-300 ease-in-out  ${isOpen? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}`}>
            <li className="w-full"><Link onClick={()=>{
                setIsOpen(false);
            }} className="flex items-center justify-between w-full" href={"/"}>Home  <ChevronRight size={20} className="inline-block cursor-pointer text-primary"/></Link>
               
            </li>
            <li className=" w-full"><Link onClick={()=>{
                setIsOpen(false);
            }}  className="flex items-center justify-between w-full" href={"/fridge"}>Fridge <ChevronRight size={20} className="inline-block cursor-pointer text-primary"/></Link>
                 
            </li>
            <li className=" w-full"><Link onClick={()=>{
                setIsOpen(false);
            }}  className="flex items-center justify-between w-full" href={"/nutrition"}>Nutrition  <ChevronRight size={20} className="inline-block cursor-pointer text-primary"/></Link>
                
            </li>
            <li className=" w-full"><Link onClick={()=>{
                setIsOpen(false);
            }}  className="flex items-center justify-between w-full" href={"/daily"}>Daily  <ChevronRight size={20} className="inline-block cursor-pointer text-primary"/></Link>
                
            </li>
            <li className=" w-full"><Link onClick={()=>{
                setIsOpen(false);
            }}  className="flex items-center justify-between w-full" href={"/favorites"}>favorites  <ChevronRight size={20} className="inline-block cursor-pointer text-primary"/></Link>
                
            </li>
            <li className=" w-full"><Link onClick={()=>{
                setIsOpen(false);
            }}  className="flex items-center justify-between w-full" href={"/about"}>About <ChevronRight size={20} className="inline-block cursor-pointer text-primary"/></Link>
                 
            </li>

        </ul>


        <ul className="hidden lg:flex items-center gap-7 text-secondary mr-6">
            <li><Link className={`flex items-center gap-2 transition-all duration-300  ${pathname==="/"?"text-primary":"text-secondary hover:text-white "}`} href="/"><House  size={20} /> <span>Home</span></Link></li>
            <li><Link className={`flex items-center gap-2 transition-all duration-300  ${pathname==="/fridge"?"text-primary":"text-secondary hover:text-white"} `} href="/fridge"><Utensils size={20} /><span>My Fridge</span> </Link></li>
            <li><Link className={`flex items-center gap-2 transition-all duration-300  ${pathname==="/nutrition"?"text-primary":"text-secondary hover:text-white"}`} href="/nutrition"><Dna size={20} /><span>Nutrition</span> </Link></li>
            <li><Link className={`flex items-center gap-2 transition-all duration-300  ${pathname==="/daily"?"text-primary":"text-secondary hover:text-white"}`} href="/daily"><Sparkles size={20} /><span>Surprise</span> </Link></li>
            <li className="relative"><Link className={`flex items-center gap-2 transition-all duration-300  ${pathname==="/favorites"?"text-primary":"text-secondary hover:text-white"}`} href="/favorites"><Heart size={20} /><span>Saved</span> </Link>
            {savedRecipes.length>0&&<div className="text-white bg-primary w-5 h-5 rounded-full grid place-content-center absolute -top-3 -left-3">{savedRecipes.length}</div>}
            </li>
            <li><Link className={`${pathname==="/about"?"text-primary":"text-secondary hover:text-white"}  transition-all duration-300`} href="/about"><Info size={20} /></Link></li>
        </ul> 
        </div>


    </nav>
  )
}

export default NavBar