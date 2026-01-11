"use server";
import { RecipesResponse } from "@/types/trendingRecipes";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
export const getFridgeRecipes = async (ingredients:string,page:number): Promise<RecipesResponse> => {
    const offset=(page-1)*6
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
      `https://api.spoonacular.com/recipes/complexSearch?number=6&addRecipeNutrition=true&includeIngredients=${ingredients}&ignorePantry=true&sort=max-used-ingredients&offset=${offset}&apiKey=${apiKey}`,
    {
     cache:"no-store",
    }
  );

  if (!res.ok) {
    

   throw new Error("Failed to fetch fridge recipes"); 
  }

  return res.json();
};