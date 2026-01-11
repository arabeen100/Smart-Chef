"use client"
import { useSavedRecipesStore } from "@/store/savedRecipes"
import { Recipe } from "@/store/savedRecipes";
const SaveButton = ({recipe}:{recipe:any}) => {
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
    <div onClick={handleSaveRecipe} className="text-white  border border-secondary rounded-xl grid place-content-center px-5 py-4 hover:bg-gray-800/90 transition-colors duration-300 font-bold text-center cursor-pointer">{savedRecipes.some(savedRecipe=>savedRecipe.id===recipe.id)?"Unsave":"Save For Later"}  </div>
  )
}

export default SaveButton