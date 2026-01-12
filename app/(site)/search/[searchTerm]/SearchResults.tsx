"use client";
import RecipeCard from "@/app/(site)/components/RecipeCard";
import { RecipesResponse } from "@/types/trendingRecipes";
import { Funnel } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  recipes: RecipesResponse;
  searchTerm: string;
  page: number;
};

const SearchResults = ({ recipes, searchTerm, page }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="pt-38 mr-4 ml-4 xl:mx-auto xl:w-300 flex flex-col gap-6">
      <div className={`flex flex-col gap-6  ${recipes?.results?.length>0?"md:flex-row md:justify-between":""}`}>
        <div>
          <p className="text-white text-3xl font-extrabold">
            Results for "{searchTerm}"
          </p>
          <p className={` ${recipes?.results?.length>0 ? "text-secondary text-sm":"text-3xl text-primary text-center mt-10 font-bold"}`}>
            {recipes?.results?.length>0?`Found ${recipes.totalResults} recipes matching your search`:"No recipes matching your search"}
          </p>
          {(recipes?.results?.length<=0)&&
          <p className="text-white text-center mt-4 text-2xl">Back To <Link href={"/"} className="underline text-primary ">Search</Link></p>
          }
        </div>

        {recipes?.results?.length>0&&<Link
          href={`/search/${searchTerm}/filter`}
          className="text-white w-full border-secondary/30 bg-gray-800/90 rounded-2xl border px-5 py-3 hover:bg-gray-800/70 transition-colors duration-300 flex items-center gap-3 md:w-fit"
        >
          <Funnel size={22} />
          Filters
        </Link>}
      </div>

      <div className="grid md:grid-cols-2 min-[1060px]:grid-cols-4 gap-5">
        <RecipeCard recipes={recipes} />
      </div>

       {recipes?.results?.length>0&&<div className="flex justify-between items-center mt-5">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="text-black cursor-pointer bg-primary font-bold px-4 py-3 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white">Page {page}</span>

        <button
          disabled={recipes?.results?.length < 12||recipes?.totalResults===12}
          onClick={() => changePage(page + 1)}
          className="text-black cursor-pointer bg-primary font-bold px-4 py-3 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>}
    </main>
  );
};

export default SearchResults;
