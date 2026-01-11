"use client";
import { Search  } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation";
const SearchBox = () => {
  const router=useRouter();
  const [searchTerm,setSearchTerm]=useState<string>("");
  return (
    <div className={` w-full  bg-[#141c38] flex justify-center items-center rounded-3xl border border-secondary/30`}>
        <div className="flex flex-col gap-7 justify-center items-center py-15 max-w-[80%]">
       <p className="text-white text-center text-3xl md:text-6xl font-extrabold">What's Cooking, <span className="text-primary">Gourmet?</span></p>
       <p className="text-center text-lg text-secondary">Discover personalized recipes tailored to your nutrition, ingredients, and lifestyle.</p>
       <form onSubmit={(e)=>{
          e.preventDefault();
          router.push(`/search/${searchTerm}`)
       }} className="w-full max-w-150  relative">    
       <label className="absolute -left-10000" htmlFor="search">search</label>
       <div className="text-secondary focus-within:text-primary flex flex-col items-center w-full ">
       <input 
       required
       value={searchTerm}
       onChange={(e)=>{setSearchTerm(e.target.value)}}
       id="search" type="text" placeholder="Search recipes, ingredients, or cuisines..." className="w-full   bg-back_nav_footer border border-border_nav_footer  text-white  placeholder:text-white/50  rounded-xl py-5 pr-4 pl-12 focus:outline-none focus:border-primary transition-colors duration-300"/> 
       <button  type="submit" className="absolute right-2 top-3  bg-primary text-black  py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 cursor-pointer font-bold">Find</button>
       <Search size={26} className="absolute top-4.5 left-3 "/>
       </div>
       </form>
       </div>
    </div>
  )
}

export default SearchBox