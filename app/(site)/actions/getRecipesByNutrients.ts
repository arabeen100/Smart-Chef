"use server";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
import { RecipesResponse } from "@/types/trendingRecipes";
export const getRecipesByNutrients = async (maxCalories:string,minCalories:string,minCarbs:string,maxCarbs:string,minProtein:string,maxProtein:string,minFats:string,maxFats:string,page:number): Promise<RecipesResponse> => {
    const offset=(page-1)*6
    const params = new URLSearchParams({
    number: "6",
    offset: String(offset),
    ...(minCalories && { minCalories }),
    ...(maxCalories && { maxCalories }),
    ...(minCarbs && { minCarbs }),
    ...(maxCarbs && { maxCarbs }),
    ...(minProtein && { minProtein }),
    ...(maxProtein && { maxProtein }),
    ...(minFats && {minFat: minFats }),
    ...(maxFats && {maxFat: maxFats }),
    addRecipeNutrition: "true",
  });
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
     `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}&apiKey=${apiKey}`,
    {
     cache:"no-store",
    }
  );

  if (!res.ok) {
     throw new Error("Failed to fetch nutrition recipes"); 
  }

  return res.json();
};