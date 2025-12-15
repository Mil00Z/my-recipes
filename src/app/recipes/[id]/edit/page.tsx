"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";



import { normalizeRecipe } from "@/utils/normalizeRecipeApi";


import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Ustensil } from "@/types/ustensil.types";
import type { Appliance } from "@/types/appliance.types";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import Loading from "@/components/Loading/Loading";
import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";
// import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./createRecipe.scss";


const UpdateRecipePage = () => {
  //Local
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const [isUpdated, setIsUpdated] = useState<Boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ustensils, setUstensils] = useState<Ustensil[]>([]);
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  //Get Url Params
  const getParams = useParams();

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const patchRecipe: Recipe = {
      id: `${getParams.id}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      servings: Number(formData.get("servings")),
      ingredients: ingredients.map((_, index: number) => ({
        ingredient: formData.get(`ingredient-${index}`) as string,
        quantity: Number(formData.get(`quantity-${index}`)),
        unit: formData.get(`unit-${index}`) as string,
      })), 
      ustensils: ustensils.map((_, index: number) => ({
         name: formData.get(`ustensil-${index}`) as string,
      })), 
      appliances: appliances.map((_, index: number) => ({
         name: formData.get(`appliance-${index}`) as string,
      })), 
      time: Number(formData.get("time")),
      image: formData.get("image") as string,
    };

    const recipeToSend = { ...patchRecipe };

  
    setUpdatedRecipe(patchRecipe);
    setIsUpdated(true);

    /* try {
      const response = await fetch(`/api/recipes/${getParams.id}`, {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to Send New Recipe");
      }

      const result = await response.json();
      //Refresh Datas
      await fetchRecipes();

      //Local State
      setUpdatedRecipe(newRecipe);
      setIsUpdatedRecipe(true);

      //Quick reset Form
      e.target.reset();
    } catch (error) {
      console.error("Erreur de création de la recete :", error);

      alert("Impossible de créer la recette. Veuillez réessayer.");
    } */
  };


  //Fetch Recipe to Update
  useEffect(() => {

    if (!getParams.id) {
        setIsError(true);
        return;
    }

    const getUpdateRecipe = async () => {

      try {
        const response = await fetch(`/api/recipes/${getParams.id}`);

        if (!response.ok) {
          throw new Error("Failed to Get Recipe");
        }

        const getRecipe = await response.json();
        setIsLoading(false);

        const normalizeDatas = normalizeRecipe(getRecipe)

        setUpdatedRecipe(normalizeDatas);
        setAppliances(normalizeDatas.appliances || []);
        setIngredients(normalizeDatas.ingredients || []);
        setUstensils(normalizeDatas.ustensils || []);
         
        } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };

    getUpdateRecipe();
  }, [getParams.id]);

  //Guard
  if (isLoading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <div className="recipe-not-found">
          {" "}
          ❌ Error with fetching Datas from Recipe{" "}
        </div>
        <Link href="/" className="btn btn-back">
          <span className="btn-icon">←</span>
          Retour à l'accueil
        </Link>
      </PageWrapper>
    );
  }

  if (isUpdated) {
    return (
      <PageWrapper>
        {/* <FeedbackBlock
          type={"success"}
          message={`"${updatedRecipe.title}" ajoutée avec succès !`}
          actionLink={`/recipes/${updatedRecipe.id}`}
          actionLabel={`Voir la recette`}
          btnClass={"btn-go"}
        /> */}

        <div className="">
          <h2>Recette mise à jour avec succès !</h2>
          <Link href={`/recipes/${getParams.id}`} className={`link btn btn-cta`}>
          <span className="btn-icon">←</span>{"Fiche Recette"}</Link>
        </div>
        <div className="update-recipe">
          {updatedRecipe && <RecipeCard recipe={updatedRecipe}></RecipeCard>}
        </div>
      </PageWrapper>
    );
  }
 
  return (
    <>
      <PageWrapper>
        <section className="update-layout">

          <div className="update-info">
            <span>{new Date(updatedRecipe?.updatedAt).toLocaleDateString()}</span>
          </div>

        <form className="add-recipe-form" onSubmit={(e)=>handleSubmit(e)}>
          <h2>Modifier la recette '{updatedRecipe?.title}'</h2>
          <label>
            Titre
            <input
              type="text"
              name="title"
              defaultValue={updatedRecipe?.title}
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              required
              defaultValue={updatedRecipe?.description}
            />
          </label>

          <fieldset>
            <legend>Ingrédients ({updatedRecipe?.ingredients?.length})</legend>

            <div className="ingred-list">
              {updatedRecipe?.ingredients?.map((ingredient:Ingredient, index: number) => (
                <div
                  key={`ingred-item-${index}`}
                  className="ingred-item"
                  data-index={`ingred-item-${index}`}
                >
                  <input
                    type="text"
                    name={`ingredient-${index}`}
                    placeholder="Ingrédient"
                    defaultValue={ingredient.ingredient}
                    required
                  />
                  <input
                    type="text"
                    name={`quantity-${index}`}
                    placeholder="Quantité"
                    defaultValue={ingredient.quantity}
                  />
                  <input
                    type="text"
                    name={`unit-${index}`}
                    placeholder="Unité"
                    defaultValue={ingredient.unit}
                  />

                  <button
                    type="button"
                    className="remove btn manage-ingred"
                    onClick={() => removeIngredient(index)}
                  >
                    - Suppr ingrédient
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="add btn manage-ingred"
            >
              + Ajouter ingrédient
            </button>
          </fieldset>

  
          <label>
            Appareil
            <input
              type="text"
              name="appliance"
              required
              defaultValue={updatedRecipe?.appliances[0]?.name}
            />
          </label>

          <fieldset>
            <legend>Ustensiles ({updatedRecipe?.ustensils?.length})</legend>

            <div className="ustensil-list">
              {updatedRecipe?.ustensils?.map((ustensil:Ustensil, index: number) => (
                <div
                  key={`ustensil-item-${index}`}
                  className="ustensil-item"
                  data-index={`ustensil-item-${index}`}
                >
                  <input
                    type="text"
                    name={`ustensil-${index}`}
                    placeholder="Ustensile"
                    required
                    defaultValue={ustensil.name}
                  />

                  <button
                    type="button"
                    className="remove btn manage-ustensil"
                  >
                    - Suppr Ustensil
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="add btn manage-ustensil"
            >
              + Ajouter Ustensile
            </button>
          </fieldset> 

          <label>
            Temps (minutes)
            <input
              type="number"
              name="time"
              min="0"
              required
              defaultValue={updatedRecipe?.time}
            />
          </label>
          <label>
            Quantités
            <input
              type="number"
              name="servings"
              min="1"
              required
              defaultValue={updatedRecipe?.servings}
            />
          </label>
          <label>
            Image (URL)
            <input
              type="text"
              name="image"
              defaultValue={updatedRecipe?.image ?? "/hf/default-recipe.jpg"}
              readOnly
            />
          </label>
          <div className="letsgo">
            <button type="submit" className="btn">
              Enregistrer les modifications 
            </button>
            <button
              type="button"
              className="btn reset-recipe"
              onClick={(e) => e.target.closest("form").reset()}
            >
              Clear
            </button>
          </div>
        </form>

        

        <div className="update-recipe">
          {updatedRecipe && <RecipeCard recipe={updatedRecipe}></RecipeCard>}
        </div>

      </section>
      </PageWrapper>
    </>
  );
};
export default UpdateRecipePage;
