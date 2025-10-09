import Link from "next/link";
import Image from "next/image";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";

//Styles
import "./RecipeCard.scss";


const RecipeCard = ({ recipe }:{ recipe:Recipe}) => {

  const displayIngredients = recipe.ingredients;
  const displayAppliance = recipe.appliance;
  const displayUstensils = recipe.ustensils;

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
            {displayUstensils.map((ustensil:string, index:number) => {
              return <a key={`${ustensil}-${index}`} href={`http://www.google.fr/search?q=${recipe.title}+${ustensil}`} target={"_blank" }className="recipe-ustensil" data-inex={index}>{ustensil}</a>
            })}
      </div>
    </article>
          
  )
  
}
export default RecipeCard