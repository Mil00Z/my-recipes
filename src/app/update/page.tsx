'use client';

import {useState,useEffect} from "react";
import type { Recipe } from "@/types/recipe.types";
import { useStore } from "@/hooks/dataStore";

import {v4 as uuid} from "uuid";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

//Styles
import "./updateRecipe.scss";



const AddRecipePage = () => {

  const [newRecipeData, setNewRecipeData] = useState<Recipe[]>([]);

  const {matchingRecipes,tags} = useStore();


  const handleSubmit = (e:Event) =>{

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


  return (
   
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
          <input type="text" name="ingredient" placeholder="Ingrédient" required />
          <input type="text" name="quantity" placeholder="Quantité" />
          <input type="text" name="unit" placeholder="Unité" />
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
        <button type="submit">Ajouter la recette</button>
      </form>

      <div className="update-container debeug">

        <h2>Updated Datas <span className="counter">({newRecipeData.length})</span></h2>
      
          {newRecipeData?.map((recipe:Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
       
      </div>
    </PageWrapper>

  )
}
export default AddRecipePage;