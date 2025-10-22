'use client';

import {useEffect,Suspense} from 'react';
import { useStore } from "@/hooks/dataStore";

//UI
import RecipesList from '@/components/RecipesList/RecipesList';

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import StoreDebbuger from "@/components/Debeug/Debeug";

import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';



//Styles
import './Testing.scss';
import '@/components/RecipesList/RecipesList.scss';
import '@/components/RecipeCard/RecipeCard.scss';


const SandBoxPage = () => {

  const {recipes,isLoading,isError,fetchRecipes} = useStore();


  useEffect(() =>{

    fetchRecipes();
  
  },[])

 
  if(isLoading) {

    return (
    <PageWrapper>
        <h1>✔ Testing Fetching API</h1>
        <h2> 📜 Implement normalize strategies on Datas</h2>
        
        <div className="recipes-container">
            <Loading />
        </div>
      </PageWrapper>
      )
  }

   if (isError) {
    return (
      <PageWrapper>
        <Error dataType={'testing'} />
      </PageWrapper>
    );
  }


  return(
    <>
      <PageWrapper>
        <h1>✔ Testing Fetching API</h1>
        <h2> 📜 Implement normalize strategies on Datas</h2>
        
        <div className="recipes-container">

          <RecipesList recipes={recipes} matchingRecipes={recipes} />

          {/* <Suspense fallback={<Loading/>}>
            <RecipesList recipes={recipes} matchingRecipes={recipes} />
          </Suspense>  */}

        </div>

        <div className="testing debeug">


          
        </div>
      </PageWrapper>

    <StoreDebbuger/>
    </>
  )
}
export default SandBoxPage