'use client';

import Image from "next/image";
import { useStore } from "@/hooks/dataStore";
import type { Recipe } from "@/types/recipe.types";
import { useParams } from "next/navigation";


import PageWrapper from "@/components/PageWrapper/PageWrapper";
import StoreDebbuger from "@/components/Debeug/Debeug";


import "./Recipe.scss";


const RecipeSingle = () => {

  const {recipes} = useStore();

  const getParams = useParams();

  const recipe = recipes.find((recipe:Recipe) => {
    return recipe.id === getParams.id}
  );


 if (!recipes.length) {
    return (
      <PageWrapper>
          <div className="debeug recipe-loading">Loading Recipes...</div>
      </PageWrapper>
      
    )
  }

  if (!recipe) {
    return (
      <PageWrapper>
          <div className="recipe-not-found"> ❌ Recipe not found</div>
      </PageWrapper>
      
    )
  }


  return (
  <>
      <PageWrapper>

        <div className="recipe-single">
          <h1>{recipe.title}</h1>
          <div className="recipe-container">
            <Image
              src={recipe.image ? recipe.image :'/default.jpg'}
              alt={recipe.title}
              width={800}
              height={600}
              className="recipe-cover"
            />
            <div className="recipe-datas">
              <p>Kézako : {recipe.description}</p>
              <p>Timing : {recipe.time} min(s)</p>
              <p>Pour : {recipe.servings} gourmand(es)</p>
              <p>Appareil principal : {recipe.appliance}</p>
              <p>Ustensiles : {recipe.ustensils.join(' - ')}</p>
            </div>
          </div>
        </div>

      </PageWrapper>
      
      <StoreDebbuger/>
  </>
  )
}
export default RecipeSingle