'use client';

import {useState} from "react";
import { useStore } from "@/hooks/dataStore";
import useFormList from "@/hooks/useFormList"

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";


import {v4 as uuid} from "uuid";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./updateRecipe.scss";


const AddRecipePage = () => {

  //Store
  const {newRecipes,addRecipe} = useStore();

  const [newRecipeData, setNewRecipeData] = useState<Recipe[]>([]);


 const createNewIngredient = () : Ingredient => ({
    ingredient :'',
    quantity:undefined,
    unit:undefined
  })
 const [ingredients,addIngredient,removeIngredient] = useFormList<Ingredient>(createNewIngredient)


 const createNewUstensil = () : string => ('');
 const [ustensils,addUstensil,removeUstensil] = useFormList<string>(createNewUstensil)

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()
   
    const formData = new FormData(e.target as HTMLFormElement)

    const newRecipe : Recipe = {
      id : uuid(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      servings : 2,
      ingredients: ingredients.map((_, index:number) => ({
            ingredient: formData.get(`ingredient-${index}`) as string,
            quantity: Number(formData.get(`quantity-${index}`)),
            unit: formData.get(`unit-${index}`) as string,
        })),
      appliance: formData.get("appliance") as string,
      ustensils: ustensils.map((_, index: number) => formData.get(`ustensil-${index}`) as string),
      time: Number(formData.get("time")),
      image: formData.get("image") as string,
  };

    //State Storage
    setNewRecipeData((newRecipeData : Recipe[]) => [...newRecipeData,newRecipe]);

    //Store Storage
    addRecipe(newRecipe);

    //Quick reset
    e.target.reset();
    
  }
  
 

  return (
    <>
      <PageWrapper>
      
          <form className="add-recipe-form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Ajouter une recette</h2>
          <label>
            Titre
            <input type="text" name="title" required />
          </label>
          <label>
            Description
            <textarea name="description" required />
          </label>
          <fieldset>
            <legend>Ingrédients ({ingredients.length})</legend>

            <div className="ingred-list">
            {ingredients?.map((_,index:number) => (

                <div key={`ingred-item-${index}`}  className="ingred-item" data-index={`ingred-item-${index}`}>

                  <input type="text" name={`ingredient-${index}`} placeholder="Ingrédient" required />
                  <input type="text" name={`quantity-${index}`} placeholder="Quantité" />
                  <input type="text" name={`unit-${index}`} placeholder="Unité" />

                  <button type="button" className="remove btn manage-ingred" onClick={() => removeIngredient(index)}>- Suppr ingrédient
                  </button>

                </div>
            ))}
            </div>

            <button type="button" className="add btn manage-ingred" onClick={() => addIngredient()}>
              + Ajouter ingrédient
            </button>
          </fieldset>

          <label>
            Appareil
            <input type="text" name="appliance" required />
          </label>
          <fieldset>
            <legend>Ustensiles ({ustensils.length})</legend>

            <div className="ustensil-list">

            {ustensils?.map((_,index:number) => (

              <div key={`ustensil-item-${index}`}  className="ustensil-item" data-index={`ustensil-item-${index}`}>

                  <input type="text" name={`ustensil-${index}`} placeholder="Ustensile" required />
                

                  <button type="button" className="remove btn manage-ustensil" onClick={() => removeUstensil(index)}>- Suppr Ustensil
                  </button>

              </div>
            ))}
            </div>

            <button type="button" className="add btn manage-ustensil" onClick={() => addUstensil()}>
              + Ajouter Ustensile
            </button>
          </fieldset>
          <label>
            Temps (minutes)
            <input type="number" name="time" min="1" required />
          </label>
          <label>
            Image (URL)
            <input type="text" name="image" defaultValue="/hf/default.recipe.jpg" readOnly/>
          </label>
          <div className="letsgo">
            <button type="submit" className="btn"> 💾 Enregistrer la recette</button>
            <button type="button" className="btn reset-recipe" onClick={(e) => e.target.closest('form').reset()}>
              💥 Clear
          </button>
          </div>
        </form>

        <div className="update-container debeug">

          <h2>Updated Datas <span className="counter">({newRecipes?.length})</span></h2>
        
            {newRecipes?.map((recipe:Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        
        </div>


      </PageWrapper>

      <StoreDebbuger />
  
    </>
   
  )
}
export default AddRecipePage;