"use client"
import { useSavedRecipesStore } from "@/store/savedRecipes"
import { Recipe } from "@/store/savedRecipes";
import { Heart } from "lucide-react";
const SavedButton = ({recipe}:{recipe:any}) => {
    
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
    const {savedRecipes, addRecipe,removeRecipe} = useSavedRecipesStore();
    const handleSaveRecipe = ():void => {
       if(savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id)){
        removeRecipe(recipe.id);
       }else{
        addRecipe(savedRecipe);
       }
    }
  return (
    <div onClick={handleSaveRecipe} className={`w-full px-5 py-3 font-bold transition-all duration-300 cursor-pointer flex gap-2 items-center justify-center rounded-2xl ${savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id)?"text-white bg-[#141c38] border border-secondary/30":"text-black hover:bg-primary/90 bg-primary"} `}><Heart className={`${savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id)&&"text-white fill-white"}`} size={28}/>{savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id)?"Saved to Favorites":"Save this Recipe"}  </div>
  )
}

export default SavedButton