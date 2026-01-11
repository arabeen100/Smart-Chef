import { create } from "zustand";
import { persist } from "zustand/middleware";
interface SavedRecipesState {
    savedRecipes: Recipe[];
    addRecipe: (recipe: Recipe) => void;
    removeRecipe: (recipeId: number) => void;
}
export interface Recipe {
    title: string;
    image: string;
    id: number;
    veryPopular: boolean;
    vegan: boolean;
    vegetarian: boolean;
    veryHealthy: boolean;
    diets: string[];
    readyInMinutes: number;
    calories: number;

}
export const useSavedRecipesStore = create(persist<SavedRecipesState>(
    ((set) => ({
    savedRecipes: [],
    addRecipe: (recipe) =>
    set(state => {
      const updated = [...state.savedRecipes, recipe];
      return { savedRecipes: updated };
    }),
    removeRecipe: (recipeId: number) => set((state) => { 
        const updated = state.savedRecipes.filter(recipe => recipe.id !== recipeId);
        return{ savedRecipes: updated};
     }),
})), {
    name: "saved-recipes",
  }
));