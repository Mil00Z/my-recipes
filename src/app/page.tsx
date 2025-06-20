'use client';

import {useEffect, useState} from "react";

import { useStore } from "@/hooks/dataStore";
import type { Filter } from "@/types/filter.types";
import type { Recipe } from "@/types/recipe.types";
import type { Tag } from "@/types/tag.types";


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

  const {recipes,tags,matchingRecipes,updateResults} = useStore();



  useEffect(() => {

    updateResults(recipes);

  }, []);



  useEffect(() => {
    
      // gros soucis de source de données, on tourne en rond
      const baseSource = matchingRecipes?.length > 0 && matchingRecipes!== recipes ? matchingRecipes : recipes;

  
    if (tags.length === 0) {

      updateResults(recipes);

      return;
    }

    //Algo de Filtrage
    const filteredResults = baseSource.filter((recipe:Recipe) =>
      tags.every((tag:Tag) => {
        switch (tag.type) {
          case 'ingredients':
            return recipe.ingredients.some(ing =>
              ing.ingredient.toLowerCase() === tag.value.toLowerCase()
            );
          case 'ustensils':
            return recipe.ustensils
              .map(u => u.toLowerCase())
              .includes(tag.value.toLowerCase());
          case 'appliances':
            return recipe.appliance.toLowerCase() === tag.value.toLowerCase();
          case 'timing':
            return recipe.time === parseInt(tag.value);
          default:
            return false;
        }
      })
    );

    
    updateResults(filteredResults);
    
  }, [tags]);

 

return(
 
    <PageWrapper layout="home" >

      <section className="recipes-filter">
          <form action="/" className="form-select">
            <div className="filters-group">

              {FiltersDatas.map((filter:Filter) => {

                  return(<FilterSearch key={filter.type} type={filter.type} title={filter.title} method={filter.method} />)
              })}

              <ResetTag />

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