import PageTransition from "@/app/(site)/components/PageTransition"
import SavedButton from "@/app/(site)/components/savedButton";
import { fetchWithApiKeyRotation } from "@/lib/api/rotation";
import { RecipeDetails } from "@/types/recipe";
import { ChefHat, ChevronLeft, Clock, Dna, Flame, Utensils } from "lucide-react"
import Link from "next/link";
import { notFound } from "next/navigation";
const getRecipe = async (id:string): Promise<RecipeDetails> => {
const res = await fetchWithApiKeyRotation(
    (apiKey) =>
     `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`);

  if (!res.ok) {
     throw new Error("Failed to fetch  recipe info"); 
  }

  return res.json();
};
interface Params{
  id:string
}
const Recipe = async({params}:{params:Params}) => {
  const resolvedParams=await params;
  const recipe=await getRecipe(resolvedParams.id);
  if(!recipe){
    notFound();
  }
  return (
    <PageTransition>
     <main className={`pt-38  mr-4 ml-4 xl:mx-auto xl:w-300 flex flex-col gap-6`}>
      <Link href={"/"} className="flex gap-1.5 items-center text-secondary"><ChevronLeft/>  Back to recipes</Link>
      <div  className="lg:flex-row lg:justify-between flex flex-col gap-6">
      <img src={recipe?.image} alt={recipe?.title} loading="lazy" className="w-full lg:h-150 lg:w-1/2  h-100 rounded-3xl lg:sticky lg:top-27.5 self-start "/>
      <div className="flex flex-col gap-6">
      {recipe?.diets?.length>0?<div className="flex gap-2">
       <div className="text-primary bg-primary/20 rounded-full w-fit px-1 py-.5 font-bold">{recipe?.diets?.[0]}</div>
       <div className="text-primary bg-primary/20 rounded-full w-fit px-1 py-.5  font-bold">{recipe?.diets?.[1]}</div>
      </div>:<div  className="text-primary bg-primary/20 rounded-full w-fit text-sm px-2 py-.5 font-bold">comfort</div>}
      <p className="text-white text-3xl font-extrabold">{recipe?.title}</p>
      <div className="flex justify-between items-center">
        <div className="px-8 py-4 bg-[#141c38] border-secondary/30 flex flex-col items-center justify-center rounded-2xl border w-[calc(33.33%-10.5px)] max-[441px]:min-h-[129.59px]">
         <Clock className="text-icon2 mb-2"/>
         <p className="text-white text-center">{recipe?.readyInMinutes}m</p>
         <p className="text-secondary text-xs font-bold text-center">READY IN</p>
        </div>
        <div className="px-8 py-4 bg-[#141c38] border-secondary/30 flex flex-col items-center justify-center rounded-2xl border w-[calc(33.33%)] max-[441px]:min-h-[129.59px]">
         <Flame className="text-icon1 mb-2"/>
         <p className="text-white text-center whitespace-nowrap">{recipe?.nutrition?.nutrients?.[0]?.amount} Kcal</p>
         <p className="text-secondary text-xs font-bold text-center">CALORIES</p>
        </div>
        <div className="px-8 py-4 bg-[#141c38] border-secondary/30 flex flex-col items-center justify-center rounded-2xl border w-[calc(33.33%-10.5px)] max-[441px]:min-h-[129.59px]">   
        <Dna className="text-primary mb-2"/>
         <p className="text-white text-center whitespace-nowrap">{recipe?.nutrition?.nutrients?.[10]?.amount} g</p>
         <p className="text-secondary text-xs font-bold text-center">PROTEIN</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-white text-xl font-bold mb-3"><Utensils size={20} className="text-primary" /> Ingredients</div>
        <div className="flex flex-col gap-4">
          {recipe?.extendedIngredients?.map((ing,i)=>(
            <div key={i} className="flex gap-3 px-3 py-3 w-full bg-[#141c38] border-secondary/30 border items-center rounded-xl" >
            <div className="w-2 h-2 rounded-full bg-primary"/>
            <p className="text-white/70">{ing.original}</p> 
            </div>
          ))}
        </div>

      </div>
      <div>
        <div className="flex items-center gap-2 text-white text-xl font-bold mb-3"><ChefHat size={20} className="text-icon1"/> Instructions</div>
        <div className="flex flex-col gap-4">
          {recipe?.analyzedInstructions?.[0]?.steps?.map((stp:any,i:number)=>(
            <div key={i} className="flex gap-3" >
            <div className="px-3 py-2 h-fit grid place-content-center font-bold rounded-lg bg-icon1 text-black">{i+1}</div>
            <p className="text-white/70">{stp.step}</p> 
            </div>
          ))}
        </div>        
      </div>
      <SavedButton recipe={recipe}/>
      </div>
      </div>

     </main>
    </PageTransition>
  )
}

export default Recipe