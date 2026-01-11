import { Suspense } from "react";
import PageTransition from "../components/PageTransition";
import DailyClient from "./DailyClient";
import { getRandomRecipe } from "../actions/getRecipe";
import LoadingPage from "@/app/loading";


const DailyContent = async () => {
  const randomRecipe = await getRandomRecipe();

  return (
    <DailyClient
      initialData={randomRecipe?.recipes}
    />
  );
};

const Daily = () => {
  return (
    <PageTransition>
      <Suspense
        fallback={
           <LoadingPage/>
        }
      >
        <DailyContent />
      </Suspense>
    </PageTransition>
  );
};

export default Daily;
