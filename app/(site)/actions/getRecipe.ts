"use server";
import { RandomRecipesResponse } from "@/types/randomRecipe";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
export const getRandomRecipe = async (): Promise<RandomRecipesResponse> => {
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
     `https://api.spoonacular.com/recipes/random?number=1&includeNutrition=true&apiKey=${apiKey}`,
    {
     cache:"no-store",
    }
  );

  if (!res.ok) {
  
     throw new Error("Failed to fetch random recipe");
  }

  return res.json();
};