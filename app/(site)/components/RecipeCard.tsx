"use client";
import { Recipe, useSavedRecipesStore } from "@/store/savedRecipes";
import { Flame,Clock, Heart } from "lucide-react";
import Link from "next/link";
const RecipeCard = ({ recipes }: { recipes: any }) => {
    const {savedRecipes, addRecipe,removeRecipe} = useSavedRecipesStore();
    const handleSaveRecipe = (recipe: any):void => {
        const savedRecipe :Recipe={
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        veryPopular: recipe.veryPopular,
        vegan: recipe.vegan,
        vegetarian: recipe.vegetarian,
        veryHealthy: recipe.veryHealthy,
        diets: recipe.diets,
        readyInMinutes: recipe.readyInMinutes,
        calories: recipe?.nutrition?.nutrients[0]?.amount,
    }
       if(savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id)){
        removeRecipe(recipe.id);
       }else{
        addRecipe(savedRecipe);
       }
    }
    const recipesList:any=Array.isArray(recipes)? recipes : recipes?.results;
  return (
      <>
        {recipesList?.map((recipe:any)=>(<Link href={`/recipe/${recipe?.id}`} className="w-full hover:scale-105 transition-transform duration-300" key={recipe.id}>
          <div className="relative ">
            <img loading="lazy" src={recipe.image} alt={recipe.title} className=" h-48 object-cover object-center rounded-t-xl w-full "/>
            <div className="absolute bottom-3 left-2 flex gap-3">
            <p className="bg-primary text-sm p-1 font-bold rounded-full w-fit ">{recipe?.vegan?"Vegan":recipe?.vegetarian?"Vegetarian":recipe?.veryHealthy?"Very Healthy":recipe?.veryPopular?"very popular":recipe?.glutenFree?"gluten free":"low FODMAP"}</p>
            {recipe?.diets?.[1] && <p className="bg-primary text-sm p-1 font-bold rounded-full w-fit ">{recipe?.diets?.[1]}</p>}
            </div>
            <div onClick={(e)=>{handleSaveRecipe(recipe);
              e.preventDefault();
              e.stopPropagation();
             
            }} className={`absolute top-3 right-4 w-10 h-10 bg-gray-800/40 hover:bg-icon1 transition-colors duration-300 grid place-content-center rounded-full cursor-pointer ${savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id) ? 'bg-icon1':''}`}>
            <Heart size={22} className={`${savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id) ? 'fill-white' : ''} text-white cursor-pointer   transition-colors duration-300`}/>
            </div>
          </div>
          <div className="w-full max-h-25 bg-[#141c38] rounded-b-xl flex flex-col justify-center px-3 py-5 gap-1.5 ">
            <p className="text-white font-semibold  ">{recipe.title.length<=50 ? recipe.title : `${recipe.title.slice(0, 50)} ... `}</p>
            <div className="flex justify-between ">
              <div className="flex items-center gap-1 ">
                <Clock size={16} className="inline text-icon2"/>
                <p className="text-secondary">{recipe.readyInMinutes} mins</p>
              </div>
              <div className="flex items-center gap-1 ">
                <Flame size={16} className="inline text-icon1"/>
                <p className="text-secondary">{recipe?.nutrition?.nutrients[0]?.amount||recipe.calories} Kcal</p>
              </div>              
            </div>
          </div>
        </Link>))}
      </>
  )
}

export default RecipeCard