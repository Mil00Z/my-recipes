import {useEffect} from 'react';


import Link from "next/link";
import Image from "next/image";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";


//Styles
import "./RecipeCard.scss";
import { Ustensil } from '@/generated/prisma';

// Définition d'un type étendu qui peut inclure les propriétés de l'API avec des majuscules.
type TempRecipe = Recipe & {
  Ingredient?: Ingredient[];
  Appliance?: { name: string }[] | string;
  Ustensil?: { name: string }[] | string[];
};

const RecipeCard = ({ recipe }: { recipe: TempRecipe}) => {

  const ingredientsToDisplay = recipe.ingredients || recipe.Ingredient;
  const applianceToDisplay = recipe.appliance || recipe.Appliance;
  const ustensilsToDisplay = recipe.ustensils || recipe.Ustensil;


  const normalizeAppliance = (dataAppliance:any) : string => {

    if (typeof dataAppliance === "string") {
      return dataAppliance;
    }

    if (Array.isArray(dataAppliance) && dataAppliance.length > 0){

      //  console.log('is array !!', dataAppliance);
       return  dataAppliance[0].name;
    } 

    if (typeof dataAppliance === "object" && !Array.isArray(dataAppliance) ) {

      // console.log('is object without array biasis',dataAppliance);
      return String(dataAppliance.name.toLowerCase());
    }

    return dataAppliance;
  }

  const normalizeUstensil = (dataUstensil:any) : string[] => {


    // Pas de tableau rendu
    if (!Array.isArray(dataUstensil) || dataUstensil === null ){

      return [];
      
    } 


    if (Array.isArray(dataUstensil) && dataUstensil.length > 0){

      console.log('array',dataUstensil.length, dataUstensil);

      // Cas de rendu de l'API
      if (typeof dataUstensil[0] === 'object' && 'name' in dataUstensil[0]) {

        const extractUstensil = dataUstensil.map((element :Ustensil) => {
          return String(element.name.toLowerCase());
        }) 

        return extractUstensil;

      } 
      // Cas si c'est un tableau de string
      else if (typeof dataUstensil[0] === 'string') {

        return dataUstensil;

      }
  
    }
    return []

  }

  const normalizeIngredient = (dataIngredient:any) : Ingredient[] => {


     // Pas de tableau rendu
    if (!Array.isArray(dataIngredient) || dataIngredient === null ){

      return [];
      
    } 

    if(Array.isArray(dataIngredient) && dataIngredient.length > 0) {

      console.log('ok ?')
      // Cas de rendu de l'API
      if (typeof dataIngredient[0] === 'object' && 'ingredient' in dataIngredient[0]) {

        const extractIngredient = dataIngredient.map((element) => {

          return {
            ingredient : String(element.ingredient),
            quantity : element.quantity  ? Number(element.quantity) : undefined,
            unit : element.unit ? String(element.unit) : undefined
          }

        })

        return extractIngredient;

      } 

    }

    return []
  }


  const displayAppliance = normalizeAppliance(applianceToDisplay);
  const displayUstensils = normalizeUstensil(ustensilsToDisplay);
  const displayIngredients = normalizeIngredient(ingredientsToDisplay);


  return (
    <article className="card-recipe" key={recipe.id} data-index={`${recipe.id}`}>
      <span className="recipe-badge">{recipe.id}</span>
      <Link href={`/recipe/${recipe.id}`} target="_blank">
        <Image src={recipe.image ? recipe.image : '/default.jpg'} alt={recipe.title} width={500} height={250} className="recipe-thumbnail" />
      </Link>
     <div className="recipe-content"> 
            <h2 className="recipe-title">{recipe.title}</h2>
              <span className="recipe-timing">{recipe.time} min(s)</span> 
            <h3 className="recipe-subtitle">Recette</h3>
            <p className="recipe-description">{recipe.description}</p>
            <h3 className="recipe-subtitle">Ingrédients</h3> 
             <ul className="recipe-list">
              {displayIngredients.map((element:Ingredient,index:number) => {
                return (
                  <li key={`${element.ingredient}-${index}`} className="recipe-ingredient">
                    {element.ingredient}
                    <span className="recipe-quantity">
                      {element.quantity} {element.unit ? element.unit : ''} 
                    </span>
                  </li>
                  )
                })}
            </ul>
            <h3 className="recipe-subtitle">Appareil</h3>
            <p>{displayAppliance}</p>
            <h3 className="recipe-subtitle">Ustensiles</h3>
            {displayUstensils.map((ustensil:string) => {
              return <a key={ustensil} href={`http://www.google.fr/search?q=${recipe.title}+${ustensil}`} target={"_blank" }className="recipe-ustensil">{ustensil}</a>
            })}
      </div>
    </article>
          
  )
  
}
export default RecipeCard