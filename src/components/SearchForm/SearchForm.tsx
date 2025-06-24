
import { useStore } from "@/hooks/dataStore";
import type { Recipe } from "@/types/recipe.types";

import "./SearchForm.scss";


interface SearchFormProps {
  recipes: Recipe[];
} 

const SearchForm = ({recipes}:SearchFormProps) => {

  const {matchingRecipes,updateResults} = useStore();

  const minimumQueryLength = 3;


//Checking Datas
function MainSearch(element:string) {

  const baseSource = matchingRecipes.length > 0 ? matchingRecipes : recipes;

  if(element.length === 0) {

    updateResults(recipes);
    return ;

  }

  if (element.length >= minimumQueryLength) {

    const searchValue = element.toLowerCase();

    let results = baseSource.filter((recipe:Recipe)=> {

                const nameMatch = recipe.title.toLowerCase().includes(searchValue);
                const descriptionMatch = recipe.description.toLowerCase().includes(searchValue);

                const ingredientsArray = recipe.ingredients.map((ingredient)=> ingredient.ingredient.toLowerCase())
               
                const ingredientMatch = ingredientsArray.some((ingredient)=> {

                    return ingredient.includes(searchValue);

                });

                return nameMatch || descriptionMatch || ingredientMatch;

            });

    updateResults(results);
  }
  
}

return(

    <form action="/" className="the-form">
        <label htmlFor="main-search" className="v-hidden">Recherche</label>
        <input type="search" name="main-search" id="main-search" onChange={(event) => MainSearch(event.target.value)} placeholder="Rechercher une recette, un ingrédient..." aria-label="barre de recherche de recettes" minLength={minimumQueryLength}/>
        <button type="submit" className="btn btn-search" aria-label="bouton de recherche"><i className="fa-solid fa-search"></i></button>
    </form>
  )
}
export default SearchForm