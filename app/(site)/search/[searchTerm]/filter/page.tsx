import { Suspense } from "react";
import PageTransition from "@/app/(site)/components/PageTransition";
import FilterClient from "./FilterClient";
import { RecipesResponse } from "@/types/trendingRecipes";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
import LoadingPage from "@/app/loading";

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
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch search recipes");
  }

  return res.json();
};


const FilterContent = async ({ searchTerm }: { searchTerm: string }) => {
  const searchRecipes = await getSearchRecipes(searchTerm);

  return <FilterClient searchRecipes={searchRecipes} />;
};

export default async function FilterPage({ params }: Props) {
  const resolvedParams=await params;
  const searchTerm =decodeURIComponent( resolvedParams.searchTerm);

  return (
    <PageTransition>
      <Suspense
        fallback={
          <LoadingPage/>
        }
      >
        <FilterContent searchTerm={searchTerm} />
      </Suspense>
    </PageTransition>
  );
}
