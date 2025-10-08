'use client';

import {useState,useEffect} from 'react';
import RecipeCard from '@/components/RecipeCard/RecipeCard';


import type { Recipe } from '@/types/recipe.types';
import type { Ingredient } from '@/types/ingredient.types';

//UI
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import StoreDebbuger from "@/components/Debeug/Debeug";


//Styles
import './Testing.scss'
import '@/components/RecipeCard/RecipeCard.scss';


const SandBoxPage = () => {

  const [fetchedDatas,setFetchedDatas] = useState<Recipe[]>([])

  const [fetchedIngredients,setFetchedIngredients] = useState<Ingredient>({})


  const getIngredients = async () => {

    try {
      const response = await fetch('/api/ingredient');
      const datas = await response.json();

      setFetchedIngredients(datas);

    }
    catch(error){

      console.error('erreure de call vers Ingredients',error);
    }

  }

  const getDatas = async () => {


        try {
        
          const response = await fetch('/api/recipe');
          const datas = await response.json();

          // console.log(datas);
          setFetchedDatas(datas);

        }
        catch(error) {
          console.error(error)
        }
      }

      
  useEffect(() =>{

  
    getDatas();
    // getIngredients();

  },[])

  

  return(
    <>
      <PageWrapper>

        <h1>✔ Testing Fetching API</h1>
        <h2> 📜 Implement normalize strategies on Datas</h2>
        
        <div className="testing">
          
          
          {fetchedDatas && fetchedDatas.map((recipe: Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          }

        </div>

        {/* <div className="debeug testing">

          { fetchedIngredients && fetchedIngredients.map((ingredient:Ingredient) => {


              return (<span key={ingredient.id}>{ingredient.ingredient}</span>)

          })}
        </div> */}

      </PageWrapper>

    <StoreDebbuger/>
    </>
  )
}
export default SandBoxPage