"use client"
import Link from "next/link";
import PageTransition from "../components/PageTransition";
import RecipeCard from "../components/RecipeCard"
import { useSavedRecipesStore } from "@/store/savedRecipes"
import { Heart } from "lucide-react";

const Favorites = () => {
  const { savedRecipes } = useSavedRecipesStore();
  return (
    <PageTransition>
    <main className={`pt-38  mr-4 ml-4 xl:mx-auto xl:w-300 flex flex-col gap-6 `}>
      <div className="flex justify-between">
        <p className="text-white text-4xl font-extrabold">Your<span className="text-icon1  ml-2">Favorites</span></p>
        <div className="text-secondary text-center p-2 text-sm rounded-full border border-secondary/30 bg-gray-800/90 w-fit">{savedRecipes?.length} items saved</div>
      </div>
      <div className="grid  md:grid-cols-2 min-[1060px]:grid-cols-4 gap-5 w-full auto-rows-fr">
      <RecipeCard recipes={savedRecipes}/>
      </div>
      {savedRecipes.length<=0&&<div className="flex mt-5 bg-[#141c38]/50 rounded-3xl py-25 px-10 flex-col gap-6 mx-auto ">
        <Heart size={50} className="text-secondary/50 font-extrabold mx-auto" />
        <div className="text-center">
          <p className="text-secondary text-2xl font-bold">No favorites yet</p>
          <p className=" text-secondary/50">Start exploring recipes and tap the heart to save them!</p>
        </div>
        <Link href={"/"} className="text-black font-bold bg-primary px-10 py-3 w-fit mx-auto rounded-xl">Explore Recipes</Link>
      </div>}
    </main>
    </PageTransition>
  )
}

export default Favorites
