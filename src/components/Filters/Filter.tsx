
import type { Filter } from "@/types/filter.types";
import type { Recipe } from "@/types/recipe.types";
import type { Tag } from "@/types/tag.types";

import { useStore } from "@/hooks/dataStore";

//Styles
import "./Filter.scss";


const FilterSearch = ({type,title,method}:Filter) => {

    const {matchingRecipes,tags,updateTags,updateResults} = useStore();


    function handleUpdateTag(value:string){

        //update tag
        updateTags({type:type,value:value});

        // filter tag
        const filteredResults = filteredData(type,value);
        //Update results
        updateResults(filteredResults);
       
    }

   function filteredData(type: string, value: string) {
    return matchingRecipes.filter((recipe: Recipe) => {

        // 1. Vérifier tous les tags existants
        const existTags = tags.every((tag:Tag) => {
                switch(tag.type) {

                    case 'ingredients':
                        return recipe.ingredients.some(ing => 
                        ing.ingredient.toLowerCase() === tag.value
                    );

                    case 'ustensils':
                    return recipe.ustensils.includes(tag.value);

                    case 'appliances':
                    return recipe.appliance.toLowerCase() === tag.value;

                    case 'timing':
                    return recipe.time === parseInt(tag.value);

                    default:
                        return true
                }
            });

        // 2. Vérifier le nouveau tag
        const newTagMatch = (() => {
            switch(type) {
                case 'ingredients':
                    return recipe.ingredients.some(ing => 
                        ing.ingredient.toLowerCase() === value
                    );
                case 'ustensils':
                    return recipe.ustensils.includes(value);
                case 'appliances':
                    return recipe.appliance.toLowerCase() === value;
                case 'timing':
                    return recipe.time === parseInt(value);
                default:
                    return true;
            }
        })();

        // 3. La recette doit matcher tous les critères
        return existTags && newTagMatch;
    });
}


    const getFilterDatas = () => {

    let filtersDatas: any[] = [];    

    switch(type) {

        //Outils
        case 'appliances':
        let allAppliances = matchingRecipes.map((recipe:Recipe) => recipe.appliance.toLowerCase());
       
        // /Get distinct item of a collection of values
        filtersDatas = Array.from(new Set(allAppliances)).sort((a,b) => {
            return a.localeCompare(b);
        });

        return filtersDatas;

        //Temps
        case 'timing':
        let allTiming = matchingRecipes.map((recipe:Recipe) => recipe.time);
       
        // /Get distinct item of a collection of values
       filtersDatas = Array.from(new Set(allTiming)).sort((a,b) => {
            return a - b;
        });

        return filtersDatas;

        //Ustensiles
        case "ustensils":
        let ustenList: string[] = [];

        let ustensilsArrays : object[] = matchingRecipes.map((recipe:Recipe) => recipe.ustensils);

        // console.log(ustensilsArrays);

        ustensilsArrays.forEach((singleUstensilArray:object) => {

            let singleUstensil = singleUstensilArray.map((element:string) =>{
                return element.toLowerCase();
            });

            ustenList = ustenList.concat(singleUstensil);

        });

       
        filtersDatas = Array.from(new Set(ustenList)).sort((a,b) => {
            return a.localeCompare(b);
        });
       
	    return filtersDatas;

        //Ingrédients
        case "ingredients":
        let ingredList: string[] = [];

        let ingredientsArrays : object[] = matchingRecipes.map((recipe:Recipe) => recipe.ingredients);

        
        ingredientsArrays.forEach((singleIngredientArray:object) => {

            let singleIngred = singleIngredientArray.map((element:Recipe) =>{
                return element.ingredient.toLowerCase();
            });

            ingredList = ingredList.concat(singleIngred);

        });

       
        filtersDatas = Array.from(new Set(ingredList)).sort((a,b) => {
            return a.localeCompare(b);
        });
       
        return filtersDatas;
    
       //Default Ending
        default:
        return [];
    }

    };
    
    const filters = getFilterDatas();

  return (
      <>
        <div className="filters">
            <label htmlFor={type} className="labels">
                {title} <i className="fa-solid fa-angle-down"></i>
            </label>
            <input type="search" name={type} id={type} className="search-filter" onChange={(event) => method(event.target.value)}/>
            <ul className="search-results">
                {filters.map((element) => {
                    return <li key={element} className="option" data-value={element} onClick={() => handleUpdateTag(element)}>{element}</li>;
                })}
            </ul>
        </div>
    </>
)
};
export default FilterSearch;