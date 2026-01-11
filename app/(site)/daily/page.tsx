import PageTransition from "../components/PageTransition"
import DailyClient from "./DailyClient"
import { getRandomRecipe } from "../actions/getRecipe"
const Daily = async() => {
  const randomRecipe=await getRandomRecipe();
  return (
    <PageTransition>
      <DailyClient
       initialData={randomRecipe?.recipes}
      />
    </PageTransition>
  )
}

export default Daily