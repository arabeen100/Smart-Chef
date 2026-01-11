import PageTransition from "@/app/(site)/components/PageTransition";
import SearchResults from "./SearchResults";
import { RecipesResponse } from "@/types/trendingRecipes";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";

type PageProps = {
  params: { searchTerm: string };
  searchParams: {
    page?: string;
    diet?: string;
    intolerances?: string;
    cuisine?: string;
  };
};

const getSearchRecipes = async ({
  page,
  searchTerm,
  diet,
  intolerances,
  cuisine,
}: {
  page: number;
  searchTerm: string;
  diet?: string;
  intolerances?: string;
  cuisine?: string;
}): Promise<RecipesResponse> => {
  const offset = (page - 1) * 12;

  const params = new URLSearchParams({
    query: searchTerm,
    number: "12",
    offset: String(offset),
    ...(diet && { diet }),
    ...(intolerances && { intolerances }),
    ...(cuisine && { cuisine }),
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
    throw new Error("Failed to fetch search recipes");
  }

  return res.json();
};

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const searchTerm = resolvedParams.searchTerm;
  const page = Number(resolvedSearchParams.page ?? 1);

  const data = await getSearchRecipes({
    page,
    searchTerm,
    diet: resolvedSearchParams.diet,
    intolerances: resolvedSearchParams.intolerances,
    cuisine: resolvedSearchParams.cuisine,
  });

  return (
    <PageTransition>
    <SearchResults
      searchTerm={searchTerm}
      recipes={data}
      page={page}
    />
    </PageTransition>
  );
}
