'use client'
import { useRouter, useSearchParams } from "next/navigation";
import PageTransition from "../components/PageTransition"
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { getRecipesByNutrients } from "../actions/getRecipesByNutrients";
import LoadPage from "../components/load";
const Nutrition = () => {
const router = useRouter();
const searchParams = useSearchParams();
const minCaloriesFromUrl =String(searchParams.get("minCalories")??"");
const maxCaloriesFromUrl =String(searchParams.get("maxCalories")??"");
 const minCarbsFromUrl =String(searchParams.get("minCarbs")??"");
const maxCarbsFromUrl =String(searchParams.get("maxCarbs")??"");  
const minProteinFromUrl =String(searchParams.get("minProtein")??"");
const maxProteinFromUrl =String(searchParams.get("maxProtein")??"");
  const minFatsFromUrl =String(searchParams.get("minFats")??"");
  const maxFatsFromUrl =String(searchParams.get("maxFats")??"");
  const[hasApplied,setHasApplied]=useState<boolean>(false)
  const [minCalories,setMinCalories]=useState<string>(minCaloriesFromUrl);
  const [maxCalories,setMaxCalories]=useState<string>(maxCaloriesFromUrl);
  const [minProtein,setMinProtein]=useState<string>(minProteinFromUrl);
  const [maxProtein,setMaxProtein]=useState<string>(maxProteinFromUrl);
  const [minCarbs,setMinCarbs]=useState<string>(minCarbsFromUrl);
  const [maxCarbs,setMaxCarbs]=useState<string>(maxCarbsFromUrl);
  const [minFats,setMinFats]=useState<string>(minFatsFromUrl);
  const [maxFats,setMaxFats]=useState<string>(maxFatsFromUrl);

  const page = Number(searchParams.get("page") ?? 1);
    const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };
    const {
    data: recipes,
    isFetched,
    isLoading
  } = useQuery({
    queryKey: ["nutritionRecipes",minCalories,maxCalories,minCarbs,maxCarbs,minProtein,maxProtein,minFats,maxFats,page],
    queryFn: () => getRecipesByNutrients(maxCalories,minCalories,minCarbs,maxCarbs,minProtein,maxProtein,minFats,maxFats,page),
    enabled: hasApplied, 
  });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasApplied(true);
    const params = new URLSearchParams(searchParams.toString());
    if(minCalories){
      params.set("minCalories",minCalories);}
    if(maxCalories){
     params.set("maxCalories",maxCalories);}
     if(minProtein){
     params.set("minProtein",minProtein);}
     if(maxProtein){
     params.set("maxProtein",maxProtein);}
     if(minCarbs){
     params.set("minCarbs",minCarbs);}
     if(maxCarbs){
     params.set("maxCarbs",maxCarbs);}
     if(minFats){
     params.set("minFats",minFats);}
     if(maxFats){
     params.set("maxFats",maxFats);}
     params.set("page", "1");

    router.push(`?${params.toString()}`);
  };
    useEffect(() => {
    setMinCalories(minCaloriesFromUrl);
    setMaxCalories(maxCaloriesFromUrl);
    setMinCarbs(minCarbsFromUrl);
    setMaxCarbs(maxCarbsFromUrl);
    setMinProtein(minProteinFromUrl);
    setMaxProtein(maxProteinFromUrl);
    setMinFats(minFatsFromUrl);
    setMaxFats(maxFatsFromUrl);
  }, [searchParams]);
  useEffect(()=>{
    if(isFetched){
      setHasApplied(false);
    }
  },[isFetched])
  return (
    <PageTransition>

     <main className={`pt-38  mr-4 ml-4 xl:mx-auto xl:w-300 flex flex-col gap-6`}>
        <p className="text-white text-4xl font-extrabold mb-2">Nutrition <span className="text-primary">Explorer</span></p>
        <form onSubmit={handleSubmit} className="grid relative  md:grid-cols-2 min-[1060px]:grid-cols-4 gap-7 w-full auto-rows-fr">
        <div className="px-5 py-3 bg-[#141c38] border border-secondary/30 w-full rounded-2xl">
        <label htmlFor="minCalories" className="text-slate-400 font-bold text-xs ">CALORIES RANGE(Kcal)</label>
        <div className="flex justify-between items-center mt-5">
        <input 
        id="minCalories"
        name="minCalories"
        placeholder="50"
        value={minCalories}
        onChange={(e)=>setMinCalories(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7 "
        />
        <p className="text-secondary">to</p>
        <label htmlFor="maxCalories" className="-left-10000 absolute text-slate-400 font-bold text-xs ">CALORIES RANGE(Kcal)</label>
        <input 
        id="maxCalories"
        name="maxCalories"
        placeholder="800"
        value={maxCalories}
        type="number"
        onChange={(e)=>{setMaxCalories(e.target.value)}}
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7"
        />
        </div>
        </div>
        <div className="px-5 py-3 bg-[#141c38] border border-secondary/30 w-full rounded-2xl">
        <label htmlFor="minProtein" className="text-slate-400 font-bold text-xs ">PROTEIN RANGE(g)</label>
        <div className="flex justify-between items-center mt-5">
        <input 
        id="minProtein"
        name="minProtein"
        placeholder="10"
        value={minProtein}
        onChange={(e)=>setMinProtein(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7 "
        />
        <p className="text-secondary">to</p>
        <label htmlFor="maxProtein" className="-left-10000 absolute text-slate-400 font-bold text-xs ">CALORIES RANGE(Kcal)</label>
        <input 
        id="maxProtein"
        name="maxProtein"
        placeholder="100"
        value={maxProtein}
        onChange={(e)=>setMaxProtein(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7"
        />
        </div>
        </div>
        <div className="px-5 py-3 bg-[#141c38] border border-secondary/30 w-full rounded-2xl">
        <label htmlFor="minCarbs" className="text-slate-400 font-bold text-xs ">CARBS RANGE(g)</label>
        <div className="flex justify-between items-center mt-5">
        <input 
        id="minCarbs"
        name="minCarbs"
        placeholder="10"
        value={minCarbs}
        onChange={(e)=>setMinCarbs(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7 "
        />
        <p className="text-secondary">to</p>
        <label htmlFor="maxCarbs" className="-left-10000 absolute text-slate-400 font-bold text-xs ">CALORIES RANGE(Kcal)</label>
        <input 
        id="maxCarbs"
        name="maxCarbs"
        placeholder="100"
        value={maxCarbs}
        onChange={(e)=>setMaxCarbs(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7"
        />
        </div>
        </div>
        <div className="px-5 py-3 bg-[#141c38] border border-secondary/30 w-full rounded-2xl">
        <label htmlFor="minFats" className="text-slate-400 font-bold text-xs ">FATS RANGE(g)</label>
        <div className="flex justify-between items-center mt-5">
        <input 
        id="minFats"
        name="minFats"
        placeholder="1"
        value={minFats}
        onChange={(e)=>setMinFats(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7 "
        />
        <p className="text-secondary">to</p>
        <label htmlFor="maxFats" className="-left-10000 absolute text-slate-400 font-bold text-xs ">CALORIES RANGE(Kcal)</label>
        <input 
        id="maxFats"
        name="maxFats"
        placeholder="100"
        value={maxFats}
        onChange={(e)=>setMaxFats(e.target.value)}
        type="number"
        className=" focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/50 bg-back_nav_footer border text-white rounded-xl p-2 border-secondary/30 w-3/7"
        />
        </div>
        </div>
        <button className="text-black absolute -bottom-20  cursor-pointer bg-primary rounded-2xl text-center font-bold w-full px-12 py-3 hover:bg-primary/80 transition-colors duration-300 ">Apply Nutrients</button>
        </form>
       {isLoading?
       <div className="mt-23">
       <LoadPage/>
       </div> 
       :<div>
      {recipes?.results&&recipes?.results?.length>0&&<div className="flex flex-col gap-5 mt-23" >
      <div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-8.5 rounded-full bg-primary"/>
          <p className="text-white font-bold text-2xl">Smart Recommendations</p>
        </div>
        <p className="text-secondary ml-5">Recipes optimized for your nutritional targets</p>

      </div>
      </div>}
      {recipes?.results&&recipes.results.length<=0&& <p className="text-primary text-center text-3xl mt-20 font-bold">No Possible Recipes</p>}
      <div className="grid mt-5  md:grid-cols-2 min-[1060px]:grid-cols-3 gap-5 w-full auto-rows-fr">
      <RecipeCard recipes={recipes}/>
      </div>
       {recipes?.results&&recipes?.results?.length>0&&<div className="flex justify-between items-center mt-5">
        <button
          disabled={page === 1}
          onClick={() => {changePage(page - 1);
            setHasApplied(true);
          }}
          className="text-black cursor-pointer bg-primary font-bold px-4 py-3 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white">Page {page}</span>

        <button
          disabled={recipes?.results?.length < 6||recipes?.totalResults===6}
          onClick={() => {changePage(page + 1);
            setHasApplied(true);
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

export default Nutrition