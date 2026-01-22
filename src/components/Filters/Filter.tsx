import { useEffect, useState } from "react";

import type { Filter } from "@/types/filter.types";
import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Ustensil } from '@/types/ustensil.types';
import type { Appliance } from '@/types/appliance.types';

import { useStore } from "@/hooks/dataStore";

//Styles
import "./Filter.scss";


const FilterSearch = ({ type, title }: Filter) => {

    const { matchingRecipes, updateTags } = useStore();

    // State pour la liste filtrée à afficher
    const [displayedFilters, setDisplayedFilters] = useState<string[]>([]);


    function handleUpdateTag(value: string) {

        //update tag
        updateTags({ type: type, value: value });

    }

    function handleRefreshFilters(value: string) {

        const currentString = value.toLowerCase();

        const filteredFilters = getFilterDatas().filter((element) => {

            return String(element).includes(currentString);
        })


        setDisplayedFilters(filteredFilters);

    }

    const getFilterDatas = (): string[] => {

        // let filtersDatas: string[] = [];    

        switch (type) {

            //Outils
            case 'appliances': {

                const appliancesList: Appliance[] = matchingRecipes.flatMap((recipe: Recipe) => recipe.appliances);


                const applianceData = appliancesList.map((appliance: Appliance) => appliance.name.toLowerCase());

                const filtersDatas = Array.from(new Set(applianceData)).sort((a, b) => {
                    return a.localeCompare(b);
                });

                return filtersDatas;
            }

            //Temps
            case 'timing': {

                const allTiming = matchingRecipes.map((recipe: Recipe) => recipe.time);

                // /Get distinct item of a collection of values
                const filtersDatas: string[] = Array.from(new Set(allTiming.map(t => t.toString()))).sort((a, b) => {
                    return a.localeCompare(b, undefined, { numeric: true });
                });

                return filtersDatas;
            }

            //Ustensiles
            case "ustensils": {

                const ustenList: Appliance[] = matchingRecipes.flatMap((recipe: Recipe) => recipe.ustensils);


                const ustenData = ustenList.map((ustensil: Ustensil) => ustensil.name.toLowerCase());

                const filtersDatas = Array.from(new Set(ustenData)).sort((a, b) => {
                    return a.localeCompare(b);
                });

                return filtersDatas;
            }

            //Ingrédients
            case "ingredients": {

                let ingredList: string[] = [];

                const ingredientsArrays: Ingredient[][] = matchingRecipes.map((recipe: Recipe) => recipe.ingredients);


                ingredientsArrays.forEach((singleIngredientArray: Ingredient[]) => {

                    const singleIngred = singleIngredientArray.map((element: Ingredient) => {
                        return element.ingredient.toLowerCase();
                    });

                    ingredList = ingredList.concat(singleIngred);

                });


                const filtersDatas: string[] = Array.from(new Set(ingredList)).sort((a, b) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchingRecipes]);


    return (
        <>
            <div className="filters">
                <label htmlFor={type} className="labels">
                    {title} <i className="fa-solid fa-angle-down"></i>
                </label>
                <input type="search" name={type} id={type} className="search-filter" onChange={(event) => handleRefreshFilters(event.target.value)} />
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