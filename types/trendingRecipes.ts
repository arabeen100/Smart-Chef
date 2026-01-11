export interface RecipesResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
  
}
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;

  aggregateLikes: number;
  spoonacularScore: number;
  spoonacularSourceUrl: string;

  cheap: boolean;
  dairyFree: boolean;
  glutenFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;

  healthScore: number;
  weightWatcherSmartPoints: number;

  pricePerServing: number;
  readyInMinutes: number;
  servings: number;

  sourceName: string | null;
  sourceUrl: string;
  creditsText: string | null;
  license: string | null;

  summary: string;

  cuisines: string[];
  diets: string[];
  dishTypes: string[];
  occasions: string[];

  cookingMinutes: number | null;
  preparationMinutes: number | null;

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
export interface CaloricBreakdown {
  percentCarbs: number;
  percentFat: number;
  percentProtein: number;
}
export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}
export interface NutritionProperty {
  name: string;
  amount: number;
  unit: string;
}

export interface Flavonoid {
  name: string;
  amount: number;
  unit: string;
}
export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
}
export interface WeightPerServing {
  amount: number;
  unit: string;
}