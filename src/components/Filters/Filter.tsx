
import type { Filter } from "@/types/filter.types";
import type { Recipe } from "@/types/recipe.types";

import { useStore } from "@/hooks/dataStore";

//Styles
import "./Filter.scss";


const FilterSearch = ({type,title,method}:Filter) => {

    const {matchingRecipes,tag,updateTags} = useStore();

    function saveTag(element:string){

        updateTags({type:type,value:element});
       
       
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
        <div className="filters debeug">
            <label htmlFor={type} className="labels">
                {title} <i className="fa-solid fa-angle-down"></i>
            </label>
            <input type="search" name={type} id={type} className="search-filter" onChange={(event) => method(event.target.value)}/>
            <ul className="search-results">
                {filters.map((element) => {
                    return <li key={element} className="option" data-value={element} onClick={() => saveTag(element)}>{element} </li>;
                })}
            </ul>
        </div>
    </>
)
};
export default FilterSearch;