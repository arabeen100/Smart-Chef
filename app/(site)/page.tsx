import SearchBox from "./components/Search";
import RecipeCard from "./components/RecipeCard";
import { RecipesResponse } from "../../types/trendingRecipes";
import { RandomRecipesResponse } from "@/types/randomRecipe";
import SaveButton from "./components/SaveButton";
import Link from "next/link";
import PageTransition from "./components/PageTransition";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
const getTrendingRecipes = async (): Promise<RecipesResponse> => {
  const offset=Math.floor(Math.random()*5212);
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
      `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&offset=${offset}&number=12&addRecipeNutrition=true&apiKey=${apiKey}`,
     {cache:"no-store"}
  );

  if (!res.ok) {
    
     throw new Error("Failed to fetch trending recipes"); 
  }

  return res.json();
};
const getRandomRecipe = async (): Promise<RandomRecipesResponse> => {
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
      `https://api.spoonacular.com/recipes/random?number=1&includeNutrition=true&apiKey=${apiKey}`,
    {
     next:{revalidate:24*60*60},
    }
  );


  if (!res.ok) {
     
     throw new Error("Failed to fetch random recipe"); 
  }

  return res.json();
};
export default async function Home() {
  const trendingRecipes=await getTrendingRecipes();
  const randomRecipe=await getRandomRecipe();
  return (
   <PageTransition>
   <main className={`pt-38  mr-4 ml-4 xl:mx-auto xl:w-300 flex flex-col gap-15`}>
    <SearchBox />
    <div className="flex flex-col gap-5" >
      <div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-8.5 rounded-full bg-primary"/>
          <p className="text-white font-bold text-2xl">Trending Now</p>
        </div>
        <p className="text-secondary ml-5">Some of our most popular dishes</p>

      </div>
    </div> 
    <div className="grid  md:grid-cols-2 min-[1060px]:grid-cols-4 gap-5 w-full auto-rows-fr">
    <RecipeCard recipes={trendingRecipes}/>
    </div>
    <div className=" bg-[#f97316]/10 border-[#f97316]/20  w-full rounded-3xl border p-8 flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col gap-6">
      <div className="text-white bg-[#f97316] grid place-content-center rounded-full p-1 px-3 text-xs w-fit font-bold">
        RECIPE OF THE DAY
      </div>
      <p className="text-white text-2xl font-extrabold">{randomRecipe?.recipes[0]?.title}</p>
      <div className="flex gap-4">
        <Link href={`/recipe/${randomRecipe?.recipes[0]?.id}`} className="text-black font-bold bg-white  rounded-xl grid place-content-center px-5 py-4 hover:bg-gray-100/80 transition-colors duration-300 text-center">View Recipe</Link>
        <SaveButton recipe={randomRecipe?.recipes[0]}/>
      </div>
      </div>
      <img src={randomRecipe?.recipes[0]?.image} alt={randomRecipe?.recipes[0]?.title} loading="lazy" className=" rounded-3xl w-[98%] mx-auto md:w-[40%]   md:mx-0 "/>


    </div>


   </main>
   </PageTransition>
  );
}
