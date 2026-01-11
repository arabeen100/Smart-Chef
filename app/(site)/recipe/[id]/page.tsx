import LoadingPage from "@/app/loading";
import { Suspense } from "react";
import RecipeContent from "./RecipeContent";

interface Params {
  id: string;
}

const Recipe =async ({ params }: { params: Params }) => {
  const resolvedParams=await params;
  return (
    <Suspense fallback={<LoadingPage />}>
      <RecipeContent id={resolvedParams.id} />
    </Suspense>
  );
};

export default Recipe;
