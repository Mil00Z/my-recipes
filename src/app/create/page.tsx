'use client';
import {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from "@/hooks/dataStore";
import useFormList from "@/hooks/useFormList";

import {v4 as uuid} from "uuid";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Ustensil } from "@/types/ustensil.types";
import type { Appliance } from "@/types/appliance.types";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./createRecipe.scss";


const AddRecipePage = () => {

  // const router = useRouter();

  
  //Store
  const {recipes,newRecipes,addRecipe,fetchRecipes} = useStore();


  const createNewIngredient = () : Ingredient => ({
      ingredient :'',
      quantity:undefined,
      unit:undefined
    });
  const [ingredients,addIngredient,removeIngredient] = useFormList<Ingredient>(createNewIngredient)


  const createNewUstensil = () : Ustensil => ({
    name:''
  });
  const [ustensils,addUstensil,removeUstensil] = useFormList<Ustensil>(createNewUstensil)

  const createNewAppliance = () : Appliance => ({
      name:''
  })

//  const [appliances,addAppliance,RemoveAppliance] = useFormList<Appliance>(createNewAppliance);


  // Submit
  const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()
   
    const formData = new FormData(e.target as HTMLFormElement)

    const newRecipe : Recipe = {
      id : `${recipes.length + 1}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      servings : 2,
      ingredients: ingredients.map((_, index:number) => ({
            ingredient: formData.get(`ingredient-${index}`) as string,
            quantity: Number(formData.get(`quantity-${index}`)),
            unit: formData.get(`unit-${index}`) as string,
        })),
      appliances: [{ name: formData.get("appliance") as string }],
      ustensils: ustensils.map((_, index:number) => ({
            name: formData.get(`ustensil-${index}`) as string
        })),
      time: Number(formData.get("time")),
      image: formData.get("image") as string,
  };

  const recipeToSend = {...newRecipe};

  console.log('cloned cleaned recipe',recipeToSend)

  
  try{

    const response = await fetch('/api/recipes',{
      method:'post',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeToSend)
    })

    if (!response.ok){

      throw new Error('Failed to Send New Recipe')

    } 

    const result = await response.json(); // Récupérer la réponse du serveur (la recette créée)
    console.log('Réponse du serveur:', result);

  } catch(error){
    console.error('Erreur réseau ou autre:', error);
  }
 
  //Store Storage
    addRecipe(newRecipe);

  //Quick reset
    e.target.reset();

  // // Reload
  //   router.refresh();
  }


  // Force Page to Re fresh Datas from DB
  useEffect(() =>{

    fetchRecipes();

  },[newRecipes]);
  
 
  return (
    <>
      <PageWrapper>
      
          <form className="add-recipe-form" onSubmit={(e) => handleSubmit(e)}>
          <h2 title={`${recipes.length} recettes existantes`}>Ajouter une recette</h2>
          <label>
            Titre
            <input type="text" name="title" defaultValue={`recette test ${recipes.length + 1}`} required />
          </label>
          <label>
            Description
            <textarea name="description" required defaultValue={`une recette de test de numéro ${recipes.length + 1}`} />
          </label>
          <fieldset>
            <legend>Ingrédients ({ingredients.length})</legend>

            <div className="ingred-list">
            {ingredients?.map((_,index:number) => (

                <div key={`ingred-item-${index}`}  className="ingred-item" data-index={`ingred-item-${index}`}>

                  <input type="text" name={`ingredient-${index}`} placeholder="Ingrédient" defaultValue={`ingredient ${recipes.length + 1}`} required />
                  <input type="text" name={`quantity-${index}`} placeholder="Quantité" defaultValue={`${recipes.length + 1}`} />
                  <input type="text" name={`unit-${index}`} placeholder="Unité" defaultValue={`AL`} />

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
            <input type="text" name="appliance" required defaultValue={`appliance ${recipes.length + 1}`} />
          </label>
          <fieldset>
            <legend>Ustensiles ({ustensils.length})</legend>

            <div className="ustensil-list">

            {ustensils?.map((_,index:number) => (

              <div key={`ustensil-item-${index}`}  className="ustensil-item" data-index={`ustensil-item-${index}`}>

                  <input type="text" name={`ustensil-${index}`} placeholder="Ustensile" required defaultValue={`ustensil ${recipes.length + 1}`} />
                
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
            <input type="number" name="time" min="0" required defaultValue={Math.ceil(Math.random() * recipes.length)} />
          </label>
          <label>
            Image (URL)
            <input type="text" name="image" defaultValue="/hf/default-recipe.jpg" readOnly/>
          </label>
          <div className="letsgo">
            <button type="submit" className="btn"> 💾 Enregistrer la recette</button>
            <button type="button" className="btn reset-recipe" onClick={(e) => e.target.closest('form').reset()}>
              💥 Clear
          </button>
          </div>
        </form>

        {/* <div className="update-container debeug">
          
          <h3>Nombre Total de recettes : API ({recipes.length}) + ajouts ({newRecipes.length}) = {recipes.length + newRecipes.length}</h3>

          <h2>Updated Datas <span className="counter">({newRecipes?.length})</span></h2>
        
            {newRecipes?.map((recipe:Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}

        </div> */}
          

      </PageWrapper>

      <StoreDebbuger />
  
    </>
   
  )
}
export default AddRecipePage;