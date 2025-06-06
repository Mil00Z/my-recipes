'use client';

import { useStore } from "@/hooks/dataStore";

import SearchForm from "@/components/SearchForm/SearchForm";

//Styles
import "./Hero.scss";

const Hero = () => {

 const {recipes} = useStore();

return(

  <>
  <div className="hero">

    <h1 className="hero-title">cherchez parmi plus de <span className="initial-count">{recipes?.length ?? 0}</span> recettes<br/>du quotidien,simples et délicieuses</h1>

    <SearchForm recipes={recipes} />

  </div>
  </>
)

}
export default Hero