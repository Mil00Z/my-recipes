'use client';

import {useState} from "react";

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

  const [newRecipeData, setNewRecipeData] = useState<Recipe[]>([]);

  

  const createNewIngredient = () : Ingredient => ({
    ingredient :'',
    quantity:undefined,
    unit:undefined
  })



  const [ingredients,setIngredients] = useState<Ingredient[]>([
 createNewIngredient()])

  const [ustensils,setUstensils] = useState<string[]>([])

  // Add
  const addIngred = () => {

      setIngredients((ingredients:Ingredient[]) => [...ingredients,createNewIngredient()])

      console.log(ingredients);
  }

  // Remove
    const removeIngred = (index:number) => {

    const targetIngredient = ingredients.filter((_, i:number) =>{

      return i !== index

    });

    setIngredients((ingredients:Ingredient[]) => targetIngredient)
  
  }


  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()
   
    const formData = new FormData(e.target as HTMLFormElement)

    const newRecipe : Recipe = {
      id : uuid(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      servings : 2,
      ingredients: [{
        ingredient: formData.get("ingredient") as string,
        quantity: Number(formData.get("quantity")) ,
        unit: formData.get("unit") as string ,
      }],
      appliance: formData.get("appliance") as string,
      ustensils: [formData.get("ustensil") as string],
      time: Number(formData.get("time")),
      image: formData.get("image") as string,
  };

    setNewRecipeData((newRecipeData : Recipe[]) => [...newRecipeData,newRecipe]);

  }
  
  //Debeug
  // console.log(ingredients,ustensils);

  return (
    <>
      <PageWrapper>

          <form className="add-recipe-form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Ajouter une recette</h2>
          <label>
            Titre :
            <input type="text" name="title" required />
          </label>
          <label>
            Description :
            <textarea name="description" required />
          </label>
          <fieldset>
            <legend>Ingrédients</legend>
            <div className="ingred-list">

            {ingredients?.map((_,index:number) => (

                <div key={`ingred-item-${index}`}  className="ingred-item" data-index={`ingred-item-${index}`}>

                  <input type="text" name="ingredient" placeholder="Ingrédient" required />
                  <input type="text" name="quantity" placeholder="Quantité" />
                  <input type="text" name="unit" placeholder="Unité" />

                  <button type="button" className="remove btn manage-ingred" onClick={() => removeIngred(index)}>- Suppr ingrédient
                  </button>

                </div>
            ))}
            
            </div>

            <button type="button" className="add btn manage-ingred" onClick={() => addIngred()}>
              + Ajouter ingrédient
            </button>
          </fieldset>

          <label>
            Appareil :
            <input type="text" name="appliance" required />
          </label>
          <fieldset>
            <legend>Ustensiles</legend>
            <input type="text" name="ustensil" placeholder="Ustensile" required />
          </fieldset>
          <label>
            Temps (minutes) :
            <input type="number" name="time" min="1" required />
          </label>
          <label>
            Image (URL) :
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

          <h2>Updated Datas <span className="counter">({newRecipeData.length})</span></h2>
        
            {newRecipeData?.map((recipe:Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        
        </div>

      </PageWrapper>

      <StoreDebbuger />
  
    </>
   
  )
}
export default AddRecipePage;