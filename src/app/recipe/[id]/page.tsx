'use client';

import {useState,useEffect} from 'react'
import Image from "next/image";
import { useParams } from "next/navigation";

import type { Recipe } from "@/types/recipe.types";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./Recipe.scss";


const RecipeSingle = () => {

  const [fetchedRecipe,setFetchedRecipe] = useState<Recipe | null>(null)
  const [isLoading,setIsLoading] = useState<Boolean>(true);
  const [isError,setIsError] = useState<Boolean>(false);

  //Get Url Params
  const getParams = useParams();


  useEffect(() => {

    if(!getParams.id){

          setIsError(true);
          return;

      }

    const fetchSingleRecipe = async() => {

      try{

        const response = await fetch(`/api/recipes/${getParams.id}`);

        if (!response.ok) {
          setIsLoading(false);
          setIsError(true);
          return;
        }

        const singleData = await response.json();
        console.log(singleData);

        setIsLoading(false);
        setFetchedRecipe(singleData);

      } catch(err) {

          console.error(err);
          setIsError(true);

      }
      
    }

    fetchSingleRecipe();

  },[getParams.id])



 if (isLoading) {
    return (
      <PageWrapper>
          <div className="recipe-loading">Loading Requested Recipe...</div>
      </PageWrapper>
      
    )
  }

  if (!fetchedRecipe) {
    return (
      <PageWrapper>
          <div className="recipe-not-found"> 😭 Recipe not found</div>
      </PageWrapper>
      
    )
  }

  if (isError) {
    return (
      <PageWrapper>
          <div className="recipe-not-found"> ❌ Error with fetching Data Recipe </div>
      </PageWrapper>
      
    )
  }



  return (
  <>
      <PageWrapper>

        <article aria-label="recette" className="recipe-single">
          <h1>{fetchedRecipe.title}</h1>
          <div className="recipe-container">
            <Image
              src={fetchedRecipe.image ? fetchedRecipe.image :'/default.jpg'}
              alt={fetchedRecipe.title}
              width={800}
              height={600}
              className="recipe-cover"
            />
            <div className="recipe-datas">
              <p>Kézako : {fetchedRecipe.description}</p>
              <p>Timing : {fetchedRecipe.time} min(s)</p>
              <p>Pour : {fetchedRecipe.servings} gourmand(es)</p>
              {/* <p>Appareil principal : {recipe.appliance}</p>
              <p>Ustensiles : {recipe.ustensils.join(' - ')}</p> */}
            </div>
          </div>
        </article>

      </PageWrapper>
      
      <StoreDebbuger/>
  </>
  )
}
export default RecipeSingle