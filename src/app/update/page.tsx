'use client';

import PageWrapper from "@/components/PageWrapper/PageWrapper";

import "./updateRecipe.scss";

const AddRecipePage = () => {




  return (
   
    <PageWrapper>
        <form className="add-recipe-form">
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
          <input type="text" name="image" />
        </label>
        <button type="submit">Ajouter la recette</button>
      </form>
    </PageWrapper>

  )
}
export default AddRecipePage;