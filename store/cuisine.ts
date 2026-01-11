import { create } from "zustand";
interface Cuisine{
  cuisine:string[],
  setCuisine:(cuis:string)=>void,
  removeCuisine:(cuis:string)=>void,
  resetCuisine:()=>void
}
export const useCuisineStore=create<Cuisine>((set)=>({
    cuisine:[],
    setCuisine:(cuis)=>set((state)=>{
     const updated=[...state.cuisine,cuis];
     return{cuisine:updated}   
    }),
    removeCuisine:(cuis)=>set((state)=>{
        const updated=state.cuisine.filter(cuisine=>cuisine!==cuis);
        return {cuisine:updated}
    }),
    resetCuisine:()=>set({cuisine:[]}),

   
}))