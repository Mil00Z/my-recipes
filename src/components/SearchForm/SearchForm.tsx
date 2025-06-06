
import { useStore } from "@/hooks/dataStore";
import type { Recipe } from "@/types/recipe.types";

import "./SearchForm.scss";


interface SearchFormProps {
  recipes: Recipe[];
  matchingRecipes: Recipe[];
  count:number;
} 

const SearchForm = ({recipes,matchingRecipes,count}:SearchFormProps) => {


//Checking Datas
function TestingInput(element) {

  console.log(element);
}

return(

    <form action="/" className="the-form">
        <label htmlFor="main-search" className="v-hidden">Recherche</label>
        <input type="search" name="main-search" id="main-search" onChange={(event) => TestingInput(event.target.value)} placeholder="Rechercher une recette, un ingrédient..."/>
        <button type="submit" className="btn btn-search" aria-label="bouton de recherche"><i className="fa-solid fa-search"></i></button>
    </form>
  )
}
export default SearchForm