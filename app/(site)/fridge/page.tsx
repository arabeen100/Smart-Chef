"use client";
import { Plus, Search, X } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";
import { getFridgeRecipes } from "../actions/getFridgeRecipes";
import RecipeCard from "../components/RecipeCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadPage from "../components/load";
const Fridge = () => {
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const ingredientsFromUrl =
    searchParams.get("ingredients")?.split(",").filter(Boolean) ?? [];

  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(ingredientsFromUrl);

  const {
    data: recipes,
    isFetched,
    isLoading
  } = useQuery({
    queryKey: ["fridgeRecipes", ingredients.join(","), page],
    queryFn: () => getFridgeRecipes(ingredients.join(","), page),
    enabled: hasSearched && ingredients.length > 0, 
  });

  useEffect(() => {
    setIngredients(ingredientsFromUrl);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ingredient.trim()) return;

    setIngredients(prev=> prev.includes(ingredient)
      ? prev
      : [...prev, ingredient])

    setIngredient("");
  };
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };
  useEffect(()=>{
    if(isFetched){
      setHasSearched(false);
    }
  },[isFetched])
  return (
    <PageTransition>
    <main className={`pt-38  mr-4 ml-4 min-[930px]:mx-auto min-[930px]:w-232.5 flex flex-col gap-6`}>
      <div>
        <p className="text-4xl font-extrabold text-white text-center ">What's in your <span className="text-primary">Fridge?</span></p>
        <p className="text-center  text-secondary mt-3">Tell us what ingredients you have, and we'll show you what magic you can make.</p>
      </div>
      <div className="p-6 bg-[#141c38] border border-secondary/30 w-full rounded-2xl">
      <form onSubmit={handleSubmit} className="flex justify-between w-full">
        <label htmlFor="search" className="absolute -left-10000"/>
        <input 
        required
        id="search"
        name="search"
        placeholder="Add an ingredient(e.g.Avocdo,Tomato,Chicken...)"
        value={ingredient}
        onChange={(e)=>{setIngredient(e.target.value)}}
        className=" focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-3 border-secondary/30 w-5/11"
        />
        <button type="submit" className="w-3/11 text-black bg-primary text-center font-bold  rounded-xl flex justify-center items-center hover:bg-primary/90 transition-colors duration-300 gap-2 cursor-pointer">
           <Plus/><span>Add</span>
        </button>
        <button type="button" onClick={()=>{setHasSearched(true);
              const params = new URLSearchParams(searchParams.toString());
               params.set("ingredients", ingredients.join(","));
               params.set("page", "1");

    router.push(`?${params.toString()}`);
        }}  className="w-2/11 text-black bg-primary grid place-content-center  rounded-xl hover:bg-primary/90 transition-colors duration-300 cursor-pointer">
        <Search size={25} className="text-black font-bold"/>
        </button>
      </form>
      {ingredients.length<=0&&
      <p className="text-secondary/70 mt-6 italic">Your list is currently empty...</p>
      }
      <div className="flex flex-wrap gap-2 mt-6">
      {ingredients.map((ing,i)=>(
        <div className="bg-slate-950 flex justify-center items-center rounded-lg gap-3 px-4 py-2 text-white border border-secondary/30" key={i}>
          <p>{ing}</p>
          <X onClick={()=>{
            setIngredients(ingredients.filter(ingr=>ingr!==ing))
          }} size={13} className="hover:text-icon1 text-white transition-colors duration-300 cursor-pointer"/>
        </div>
      ))}
      </div>
      </div>
      {isLoading?
      <LoadPage/>      
      :<div className="flex flex-col gap-6">
      {recipes?.results&&recipes?.results?.length>0&&<div className="flex flex-col gap-5 mt-5" >
      <div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-8.5 rounded-full bg-primary"/>
          <p className="text-white font-bold text-2xl">Possible Recipes</p>
        </div>
        <p className="text-secondary ml-5">Dishes you can make right now or with few extra items</p>

      </div>
      </div>}
      {recipes?.results&&recipes.results.length<=0&& <p className="text-primary text-center text-3xl font-bold">No Possible Recipes</p>}
      <div className="grid mt-5 md:grid-cols-2 gap-5 w-full auto-rows-fr">
      <RecipeCard recipes={recipes}/>
      </div> 
       {recipes?.results&&recipes?.results?.length>0&&<div className="flex justify-between items-center mt-5">
        <button
          disabled={page === 1}
          onClick={() => {changePage(page - 1);
            setHasSearched(true);
          }}
          className="text-black cursor-pointer bg-primary font-bold px-4 py-3 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white">Page {page}</span>

        <button
          disabled={recipes?.results?.length < 6||recipes?.totalResults===6}
          onClick={() => {changePage(page + 1);
            setHasSearched(true);
          }}
          className=" cursor-pointer text-black bg-primary font-bold px-4 py-3 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>}
      </div>}

      
    </main>
    </PageTransition>
  )
}

export default Fridge