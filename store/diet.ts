import { create } from "zustand";
interface Diet{
  diet:string[],
  setDiet:(dietary:string)=>void,
  removeDiet:(dietary:string)=>void,
  resetDiet:()=>void,
}
export const useDietStore=create<Diet>((set)=>({
    diet:[],
    setDiet:(dietary)=>set((state)=>{
     const updated=[...state.diet,dietary];
     return{diet:updated}   
    }),
    removeDiet:(dietary)=>set((state)=>{
        const updated=state.diet.filter(diet=>diet!==dietary);
        return {diet:updated}
    }),
    resetDiet:()=>set({diet:[]}),

   
}))
