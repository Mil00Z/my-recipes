import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";


// DataType from API
export interface RawEquipment {
  name: string
}

export interface RawRecipeDiff {
  Ingredients: Ingredient[];
  Ustensils: RawEquipment[];
  Appliance: RawEquipment[];
}

export type RawRecipe = RawRecipeDiff & Omit <Recipe, 'ingredients' | 'ustensils' | 'appliances'>




//Functions
export const normalizeAppliance = (dataAppliance:RawRecipe) : string => {

    if (typeof dataAppliance === "string") {
      return dataAppliance;
    }

    if (Array.isArray(dataAppliance) && dataAppliance.length > 0){

      const propExist = dataAppliance.filter((_,index) => { 

        return dataAppliance[index] && dataAppliance[index].name !== null

      })

      const filteredProp = propExist.map((obj) => {

          return obj.name ? String(obj.name) : "" ;
      })

      return filteredProp.reduce((acc, current) => acc || current, '');

    } 

    if (typeof dataAppliance === "object" && !Array.isArray(dataAppliance) && dataAppliance.name ) {

      return String(dataAppliance.name.toLowerCase());
    }

    return '';
}

export const normalizeUstensil = (dataUstensil:RawRecipe) : string[] => {


    console.log(typeof dataUstensil );

    // Pas de tableau rendu
    if (!Array.isArray(dataUstensil) || dataUstensil === null) {
        return [];
    }


    if (Array.isArray(dataUstensil) && dataUstensil.length > 0){


      const propExist = dataUstensil.filter((_,index:number)=>{

            return dataUstensil[index] && dataUstensil[index].name !== null

      });

      const filteredProp = propExist.map((obj) =>{
        return obj.name ? String(obj.name.toLowerCase()) : "";
      })

      return filteredProp;
    }
  
    
    if (typeof dataUstensil === "object" && !Array.isArray(dataUstensil) && dataUstensil.name ) {

         return [String(dataUstensil.name).toLowerCase()];

    }

    return []
}

export const normalizeIngredient = (dataIngredient:RawRecipe) : Ingredient[] => {

    console.log(typeof dataIngredient );

     // Pas de tableau rendu
    if (!Array.isArray(dataIngredient) || dataIngredient === null ){

      return [];
    } 

    if(Array.isArray(dataIngredient) && dataIngredient.length > 0) {

      const propExist = dataIngredient.filter((_,index:number)=>{

            return dataIngredient[index] && dataIngredient[index].ingredient !== null

      });

      const filteredProp = propExist.map((element) =>{

        return {
            ingredient : String(element.ingredient.toLowerCase()),
            quantity : element.quantity  ? Number(element.quantity) : undefined,
            unit : element.unit ? String(element.unit) : undefined
          }

      })

      return filteredProp
    }

    if (typeof dataIngredient === "object" && !Array.isArray(dataIngredient) && dataIngredient.ingredient){


      return [{
            ingredient : String(dataIngredient.ingredient.toLowerCase()),
            quantity : dataIngredient.quantity  ? Number(dataIngredient.quantity) : undefined,
            unit : dataIngredient.unit ? String(dataIngredient.unit.toLowercase()) : undefined
          }]

    }

    return []
}


/**
 * @param {RawRecipe} rawRecipe : recette brute provenant de l'API
 * @returns {Recipe} : recette normalisée
 */

export function normalizeRecipe(rawRecipe:RawRecipe) : Recipe {

  // console.log(`Normalisation de la recette ID ${rawRecipe.id}: ${rawRecipe.title}, ${rawRecipe.time}`);

  const cleanRecipe: Recipe = {
    id: rawRecipe.id,
    title: rawRecipe.title,
    servings: rawRecipe.servings,
    time: rawRecipe.time,
    description: rawRecipe.description,
    image:rawRecipe.image,
    //Normalisation / Case Check
    // appliance: rawRecipe.Appliances,
    appliance: normalizeAppliance(rawRecipe.Appliance || rawRecipe.appliance),
    // ustensils: rawRecipe.Ustensils,
    ustensils: normalizeUstensil(rawRecipe.Ustensil || rawRecipe.ustensils),
    // ingredients: rawRecipe.Ingredients,
    ingredients: normalizeIngredient(rawRecipe.Ingredient || rawRecipe.ingredients)
  };
 
    return cleanRecipe;
 };