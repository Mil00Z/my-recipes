'use client';

import { useStore } from "@/hooks/dataStore";

import SearchForm from "@/components/SearchForm/SearchForm";

//Styles
import "./Hero.scss";

interface HeroProps {
  title?: string;
}

const Hero = ({title}: HeroProps) => {

 const {recipes} = useStore();

return(
 
  <div className="hero">

    {title ? (<h1 className="hero-title">{title}</h1>) :(
      <>
      <h1 className="hero-title">cherchez parmi plus de <span className="initial-count">{recipes?.length ?? 0}</span> recettes<br/>du quotidien,simples et délicieuses</h1>
      <SearchForm />
      </>
      )}

  </div>
 
)

}
export default Hero