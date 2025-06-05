'use client';

import {useEffect} from "react";

import { useStore } from "@/hooks/dataStore";
import type { Filter } from "@/types/filter.types";


//UI
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FilterSearch from "@/components/Filters/Filter";
import RecipesList from "@/components/RecipesList/RecipesList";


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

const {recipes,count,matchingRecipes,incrementCount} = useStore();

// useEffect(() => {

//     console.log(recipes,count,matchingRecipes);
    
// }, [count]);


return(
 
    <PageWrapper layout="home" >

      <section className="recipes-filter">
          <form action="/" className="form-select">
            <div className="filters-group">

              {FiltersDatas.map((filter:Filter) => {

                  return(<FilterSearch key={filter.type} type={filter.type} title={filter.title} method={filter.method} />)
              })}

            </div>
                
            <div className="recipe-taglist"></div>

            </form>

            <div className="recipes-counter" aria-label="nombre de recettes disponibles">
              <span className="count">{count}</span> recette(s)
            </div>

            <button className="btn btn-cta" onClick={() => incrementCount()}>
              one up +1
            </button>
      </section>

      <section className="recipes-container">
          <RecipesList recipes={recipes} matchingRecipes={matchingRecipes} />
      </section>

    </PageWrapper>

)
}
export default Home;