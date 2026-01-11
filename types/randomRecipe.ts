import {NutritionProperty,Flavonoid,Ingredient,CaloricBreakdown,WeightPerServing,Nutrient } from "./trendingRecipes";
export interface RandomRecipesResponse {
    recipes: Recipe[];
}
export interface Recipe {
    id: number;
    title: string;
    summary: string;
    image: string;
     vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
   readyInMinutes: number;
   diets: string[];
     nutrition: Nutrition;

}

export interface Nutrition {
  nutrients: Nutrient[];
  properties: NutritionProperty[];
  flavonoids: Flavonoid[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}