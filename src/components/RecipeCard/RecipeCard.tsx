import Link from "next/link";
import Image from "next/image";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";


//Styles
import "./RecipeCard.scss";


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



  const normalizeUstensil = (dataUstensil:any) : string[] => {


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


  const normalizeIngredient = (dataIngredient:any) : Ingredient[] => {

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