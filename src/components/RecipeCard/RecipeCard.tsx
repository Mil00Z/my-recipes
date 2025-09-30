import {useEffect} from 'react';


import Link from "next/link";
import Image from "next/image";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";

// @refresh reset

//Styles
import "./RecipeCard.scss";


// Définition d'un type étendu qui peut inclure les propriétés de l'API avec des majuscules.
type TempRecipe = Recipe & {
  Ingredients?: Ingredient[];
  Appliance?: { name: string }[] | string;
  Ustensils?: { name: string }[] | string[];
};

const RecipeCard = ({ recipe }: { recipe: TempRecipe}) => {

  const ingredientsToDisplay = recipe.ingredients || recipe.Ingredients;
  const applianceToDisplay = recipe.appliance || recipe.Appliance;
  const ustensilsToDisplay = recipe.ustensils || recipe.Ustensils;


  const normalizeDatas = (data:any) => {

    if (!data) return [];


    if (Array.isArray(data)){
       console.log('is array !!', data);

    } else {
      console.log('CLC ce projet');
    }
  }

  useEffect(() =>{


    normalizeDatas('coucou');

  },[])


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
              {/* {displayIngredients.map((element:Ingredient) => {
                return (
                  <li key={element.ingredient} className="recipe-ingredient">
                    {element.ingredient}
                    <span className="recipe-quantity">
                      {element.quantity} {element.unit ? element.unit : ''} 
                    </span>
                  </li>
                  )
                })} */}
            </ul>
            <h3 className="recipe-subtitle">Appareils</h3>
            {/* <p>{displayAppliance}</p> */}
            <h3 className="recipe-subtitle">Ustensiles</h3>
            {/* {displayUstensils.map((ustensil:string) => {
              return <span key={ustensil} className="recipe-ustensil">{ustensil}</span>
            })} */}
      </div>
    </article>
          
  )
  
}
export default RecipeCard