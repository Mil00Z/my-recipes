'use client';

import {useEffect} from "react";

import { useStore } from "@/hooks/dataStore";
import type { Filter } from "@/types/filter.types";


//UI
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FilterSearch from "@/components/Filters/Filter";
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

  const {recipes,tags,matchingRecipes,updateResults} = useStore();



  useEffect(() => {

    // if(tags.length === 0){
    //   updateResults(recipes);
    // }

    updateResults(recipes);
  }, []);

  // console.log('nbre recettes initiales',count);
  // console.log('nbre recettes updates',matchingRecipes.length);

return(
 
    <PageWrapper layout="home" >

      <section className="recipes-filter">
          <form action="/" className="form-select">
            <div className="filters-group">

              {FiltersDatas.map((filter:Filter) => {

                  return(<FilterSearch key={filter.type} type={filter.type} title={filter.title} method={filter.method} />)
              })}

            </div>
                
            <div className="recipe-taglist">
              <TagElement element="tag" />
            </div>

            </form>


            <Counter value={matchingRecipes.length} />
            
      </section>

      <section className="recipes-container">
          <RecipesList recipes={recipes} matchingRecipes={matchingRecipes} />
      </section>

    </PageWrapper>

)
}
export default Home;