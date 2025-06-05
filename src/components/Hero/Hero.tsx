'use client';

import { useStore } from "@/hooks/dataStore";

import SearchForm from "@/components/SearchForm/SearchForm";

//Styles
import "./Hero.scss";

const Hero = () => {

 const {recipes,matchingRecipes,count} = useStore();

return(

  <>
  <div className="hero">

    <h1 className="hero-title">cherchez parmi plus de <span className="initial-count">{count}</span> recettes<br/>du quotidien,simples et délicieuses</h1>

    <SearchForm recipes={recipes} matchingRecipes={matchingRecipes} count={count} />

  </div>
  </>
)

}
export default Hero