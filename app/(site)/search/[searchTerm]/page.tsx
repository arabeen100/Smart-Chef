import PageTransition from "@/app/(site)/components/PageTransition";
import SearchResults from "./SearchResults";
import { RecipesResponse } from "@/types/trendingRecipes";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
import { Suspense } from "react";
import LoadingPage from "@/app/loading";

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

const SearchContent = async ({
  searchTerm,
  page,
  searchParams,
}: {
  searchTerm: string;
  page: number;
  searchParams: {
    diet?: string;
    intolerances?: string;
    cuisine?: string;
  };
}) => {

  const data = await getSearchRecipes({
    page,
    searchTerm,
    diet: searchParams.diet,
    intolerances: searchParams.intolerances,
    cuisine: searchParams.cuisine,
  });

  return (
    <SearchResults
      searchTerm={searchTerm}
      recipes={data}
      page={page}
    />
  );
};

export default async function Page ({ params, searchParams }: PageProps) {
  const resolvedParams=await params;
  const resolvedSearchedParams=await searchParams;
  const searchTerm = resolvedParams.searchTerm;
  const page = Number(resolvedSearchedParams.page ?? 1);

  return (
    <PageTransition>
      <Suspense
        fallback={<LoadingPage/>
        }
      >
        <SearchContent
          searchTerm={searchTerm}
          page={page}
          searchParams={resolvedSearchedParams}
        />
      </Suspense>
    </PageTransition>
  );
}
