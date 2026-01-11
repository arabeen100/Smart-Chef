"use client";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { getRandomRecipe } from "../actions/getRecipe";
import RecipeCard from "../components/RecipeCard";
import LoadPage from "../components/load";
const DailyClient = ({initialData}:{initialData:any}) => {
    const [isLoading,setIsLoading]=useState(false);
    const [recipe,setRecipe]=useState<any>(initialData);
    const refetch=async()=>{
        setIsLoading(true);
        const data=await getRandomRecipe();
        setRecipe(data?.recipes??[]);
        setIsLoading(false);
    }
  return (
    <main className={`pt-38  mr-4 ml-4 min-[620px]:mx-auto min-[620px]:w-155 flex flex-col items-center gap-6`}>
      <div className="text-primary  w-27 h-27 rounded-full bg-primary/20 border border-primary/30 grid place-content-center animate-[spin_20s_linear_infinite]">
      <Sparkles size={64}/>
      </div>
      <div className="text-center">
      <p className="text-5xl font-extrabold text-white">Feeling <span className="text-icon2">Lucky?</span></p>
      <p className="text-secondary text-lg mt-5">Don't know what to eat? Let our smart algorithm pick a random masterpiece for you to try today.</p>
      </div>
      <button onClick={()=>{
        refetch();
      }} className="text-black bg-primary/90 text-xl font-extrabold px-10 py-5 rounded-2xl text-center shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300 cursor-pointer mt-5">SPIN THE SPOON</button>
        <div className="flex items-center gap-3 self-start mt-5">
          <div className="w-2 h-8.5 rounded-full bg-primary"/>
          <p className="text-white font-bold text-2xl">Today's Surprise Pick
          </p>
        </div>
        {isLoading?<LoadPage/>:
        <div className="w-full mt-2">
        <RecipeCard recipes={recipe}/>
        </div>}

    </main>
  )
}

export default DailyClient