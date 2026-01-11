import { ChefHat, Dna, Sparkles, Utensils } from "lucide-react"
import PageTransition from "../components/PageTransition"
const About = () => {
  return (
  <PageTransition>
   <main className={`pt-38  mr-4 ml-4 min-[940px]:mx-auto min-[940px]:w-235 flex flex-col gap-6`}>
    <p className="text-center text-primary  text-5xl font-extrabold"><span className="text-white">About</span> Smart Chef</p>
    <p className="text-center text-secondary text-lg mt-4">Empowering your kitchen with data-driven deliciousness.</p>
    <div className="md:flex md:gap-7 md:justify-between md:items-center mt-10 mb-10">
    <div className="md:w-1/2">
    <p className="text-3xl font-extrabold text-white">Our Mission</p>
    <p className="text-secondary mt-4">Smart Chef was born from a simple idea: everyone deserves to eat well, regardless of their schedule or ingredient inventory. We combine modern technology with culinary expertise to help you plan, prep, and enjoy amazing meals.</p>
    <p className="text-secondary mt-4">From managing your fridge to tracking nutritional macros, we are your digital sous-chef, available 24/7.</p>
    </div>
    <div className="bg-[#141c38] px-8 py-8 border border-secondary/30 relative group w-full md:w-1/2 mt-12 md:mt-0 rounded-2xl">
      <div className="w-32 h-32 absolute right-0 top-0 bg-green-500/10 group-hover:scale-105 rounded-bl-full transition-transform duration-200"/>
      <ChefHat size={45} className="text-primary font-bold"/>
      <p className="text-white text-lg font-bold mt-5 ">Designed for Cooks</p>
      <p className="text-secondary mt-3">Whether you're a Michelin-star home chef or just starting your culinary journey.</p>


    </div>
    </div>
    <div className="bg-[#141c38] px-8 py-12 border border-secondary/30 rounded-2xl w-full">
     <p className="text-white text-3xl font-bold text-center">The Core Pillars</p>
     <div className="md:flex md:justify-between mt-6 w-full">
    <div className="md:w-2/7">
     <Utensils size={26} className="text-primary "/>
     <p className="text-white mt-2">Zero Waste</p>
     <p className="text-sm text-secondary mt-2">Use every ingredient in your fridge effectively.</p>
     </div>
     <div className="md:w-2/7">
     <Dna size={26} className="text-primary mt-4 md:mt-0"/>
     <p className="text-white mt-2">Bio-Smart</p>
     <p className="text-sm text-secondary mt-2">Recipes tailored to your specific nutritional needs.</p>
     </div>
     <div className="md:w-2/7">
     <Sparkles size={26} className="text-primary mt-4 md:mt-0"/>
     <p className="text-white mt-2">Curated Joy</p>
     <p className="text-sm text-secondary mt-2">Discover new flavors and cuisines effortlessly.</p>
     </div>
     </div>
    </div>

   </main>
   </PageTransition>
  )
}

export default About