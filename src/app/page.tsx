'use client';

import {useEffect} from "react";

import { useStore } from "@/hooks/dataStore";



//UI
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipesList from "@/components/RecipesList/RecipesList";


const Home = () => {

const {recipes,count,matchingRecipes,incrementCount} = useStore();


useEffect(() => {

    console.log(recipes,count,matchingRecipes);
    
}, [count]);



return(
 
        <PageWrapper layout="home" >

            <section className="recipes-filter debeug">
  <form action="/" className="form-select">
    <div className="filters-group">
      <div className="filters">
        <label htmlFor="ingredients" className="labels">
          Ingrédients <i className="fa-solid fa-angle-down"></i>
        </label>
        <input type="search" name="ingredients" id="ingredients" className="search-filter"/>
        <ul className="search-results"></ul>
      </div>

      <div className="filters">
        <label htmlFor="appliances" className="labels">
          Appareils<i className="fa-solid fa-angle-down"></i>
        </label>
        <input type="search" name="appliances" id="appliances" className="search-filter"/>
        <ul className="search-results"></ul>
      </div>

      <div className="filters">
        <label htmlFor="ustensils" className="labels">
          Ustensiles<i className="fa-solid fa-angle-down"></i>
        </label>
        <input type="search" name="ustensils" id="ustensils" className="search-filter"/>
        <ul className="search-results"></ul>
      </div>

      <div className="filters">
        <label htmlFor="timing" className="labels">
          Minutages<i className="fa-solid fa-angle-down"></i>
        </label>
        <input type="search" name="timing" id="timing" className="search-filter"/>
        <ul className="search-results"></ul>
      </div>
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

          <section className="recipes-container debeug">
            <RecipesList recipes={recipes} matchingRecipes={matchingRecipes} />
            </section>

        </PageWrapper>

)
}
export default Home;