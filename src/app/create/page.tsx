"use client";

import { useState } from "react";


import { useStore } from "@/hooks/dataStore";
import useFormList from "@/hooks/useFormList";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Ustensil } from "@/types/ustensil.types";
// import type { Appliance } from "@/types/appliance.types";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";
import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "@/app/create/createRecipe.scss";
import "@/components/RecipeFormEdit/RecipeFormEdit.scss";

const AddRecipePage = () => {
  //Local
  const [createdRecipe, setCreatedRecipe] = useState<Recipe | null>(null);

  //Store
  const { recipes, addRecipe, fetchRecipes } = useStore();

  const createNewIngredient = (): Ingredient => ({
    ingredient: "",
    quantity: undefined,
    unit: undefined,
  });
  const [ingredients, addIngredient, removeIngredient] =
    useFormList<Ingredient>(createNewIngredient);

  const createNewUstensil = (): Ustensil => ({
    name: "",
  });
  const [ustensils, addUstensil, removeUstensil] =
    useFormList<Ustensil>(createNewUstensil);

  // const createNewAppliance = (): Appliance => ({
  //   name: "",
  // });
  //  const [appliances,addAppliance,RemoveAppliance] = useFormList<Appliance>(createNewAppliance);

  // Auto Generation of new ID
  const maxId = Math.max(
    0,
    ...recipes.map((recipe: Recipe) => Number(recipe.id))
  );

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const newRecipe: Recipe = {
      id: `${maxId + 1}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      servings: Number(formData.get("servings")),
      ingredients: ingredients.map((_, index: number) => ({
        ingredient: formData.get(`ingredient-${index}`) as string,
        quantity: Number(formData.get(`quantity-${index}`)),
        unit: formData.get(`unit-${index}`) as string,
      })),
      appliances: [{ name: formData.get("appliance") as string }],
      ustensils: ustensils.map((_, index: number) => ({
        name: formData.get(`ustensil-${index}`) as string,
      })),
      time: Number(formData.get("time")),
      image: formData.get("image") as string,
    };

    const recipeToSend = { ...newRecipe };

    try {
      const response = await fetch("/api/recipes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to Send New Recipe");
      }

      //Refresh Datas
      await fetchRecipes();

      //Store Storage
      addRecipe(newRecipe);

      //Local State
      setCreatedRecipe(newRecipe);

      //Quick reset Form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Erreur de création de la recete :", error);

      alert("Impossible de créer la recette. Veuillez réessayer.");
    }
  };

  if (createdRecipe) {
    return (
      <PageWrapper>
        <FeedbackBlock
          type={"success"}
          message={`"${createdRecipe.title}" ajoutée avec succès !`}
          actionLink={`/recipes/${createdRecipe.id}`}
          actionLabel={`Voir la recette`}
          btnClass={"btn-go"}
        />
      </PageWrapper>
    );
  }

  return (
    <>
      <PageWrapper layout={"create"}>
        <section className="create-layout">
          <form className="recipe-form" onSubmit={(e) => handleSubmit(e)}>
            <h2 title={`${maxId} recettes existantes`}>Ma nouvelle recette</h2>
            <label>
              Titre
              <input
                type="text"
                name="title"
                defaultValue={`recette test ${maxId + 1}`}
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                required
                defaultValue={`une recette de test de numéro ${maxId + 1}`}
              />
            </label>
            <fieldset>
              <legend>Ingrédients ({ingredients.length})</legend>

              <div className="ingred-list">
                {ingredients?.map((_, index: number) => (
                  <div
                    key={`ingred-item-${index}`}
                    className="ingred-item"
                    data-index={`ingred-item-${index}`}
                  >
                    <input
                      type="text"
                      name={`ingredient-${index}`}
                      placeholder="Ingrédient"
                      defaultValue={`ingredient ${maxId + 1}`}
                      required
                    />
                    <input
                      type="text"
                      name={`quantity-${index}`}
                      placeholder="Quantité"
                      defaultValue={`${maxId + 1}`}
                    />
                    <input
                      type="text"
                      name={`unit-${index}`}
                      placeholder="Unité"
                      defaultValue={`AL`}
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
                onClick={() => addIngredient()}
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
                defaultValue={`appliance ${maxId + 1}`}
              />
            </label>
            <fieldset>
              <legend>Ustensiles ({ustensils.length})</legend>

              <div className="ustensil-list">
                {ustensils?.map((_, index: number) => (
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
                      defaultValue={`ustensil ${maxId + 1}`}
                    />

                    <button
                      type="button"
                      className="remove btn manage-ustensil"
                      onClick={() => removeUstensil(index)}
                    >
                      - Suppr Ustensil
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="add btn manage-ustensil"
                onClick={() => addUstensil()}
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
                defaultValue={Math.ceil(Math.random() * maxId)}
              />
            </label>
            <label>
              Quantités
              <input
                type="number"
                name="servings"
                required
                defaultValue={`2`}
              />
            </label>
            <label>
              Image (URL)
              <input
                type="text"
                name="image"
                defaultValue="/"
              />
            </label>
            <div className="letsgo">
              <button type="submit" className="btn">
                {" "}
                💾 Enregistrer la recette
              </button>
              <button
                type="button"
                className="btn reset-recipe"
                onClick={(e) => (e.target as HTMLElement).closest("form")?.reset()}
              >
                💥 Clear
              </button>
            </div>
          </form>
        </section>

      </PageWrapper >

      <StoreDebbuger />
    </>
  );
};
export default AddRecipePage;
