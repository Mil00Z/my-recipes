import Link from "next/link";
import Image from "next/image";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {

  
  return (
    <article className="card-recipe" key={recipe.id} data-index={`${recipe.id}`}>
      <span className="recipe-badge">{recipe.id}</span>
      <Link href={`/recipe/${recipe.id}`} target="_blank">
        <Image src={recipe.image ? recipe.image : '/default.jpg'} alt={recipe.title} width={500} height={250} className="recipe-thumbnail" />
      </Link>
     <div className="recipe-content"> 
            <h2 className="recipe-title">{recipe.title}</h2>
              <span className="recipe-timing">{recipe.time} min</span> 
            <h3 className="recipe-subtitle">Recette</h3>
            <p className="recipe-description">{recipe.description}</p>
            <h3 className="recipe-subtitle">Ingrédients</h3> 
             <ul className="recipe-list">
              {recipe.ingredients.map((element:Ingredient) => {
                return (
                  <li key={element.ingredient} className="recipe-ingredient">
                    {element.ingredient}
                    <span className="recipe-quantity">
                      {element.quantity} {element.unit ? element.unit : ''} 
                    </span>
                  </li>
                  )
                })}
            </ul>
            <h3 className="recipe-subtitle">Appareils</h3>
            <p>{recipe.appliance}</p>
            <h3 className="recipe-subtitle">Ustensiles</h3>
            {recipe.ustensils.map((ustensil:string) => {
              return <span key={ustensil} className="recipe-ustensil">{ustensil}</span>
            })}
      </div>
    </article>
          
          
     
  )
  
}

export default RecipeCard