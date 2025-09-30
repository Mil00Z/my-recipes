'use client';

// @refresh reset

import {useState,useEffect} from 'react';
import RecipeCard from '@/components/RecipeCard/RecipeCard';


import type { Recipe } from '@/types/recipe.types';
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import StoreDebbuger from "@/components/Debeug/Debeug";


import '@/components/RecipeCard/RecipeCard.scss';


const SandBoxPage = () => {

  const [fetchedDatas,setFetchedDatas] = useState<Recipe[]>([])


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

  },[])

  
  return(
    <>
      <PageWrapper>

        <h1>Testing Fetching API</h1>
        
        <div className="debeug">
          
          
          {fetchedDatas && fetchedDatas.map((recipe: Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          }


        </div>

      </PageWrapper>

    <StoreDebbuger/>
    </>
  )
}
export default SandBoxPage