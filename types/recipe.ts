import {NutritionProperty,Flavonoid,Ingredient,CaloricBreakdown,WeightPerServing,Nutrient } from "./trendingRecipes";

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  imageType: string;

  servings: number;
  readyInMinutes: number;
  cookingMinutes: number | null;
  preparationMinutes: number | null;

  license: string | null;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;

  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;

  analyzedInstructions: any[]; // غالبًا فاضية
  instructions: string;

  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;

  weightWatcherSmartPoints: number;
  dishTypes: string[];

  extendedIngredients: ExtendedIngredient[];

  summary: string;
  winePairing: WinePairing;
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
export interface ExtendedIngredient {
  id: number;
  name: string;
  aisle: string;
  image: string;
  consistency: "solid" | "liquid";
  amount: number;
  unit: string;

  original: string;
  originalName: string;

  meta: string[];

  measures: Measures;
}
export interface Measures {
  metric: MeasureUnit;
  us: MeasureUnit;
}

export interface MeasureUnit {
  amount: number;
  unitLong: string;
  unitShort: string;
}
export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: WineProduct[];
}
export interface WineProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;

  averageRating: number;
  ratingCount: number;
  score: number;

  link: string;
}
