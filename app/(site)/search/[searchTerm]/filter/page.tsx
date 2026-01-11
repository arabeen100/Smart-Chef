import PageTransition from "@/app/(site)/components/PageTransition";
import FilterClient from "./FilterClient";
import { RecipesResponse } from "@/types/trendingRecipes";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";

type Props = {
  params: { searchTerm: string };
};

const getSearchRecipes = async (
  searchTerm: string
): Promise<RecipesResponse> => {
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=4&addRecipeNutrition=true&apiKey=${apiKey}`,
    {
     cache:"no-store",
    }
  );

  if (!res.ok) { 
     throw new Error("Failed to fetch search recipes"); 
  }

  return res.json();
};

const FilterPage = async ({ params }: Props) => {
  const resolvedParams= await params;
  const searchRecipes = await getSearchRecipes(resolvedParams.searchTerm);

  return (
    <PageTransition>
    <FilterClient searchRecipes={searchRecipes} />
    </PageTransition>
  );
};

export default FilterPage;
