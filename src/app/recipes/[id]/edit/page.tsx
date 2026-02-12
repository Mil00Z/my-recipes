"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


import { normalizeRecipe } from "@/utils/normalizeRecipeApi";
import useFormList from "@/hooks/useFormList";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Ustensil } from "@/types/ustensil.types";
import type { Appliance } from "@/types/appliance.types";

//Layout
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import Loading from "@/components/Loading/Loading";
import SelectForm from "@/components/SelectForm/SelectForm";
import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";


//Styles
import "@/components/RecipeFormEdit/RecipeFormEdit.scss";
import "@/app/recipes/[id]/edit/updateRecipe.scss";
import "@/components/Filters/Filter.scss";


const UpdateRecipePage = () => {

  //Local 
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string>('/default.webp');


  const createNewIngredient = (): Ingredient => ({
    ingredient: "",
    quantity: 0,
    unit: "",
  });

  const createNewUstensil = (): Ustensil => ({
    name: "",
  });

  const createNewAppliance = (): Appliance => ({
    name: "",
  });


  const [ingredients, addIngredient, removeIngredient, _cleanIngredients, setIngredients] =
    useFormList<Ingredient>(createNewIngredient);
  const [ustensils, addUstensil, removeUstensil, _cleanUstensils, setUstensils] =
    useFormList<Ustensil>(createNewUstensil);
  const [appliances, _addAppliance, _removeAppliance, _cleanAppliances, setAppliances] =
    useFormList<Appliance>(createNewAppliance);


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
        id: formData.get(`ingredient-id-${index}`) as string,
        ingredient: formData.get(`ingredient-${index}`) as string,
        quantity: Number(formData.get(`quantity-${index}`)),
        unit: formData.get(`unit-${index}`) as string,
      })),
      ustensils: ustensils.map((_, index: number) => ({
        id: formData.get(`ustensil-id-${index}`) as string,
        name: formData.get(`ustensil-${index}`) as string,
      })),
      appliances: appliances.map((_, index: number) => ({
        id: formData.get(`appliances-id-${index}`) as string,
        name: formData.get(`appliances-${index}`) as string,
      })),
      time: Number(formData.get("time")),
      image: formData.get("image") as string,
    };

    const recipeToSend = { ...patchRecipe };

    console.log("Ustensils to send:", recipeToSend.ustensils);

    try {
      const response = await fetch(`/api/recipes/${getParams.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeToSend),
      });


      if (!response.ok) {
        throw new Error("Failed to Send New Recipe");
      }

      const optimsiticUpdatedRecipe = { ...updatedRecipe, ...patchRecipe } as Recipe;
      //Local State
      setUpdatedRecipe(optimsiticUpdatedRecipe);
      setIsUpdated(true);

    } catch (error) {
      console.error("Erreur de l'update de la recete :", error);
      alert("Impossible de modifier la recette. Veuillez réessayer.");
    }
  };


  // Reset
  const handleReset = () => {

    if (!updatedRecipe) return;

    setIngredients(updatedRecipe.ingredients);
    setUstensils(updatedRecipe.ustensils);
    setAppliances(updatedRecipe.appliances);
    setImagePreview(updatedRecipe.image || '/default.webp');

    setFormKey((prevKey) => (prevKey + 1));
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

        //Clean Datas from API
        const normalizeDatas = normalizeRecipe(getRecipe)

        setUpdatedRecipe(normalizeDatas);

        //Set Local States for Form Management
        setIngredients(normalizeDatas.ingredients);
        setAppliances(normalizeDatas.appliances);
        setUstensils(normalizeDatas.ustensils);
        setImagePreview(normalizeDatas.image || '/default.webp');


        // Disable Loading after datas fullfill local states
        setIsLoading(false);

      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };

    getUpdateRecipe();

  }, [getParams.id, setIngredients, setUstensils, setAppliances]);

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
          {"Retour à l'accueil"}
        </Link>
      </PageWrapper>
    );
  }

  if (isUpdated) {
    return (
      <PageWrapper>

        <FeedbackBlock
          type={"success"}
          message={`"${updatedRecipe?.title}" modifiée avec succès !`}
          actionLink={`/recipes/${updatedRecipe?.id}`}
          actionLabel={`Voir la recette`}
          btnClass={"btn-go"}
        />
      </PageWrapper>
    );
  }

  return (
    <>
      <PageWrapper layout={"update"}>

        <section className="update-layout">
          <div className="update-info">
            <span>{updatedRecipe?.updatedAt && new Date(updatedRecipe.updatedAt).toLocaleDateString()}</span>
          </div>

          <form className="recipe-form" onSubmit={(e) => handleSubmit(e)} key={formKey}>
            <h2>{updatedRecipe?.title}</h2>
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
              <legend>Ingrédients ({ingredients?.length || 0})</legend>

              <div className="ingred-list">
                {ingredients?.map((ingredient: Ingredient, index: number) => (
                  <div
                    key={`ingred-item-${index}`}
                    className="ingred-item"
                    data-index={`ingred-item-${index}`}
                  >
                    <input
                      type="hidden"
                      name={`ingredient-id-${index}`}
                      value={ingredient.id || ""}
                    />
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
                onClick={() => addIngredient()}
              >
                + Ajouter ingrédient
              </button>
            </fieldset>

            <SelectForm type={'appliances'} item={appliances?.[0]} />

            <fieldset>
              <legend>Ustensiles ({ustensils?.length || 0})</legend>
              <div className="ustensil-list">
                {ustensils?.map((ustensil: Ustensil, index: number) => (
                  <div
                    key={`ustensil-item-${index}`}
                    className="ustensil-item"
                    data-index={`ustensil-item-${index}`}
                  >
                    <input
                      type="hidden"
                      name={`ustensil-id-${index}`}
                      value={ustensil.id || ""}
                    />
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
                placeholder="/mon-image.jpg"
                defaultValue={updatedRecipe?.image ?? "/default-recipe.webp"}
                onChange={(e) => setImagePreview(e.target.value)}
              />
              
              {imagePreview && (
                <>
                  <img 
                    src={imagePreview} 
                    alt={`Preview de ${imagePreview}`}
                    className="preview-image"
                    onError={(e) => e.currentTarget.classList.add('hidden')}
                    onLoad={(e) => e.currentTarget.classList.remove('hidden')}
                  /> 
                </> 
              )}
            </label>

            <div className="letsgo">
              <button type="submit" className="btn">
                Enregistrer les modifications
              </button>
              <button
                type="button"
                className="btn reset-recipe"
                onClick={() => handleReset()}
              >
                Annuler les modifications
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
