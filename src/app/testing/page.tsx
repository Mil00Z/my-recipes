'use client';

import {useState,useEffect,Suspense} from 'react';
import { useStore } from "@/hooks/dataStore";

//UI
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import type { Recipe } from '@/types/recipe.types';

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import StoreDebbuger from "@/components/Debeug/Debeug";

import Loading from '@/components/Loading/Loading';

import { normalizeRecipe } from '@/utils/normalizeRecipe'; 
import type {RawRecipe} from '@/utils/normalizeRecipe'; 

//Styles
import './Testing.scss';
import '@/components/RecipeCard/RecipeCard.scss';


const SandBoxPage = () => {

  const {recipes,fetchRecipes} = useStore();

  const [fetchedRecipes,setRecipesDatas] = useState<Recipe[]>([]);
  const [fetchedUstensils,setUstensilsDatas] = useState<string[]>([]);
  

  const getUstensils = async () => {

    try {

      const response = await fetch('/api/ustensils');

        if(!response) {
            throw new Error('Failed to fetch Ustensils');
        }

        const ustensils = await response.json();
      
        // Set State
          setUstensilsDatas(ustensils);

    }

    catch(error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }

  }

  const getRecipes = async () => {

        try {
        
          const response = await fetch('/api/recipes');

          //test sur response
          if (!response) {
            throw new Error('Failed to fetch Recipes');
          } 

          const datas = await response.json();
         
          console.log(datas);
          
          //Normalisation des données ICI
          const recipes = datas.map((recipe: RawRecipe) => normalizeRecipe(recipe))

         // Set State
          setRecipesDatas(recipes);
        
        }
        catch(error) {
          console.error(error)
        }
      }
      

  useEffect(() =>{

      fetchRecipes();
    // getRecipes();
    // getUstensils();
    
  },[])


  return(
    <>
      <PageWrapper>

        <h1>✔ Testing Fetching API</h1>
        <h2> 📜 Implement normalize strategies on Datas</h2>
        
        <div className="testing">

          <Suspense fallback={<Loading/>}>

            {/* {fetchedRecipes && fetchedRecipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            } */}

            {/* {recipes && recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            } */}

          </Suspense> 

        </div>

        {/* <div className="">

          {fetchedUstensils && fetchedUstensils.map((ustensil,index) => (
            
            <div className="ustensil debeug" key={`${ustensil.name}-${index}`}>
                <span>{ustensil.name}</span>
                <p>{new Date(ustensil.createdAt).toLocaleDateString()}</p>
            </div>
          ))}

        </div> */}

        
      </PageWrapper>

    <StoreDebbuger/>
    </>
  )
}
export default SandBoxPage