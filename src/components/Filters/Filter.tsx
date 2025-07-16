import { useEffect,useState } from "react";

import type { Filter } from "@/types/filter.types";
import type { Recipe } from "@/types/recipe.types";
import type { Tag } from "@/types/tag.types";
import type { Ingredient } from "@/types/ingredient.types";

import { useStore } from "@/hooks/dataStore";

//Styles
import "./Filter.scss";


const FilterSearch = ({type,title}:Filter) => {

    const {matchingRecipes,tags,updateTags,updateResults} = useStore();

    // State pour la liste filtrée à afficher
    const [displayedFilters, setDisplayedFilters] = useState<string[]>([]);


    function handleUpdateTag(value:string){

        //update tag
        updateTags({type:type,value:value});

        // filter tag
        // console.log('before',matchingRecipes)

        const filteredResults = filteredData(type,value);
        // console.log('after',filteredResults);
        
        //Update results
        updateResults(filteredResults);
       
    }

    function handleRefreshFilters(value:string){

        const currentString = value.toLowerCase();

        const filteredFilters = getFilterDatas().filter((element) => {
            
            return String(element).includes(currentString);
        })


        setDisplayedFilters(filteredFilters);

    }

   function filteredData(type: string, value: string) {
    return matchingRecipes.filter((recipe: Recipe) => {

        // 1. Vérifier tous les tags existants
        const existTags = tags.every((tag:Tag) => {
                switch(tag.type) {

                    case 'ingredients':

                    if (typeof tag.value === 'string'){

                    return recipe.ingredients.some(ing => 
                        ing.ingredient.toLowerCase() === tag.value
                    );

                    }
                    return false;

                    case 'ustensils':
                    if (typeof tag.value === 'string'){
                        return recipe.ustensils.includes(tag.value);
                    }
                    return false;
                    
                    case 'appliances':
                    if(typeof tag.value === 'string'){
                        return recipe.appliance.toLowerCase() === tag.value;
                    }
                    return false;

                    case 'timing':
                    console.log(tag.value,typeof tag.value);  
                    return recipe.time === parseInt(String(tag.value));

                    default:
                    return false;
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
                return false
            }
        })();

        // 3. La recette doit matcher tous les critères
        return existTags && newTagMatch;
    });
    }

    const getFilterDatas = () : string[] => {

    // let filtersDatas: string[] = [];    

    switch(type) {

        //Outils
        case 'appliances':{
            
            const allAppliances = matchingRecipes.map((recipe:Recipe) => recipe.appliance.toLowerCase());
           
            // /Get distinct item of a collection of values
            const filtersDatas : string[] = Array.from(new Set(allAppliances)).sort((a,b) => {
                return a.localeCompare(b);
            });
    
            return filtersDatas;
        }

        //Temps
        case 'timing': {
            
            const allTiming = matchingRecipes.map((recipe:Recipe) => recipe.time);
           
            // /Get distinct item of a collection of values
           const filtersDatas : string[] = Array.from(new Set(allTiming.map(t => t.toString()))).sort((a,b) => {
                return a.localeCompare(b, undefined, { numeric: true });
            });
    
            return filtersDatas;
        }

        //Ustensiles
        case "ustensils": {

            let ustenList: string[] = [];
    
            const ustensilsArrays : string[][] = matchingRecipes.map((recipe:Recipe) => recipe.ustensils);
    
            ustensilsArrays.forEach((singleUstensilArray:string[]) => {
    
                const singleUstensil = singleUstensilArray.map((element:string) =>{
                    return element.toLowerCase();
                });
    
                ustenList = ustenList.concat(singleUstensil);
    
            });
    
           
            const filtersDatas: string[] = Array.from(new Set(ustenList)).sort((a,b) => {
                return a.localeCompare(b);
            });
           
            return filtersDatas;

        }

        //Ingrédients
        case "ingredients": {

            let ingredList: string[] = [];
    
            const ingredientsArrays : Ingredient[][] = matchingRecipes.map((recipe:Recipe) => recipe.ingredients);
    
            
            ingredientsArrays.forEach((singleIngredientArray:Ingredient[]) => {
    
                const singleIngred = singleIngredientArray.map((element:Ingredient) =>{
                    return element.ingredient.toLowerCase();
                });
    
                ingredList = ingredList.concat(singleIngred);
    
            });
    
           
            const filtersDatas:string[] = Array.from(new Set(ingredList)).sort((a,b) => {
                return a.localeCompare(b);
            });
           
            return filtersDatas;

        }
    
       //Default Ending
        default:
        return [];
    }

    };


    useEffect(() => {
        setDisplayedFilters(getFilterDatas());
    }, [matchingRecipes]);
    
   
  return (
    <>
        <div className="filters">
            <label htmlFor={type} className="labels">
                {title} <i className="fa-solid fa-angle-down"></i>
            </label>
            <input type="search" name={type} id={type} className="search-filter" onChange={(event) => handleRefreshFilters(event.target.value)}/>
            <ul className="search-results">
                {displayedFilters?.map((element) => {
                    return <li key={element} className="option" data-value={element} onClick={() => handleUpdateTag(element)}>{element}</li>;
                })}
            </ul>
        </div>
    </>
  )
};
export default FilterSearch;