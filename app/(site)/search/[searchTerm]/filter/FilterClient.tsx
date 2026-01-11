"use client";

import RecipeCard from "@/app/(site)/components/RecipeCard";
import { useCuisineStore } from "@/store/cuisine";
import { useDietStore } from "@/store/diet";
import { useIntoleranceStore } from "@/store/intolerances";
import { RecipesResponse } from "@/types/trendingRecipes";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
const dietaryPreferences: { name: string; value: string }[] = [
  { name: "Vegetarian", value: "vegetarian" },
  { name: "Vegan", value: "vegan" },
  { name: "Gluten-Free", value: "glutenFree" },
  { name: "Ketogenic", value: "ketogenic" },
  { name: "Pescatarian", value: "pescatarian" },
  { name: "Paleo", value: "paleo" },
  { name: "Low FODMAP", value: "lowFodmap" },
  { name: "Whole30", value: "whole30" },
  { name: "Primal", value: "primal" },
  { name: "Ovo-Vegetarian", value: "ovoVegetarian" },
  { name: "Lacto-Vegetarian", value: "lactoVegetarian" },
];

const Intolerances: { name: string; value: string }[] = [
  { name: "Dairy", value: "dairy" },
  { name: "Egg", value: "egg" },
  { name: "Gluten", value: "gluten" },
  { name: "Grain", value: "grain" },
  { name: "Peanut", value: "peanut" },
  { name: "Seafood", value: "seafood" },
  { name: "Sesame", value: "sesame" },
  { name: "Shellfish", value: "shellfish" },
  { name: "Soy", value: "soy" },
  { name: "Sulfite", value: "sulfite" },
  { name: "Tree Nut", value: "treeNut" },
  { name: "Wheat", value: "wheat" },
];

const cuisines: { name: string; value: string }[] = [
  { name: "African", value: "african" },
  { name: "American", value: "american" },
  { name: "Asian", value: "asian" },
  { name: "British", value: "british" },
  { name: "Cajun", value: "cajun" },
  { name: "Caribbean", value: "caribbean" },
  { name: "Chinese", value: "chinese" },
  { name: "Eastern European", value: "easternEuropean" },
  { name: "European", value: "european" },
  { name: "French", value: "french" },
  { name: "German", value: "german" },
  { name: "Greek", value: "greek" },
  { name: "Indian", value: "indian" },
  { name: "Irish", value: "irish" },
  { name: "Italian", value: "italian" },
  { name: "Japanese", value: "japanese" },
  { name: "Jewish", value: "jewish" },
  { name: "Korean", value: "korean" },
  { name: "Latin American", value: "latinAmerican" },
  { name: "Mediterranean", value: "mediterranean" },
  { name: "Mexican", value: "mexican" },
  { name: "Middle Eastern", value: "middleEastern" },
  { name: "Nordic", value: "nordic" },
  { name: "Southern", value: "southern" },
  { name: "Spanish", value: "spanish" },
  { name: "Thai", value: "thai" },
  { name: "Vietnamese", value: "vietnamese" },
];

type Props = {
  searchRecipes: RecipesResponse;
};

const FilterClient = ({ searchRecipes }: Props) => {
  const { searchTerm } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const{diet,setDiet,removeDiet,resetDiet}=useDietStore();
  const{intolerances,setIntolerances,removeIntolerance,resetIntolerances}=useIntoleranceStore();
  const{cuisine,setCuisine,removeCuisine,resetCuisine}=useCuisineStore();

  const diets = diet.join(",");
  const intolerancess = intolerances.join(",");
  const cuisiness = cuisine.join(",");

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (diet.length) params.set("diet", diets);
    else params.delete("diet");

    if (intolerances.length) params.set("intolerances", intolerancess);
    else params.delete("intolerances");

    if (cuisine.length) params.set("cuisine", cuisiness);
    else params.delete("cuisine");
    
    router.push(`/search/${searchTerm}?${params.toString()}`);
    resetDiet();
    resetCuisine();
    resetIntolerances();
  };

  return (
    <main className="pt-38  mr-4 ml-4 xl:mx-auto xl:w-300 flex flex-col gap-6">
        <p className="text-white text-4xl font-extrabold mb-2">Advanced <span className="text-primary">Filtering</span></p>
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between  lg:items-start w-full lg:gap-0">
        <div className="flex flex-col lg:w-2/5 gap-6">
        <div>
            <p className="text-white text-lg font-bold">Dietary Preference</p>
            <div  className="flex flex-wrap gap-2 mt-3">
                {dietaryPreferences.map((preference) => (
                    <button onClick={()=>{
                      if(diet.some(die=>die===preference.value)){
                        removeDiet(preference.value);
                      }else{
                        setDiet(preference.value);
                      }
                    }}     
                      key={preference.value} className={`cursor-pointer bg-gray-800/90 rounded-3xl border px-4 py-2 hover:text-primary hover:border-primary transition-colors duration-300 ${diet.includes(preference.value)?"text-primary border-primary":"text-white border-secondary/30"}`}>
                        {preference.name}
                    </button>
                ))}
            </div>
        </div>
        <div>
            <p className="text-white text-lg font-bold">Intolerances</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {Intolerances.map((intolerance) => (
                    <button onClick={()=>{
                      if(intolerances.some(int=>int===intolerance.value)){
                        removeIntolerance(intolerance.value);
                      }else{
                        setIntolerances(intolerance.value);
                      }
                    }}  
                    
                    key={intolerance.value} className={`cursor-pointer bg-gray-800/90 rounded-3xl border px-4 py-2 hover:text-icon1 hover:border-icon1 transition-colors duration-300 ${intolerances.includes(intolerance.value)?"text-icon1 border-icon1":"text-white border-secondary/30"}`}>
                        {intolerance.name}
                    </button>
                ))}
            </div>
        </div>
        <div>
            <p className="text-white text-lg font-bold">Cuisines</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {cuisines.map((cuisinee) => (
                    <button onClick={()=>{
                      if(cuisine.some(cus=>cus===cuisinee.value)){
                        removeCuisine(cuisinee.value);
                      }else{
                        setCuisine(cuisinee.value);
                      }
                    }}  key={cuisinee.value} className={`cursor-pointer bg-gray-800/90 rounded-3xl border  px-4 py-2 hover:text-icon2 hover:border-icon2 transition-colors duration-300 ${cuisine.includes(cuisinee.value)?"text-icon2 border-icon2":"text-white border-secondary/30"}`}>
                        {cuisinee.name}
                    </button>
                ))}
            </div>
        </div>
        <button onClick={()=>{
            applyFilters();
        }} className="text-black cursor-pointer bg-primary rounded-3xl text-center font-bold w-full px-12 py-3 hover:bg-primary/80 transition-colors duration-300">Apply Filters</button>
        </div>
        <div className="flex flex-col w-full lg:w-3/5 gap-6">
        <div className="flex gap-3 items-center mt-2">
        <div className="w-2 h-8.5 rounded-full bg-primary"/>
        <p className="text-white text-2xl font-bold">Quick Matches</p>
        </div>
        <div className="grid  md:grid-cols-2 gap-5 w-full  auto-rows-fr">
        <RecipeCard recipes={searchRecipes}/>
        </div>
        </div>
        </div>
    </main>
  );
};

export default FilterClient;
