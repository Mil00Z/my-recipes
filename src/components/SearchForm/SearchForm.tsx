
import { useStore } from "@/hooks/dataStore";
import type { Recipe } from "@/types/recipe.types";
import type { Tag } from "@/types/tag.types";

import "./SearchForm.scss";


// interface SearchFormProps {
  //   recipes: Recipe[];
// } 

const SearchForm = () => {

  const {recipes,updateResults,tags} = useStore();

  const minimumQueryLength = 3;

  //Factoriser ce call avec un hook (identique à Tag.tsx)
  function filterRecipesByTags(sourceData: Recipe[], tags: Tag[]) {
      return sourceData.filter((recipe) =>
        tags.every((tag) => {
          switch (tag.type) {
            case 'ingredients':
              return recipe.ingredients.some(ing =>
                ing.ingredient.toLowerCase() === String(tag.value).toLowerCase()
              );
            case 'ustensils':
              return recipe.ustensils
                .some(ustensil => 
                  ustensil.name.toLowerCase() === String(tag.value).toLowerCase()
                );
            case 'appliances':
              return recipe.appliances
                .some(appliance => 
                  appliance.name.toLowerCase() === String(tag.value).toLowerCase()
                );
            case 'timing':
              return recipe.time === parseInt(String(tag.value));
            default:
              return false;
          }
        })
      );
    }
    


  //Checking Datas
  function MainSearch(element:string) {

    let baseSource = recipes;

    // complete feature search tags + Main Search
    if (tags.length > 0) {
  
      baseSource = filterRecipesByTags(recipes, tags);
  
    }

    if (element.length < minimumQueryLength) {
          updateResults(baseSource); 
          return; 
    }


    //Search
    const searchValue = element.toLowerCase();

    const results = baseSource.filter((recipe:Recipe)=> {

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

return(

    <form action="/" className="the-form">
        <label htmlFor="main-search" className="v-hidden">Recherche</label>
        <input type="search" name="main-search" id="main-search" onChange={(event) => MainSearch(event.target.value)} placeholder="Rechercher une recette, un ingrédient..." aria-label="barre de recherche de recettes" minLength={minimumQueryLength}/>
        <button type="submit" className="btn btn-search" aria-label="bouton de recherche"><i className="fa-solid fa-search"></i></button>
    </form>
  )
}
export default SearchForm