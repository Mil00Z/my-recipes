
import type { Filter } from "@/types/filter.types";
import type { Recipe } from "@/types/recipe.types";

import { useStore } from "@/hooks/dataStore";

//Styles
import "./Filter.scss";


const FilterSearch = ({type,title,method}:Filter) => {

    const {matchingRecipes} = useStore();

    const getFilterDatas = () => {

        let filtersDatas: any[] = [];    

    switch(type) {
    
        case 'appliances':
        let allAppliances = matchingRecipes.map((recipe:Recipe) => recipe.appliance.toLowerCase());
       
        // /Get distinct item of a collection of values
        filtersDatas = Array.from(new Set(allAppliances)).sort((a,b) => {
            return a.localeCompare(b);
        });

        return filtersDatas;

        case 'timing':
        let allTiming = matchingRecipes.map((recipe:Recipe) => recipe.time);
       
        // /Get distinct item of a collection of values
       filtersDatas = Array.from(new Set(allTiming)).sort((a,b) => {
            return a - b;
        });

        return filtersDatas;


        default:
        return [];
    }

};

    const filters = getFilterDatas();

    console.log('getFilterDatas', filters);

  return (
      <>
        <div className="filters debeug">
            <label htmlFor={type} className="labels">
                {title} <i className="fa-solid fa-angle-down"></i>
            </label>
            <input type="search" name={type} id={type} className="search-filter" onChange={(event) => method(event.target.value)}/>
            <ul className="search-results">
                {filters.map((element) => {
                    return <li key={element} className="option">{element}</li>;
                })}
            </ul>
        </div>
    </>
)
};
export default FilterSearch;