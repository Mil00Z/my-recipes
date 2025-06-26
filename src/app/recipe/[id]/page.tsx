'use client';

import Image from "next/image";
import { useStore } from "@/hooks/dataStore";
import type { Recipe } from "@/types/recipe.types";
import { useParams } from "next/navigation";


import PageWrapper from "@/components/PageWrapper/PageWrapper";


import "./Recipe.scss";


const RecipeSingle = () => {

  const {recipes} = useStore();

  const getParams = useParams();

  const recipe = recipes.find((recipe:Recipe) => {
    return recipe.id === getParams.id}
  );


 if (!recipes.length) {
    return (
      <div className="debeug recipe-loading">Loading Recipes...</div>
    )
  }

  if (!recipe) {
    return (
      <div className="debeug recipe-not-found">Recipe not found</div>
    )
  }


  return (
  <>
      <PageWrapper>

        <div className="recipe-single">
          <h1>{recipe.title}</h1>
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={600}
            className="recipe-cover"
          />
          <p>Kézako : {recipe.description}</p>
          <p>Timing : {recipe.time} min(s)</p>
          <p>Pour : {recipe.servings} gourmand(es)</p>
          <p>Appareil principal : {recipe.appliance}</p>
          <p>Ustensiles : {recipe.ustensils.join(' - ')}</p>
        </div>

      </PageWrapper>
  </>
  )
}
export default RecipeSingle