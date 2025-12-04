"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { normalizeRecipe } from "@/utils/normalizeRecipeApi";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Ustensil } from "@/types/ustensil.types";
import type { Appliance } from "@/types/appliance.types";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";
// import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./createRecipe.scss";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";

const UpdateRecipePage = () => {
  //Local
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const [isUpdated, setIsUpdated] = useState<Boolean>(false);

  //Get Url Params
  const getParams = useParams();

  useEffect(() => {
    if (!getParams.id) {
      throw new Error("id error");
    }

    const getUpdateRecipe = async () => {
      if (!getParams.id) {
        setIsError(true);
        return;
      }

      try {
        const response = await fetch(`/api/recipes/${getParams.id}`);

        if (!response.ok) {
          throw new Error("Failed to Get Recipe");
        }

        const getRecipe = await response.json();

        setIsLoading(false);

        setUpdatedRecipe(normalizeRecipe(getRecipe));
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

  // Guard
  // if (isUpdated) {
  //   return (
  //     <PageWrapper>
  //       <FeedbackBlock
  //         type={"success"}
  //         message={`"${updatedRecipe.title}" ajoutée avec succès !`}
  //         actionLink={`/recipes/${updatedRecipe.id}`}
  //         actionLabel={`Voir la recette`}
  //         btnClass={"btn-go"}
  //       />
  //     </PageWrapper>
  //   );
  // }

  return (
    <>
      <PageWrapper>
        <form className="add-recipe-form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Mise à jour de la recette {updatedRecipe?.title}</h2>
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

          {/* <fieldset>
            <legend>Ingrédients ({ingredients?.length})</legend>

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

           */}

          <label>
            Appareil
            <input
              type="text"
              name="appliance"
              required
              defaultValue={`appliance`}
            />
          </label>

          {/* <fieldset>
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
          </fieldset> */}

          <label>
            Temps (minutes)
            <input
              type="number"
              name="time"
              min="0"
              required
              defaultValue={updatedRecipe.time}
            />
          </label>
          <label>
            Image (URL)
            <input
              type="text"
              name="image"
              defaultValue="/hf/default-recipe.jpg"
              readOnly
            />
          </label>
          <div className="letsgo">
            <button type="submit" className="btn">
              {" "}
              💾 Enregistrer les modificatio
            </button>
            <button
              type="button"
              className="btn reset-recipe"
              onClick={(e) => e.target.closest("form").reset()}
            >
              💥 Clear
            </button>
          </div>
        </form>

        <section className="debeug">
          {updatedRecipe ?? <RecipeCard recipe={updatedRecipe}></RecipeCard>}
        </section>
      </PageWrapper>
    </>
  );
};
export default UpdateRecipePage;
