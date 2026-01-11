import { create } from "zustand";
interface Intolerance{
  intolerances:string[],
  setIntolerances:(into:string)=>void,
  removeIntolerance:(into:string)=>void,
  resetIntolerances:()=>void
}
export const useIntoleranceStore=create<Intolerance>((set)=>({
    intolerances:[],
    setIntolerances:(into)=>set((state)=>{
     const updated=[...state.intolerances,into];
     return{intolerances:updated}   
    }),
    removeIntolerance:(into)=>set((state)=>{
        const updated=state.intolerances.filter(intol=>intol!==into);
        return {intolerances:updated}
    }),
    resetIntolerances:()=>set({intolerances:[]}),

   
}))