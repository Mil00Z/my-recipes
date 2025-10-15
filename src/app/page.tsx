'use client';

import {useEffect} from "react";

import { useStore } from "@/hooks/dataStore";
import type { Filter } from "@/types/filter.types";



//UI
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FilterSearch from "@/components/Filters/Filter";
import ResetTag from "@/components/ResetTag/ResetTag";
import RecipesList from "@/components/RecipesList/RecipesList";
import TagElement from "@/components/Tag/Tag";
import Counter from "@/components/Counter/Counter";


const FiltersDatas : Filter[] = [

  {
    type : 'ingredients',
    title: 'Ingrédients',
    method : (value:string) => console.log(value)
  },
  {
    type : 'appliances',
    title: 'Appareils',
    method : (value:string) => console.log(value)
  },
  {
    type : 'ustensils',
    title: 'Ustensiles',
    method : (value:string) => console.log(value)
  },
  {
    type : 'timing',
    title: 'Minutages',
    method : (value:string) => console.log(value)
  }
]



const Home = () => {

  const {recipes,fetchRecipes,matchingRecipes,updateResults,resetTags} = useStore();


  useEffect(() => {

    // PATCH : clean UI on reload | navigation
    // updateResults(recipes);
    // resetTags();

    fetchRecipes();

  }, []);

  console.log("loading recipes",recipes);

return(
 
    <PageWrapper layout="home" >

      <section className="recipes-filter">
          <form action="/" className="form-select">
            <div className="filters-group">

              {/* {FiltersDatas.map((filter:Filter) => {

                  return(<FilterSearch key={filter.type} type={filter.type} title={filter.title} method={filter.method} />)
              })} */}

              <ResetTag />

            </div>
                
            <div className="recipe-taglist">
              <TagElement element="tag" />
            </div>

            </form>


            <Counter value={matchingRecipes.length} />
            
      </section>

      
      <RecipesList recipes={recipes} matchingRecipes={matchingRecipes} />
    

    </PageWrapper>

)
}
export default Home;