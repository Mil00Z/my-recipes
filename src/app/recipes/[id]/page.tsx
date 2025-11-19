'use client';

import {useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useParams } from "next/navigation";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Appliance } from "@/types/appliance.types";
import type { Ustensil } from "@/types/ustensil.types";

import { normalizeRecipe } from '@/utils/normalizeRecipeApi';
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./Recipe.scss";


const RecipeSingle = () => {

//  const MOCK_RECIPE_DATA = {
//   "id": "132",
//   "image": "/hf/default-recipe.jpg",
//   "title": "Linguine forestière & duo de fromages",
//   "description": "Nettoyer champignons et ciselez ail et échalote. Faire dorer l'échalote et l'ail dans une sauteuse avec du beurre puis ajouter les champignons et laissez cuire 7 mins. Déglacer les champignons avec du vinaigre balsamique et poivrez. Faire cuire les Linguine 9 min dans une casserole et réserver une louche d'eau de cuisson. A feux doux, rajouter les linguines à la sauteuse ainsi que l'eau de cuisson, quelques miettes de bouillons de légumes, et le fromage rapé. Remuer et laissez chauffer pour avoir une consistance crémeuse. Couper le feu et incorporer le fromage frais et mélanger. Servir la préparation sur un lit de salade",
//   "servings": 2,
//   "time": 30,
//   "ingredients": [
//     {
//       "ingredient": "champignons de paris",
//       "quantity": 250,
//       "unit": "grammes"
//     },
//       {

//       "ingredient": "ail",

//       "quantity": 1,

//       "unit": "gousse"

//     },

//     {

//       "ingredient": "échalote",

//       "quantity": 1,

//       "unit": "pièce"

//     },

//     {

//       "ingredient": "linguine",

//       "quantity": 180,

//       "unit": "grammes"

//     },

//     {

//       "ingredient": "fromage râpé à l'italienne",

//       "quantity": 1,

//       "unit": "sachet"

//     },

//     {

//       "ingredient": "fromage frais à tartiner à la truffe",

//       "quantity": 1,

//       "unit": "pot"

//     },

//     {

//       "ingredient": "salade verte type roquette",

//       "quantity": 1,

//       "unit": "sachet"

//     },

//     {

//       "ingredient": "beurre",

//       "quantity": 2,

//       "unit": "cc"

//     },

//     {

//       "ingredient": "vinaigre balsamique ou de riz",

//       "quantity": 2,

//       "unit": "cc"

//     },

//     {

//       "ingredient": "bouillon cube",

//       "quantity": 0.5,

//       "unit": "pièce"

//     },

//     {

//       "ingredient": "poivre",

//       "quantity": 1,

//       "unit": "pincée"

//     },

//     {

//       "ingredient": "sel",

//       "quantity": 1,

//       "unit": "pincée"

//     } 
//   ],
//   "appliances": [
//     { "name": "Sauteuse", 
//       "updatedAt": "2025-11-13T15:39:40.106" }
//   ],
//   "ustensils": [
//     { "name": "passoire", 
//       "updatedAt": "2025-11-13T15:39:40.319" },
//     { "name": "casserole", 
//       "updatedAt": "2025-11-13T15:39:40.319" }
//   ],
//   "updatedAt": "2025-11-13T15:39:39.956"
// };


  const [fetchedRecipe,setFetchedRecipe] = useState<Recipe | null>(null);
  const [isLoading,setIsLoading] = useState<Boolean>(true);
  const [isError,setIsError] = useState<Boolean>(false);
  const [deletedRecipe,setDeletedRecipe] = useState<any>();
  const [showDeleteButton,setShowDeleteButton] = useState<Boolean>(false);


  //Get Url Params
  const getParams = useParams();

  //Routing
  const router = useRouter();


  // TimeOut delay
  let timeOutTiming : number = 4300 ;


  const handleDeleteRecipe = async (element:Event) => {

    if(window.confirm(`Suppression de la recette ${getParams.id} - ${fetchedRecipe.title} ?`)) {

      try{

      const response = await fetch(`/api/recipes/${getParams.id}`, {
        method:"delete",
      })  


      if(!response.ok){
        throw new Error('Failed to Delete Recipe')
      }
      
      
      const result = await response.json();
      setDeletedRecipe(result);

      //Delai for transition
      setTimeout(() => {
          
       
        //Redirect
        // router.push('/');
          
        }, timeOutTiming);

      } catch(error){
        console.error('Erreur réseau ou autre:', error);
      }
    }
  }


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
        
        setIsLoading(false);
        setFetchedRecipe(normalizeRecipe(singleData));

      } catch(err) {

          console.error(err);
          setIsError(true);

      }
      
    }

    fetchSingleRecipe();

    //Prefetch le redirect
    router.prefetch('/');

  },[getParams.id]);


  //Guard
 if (isLoading) {
    return (
      <PageWrapper>
          <Loading />
      </PageWrapper>
    )
  }

  if (!fetchedRecipe) {
    return (
      <PageWrapper>
          <div className="recipe-not-found"> 😭 Recipe not found</div>
          <Link href="/" className="btn btn-back">
              <span className="btn-icon">←</span>
              Retour à l'accueil
          </Link>
      </PageWrapper>
    )
  }

  if (isError) {
    return (
      <PageWrapper>
          <div className="recipe-not-found"> ❌ Error with fetching Datas from Recipe </div>
          <Link href="/" className="btn btn-back">
              <span className="btn-icon">←</span>
              Retour à l'accueil
          </Link>
      </PageWrapper>
    )
  }


  if (deletedRecipe && deletedRecipe.message) {
    return (
      <PageWrapper>
        <div className="success-message">
            <h2>✅ {deletedRecipe.message} !</h2>
            <p>Redirection dans {timeOutTiming / 1000} sec(s)...</p>
            <Link href="/" className="link btn btn-cta">{`Retourner sur la page d'accueil`}</Link>
        </div>
      </PageWrapper>
    )
  }

 
  return (
  <>
      <PageWrapper>

      <article aria-label="recette" className="recipe-single">
          
          <header className="recipe-header">
            <h1 className="recipe-title">{fetchedRecipe.title}</h1>
            <p className="recipe-description">{fetchedRecipe.description}</p>
            
            <div className="recipe-meta-badges">
              <div className="meta-badge meta-badge--time">
                <span className="meta-badge__icon">⏱️</span>
                <div className="meta-badge__content">
                  <span className="meta-badge__label">Temps</span>
                  <span className="meta-badge__value">{fetchedRecipe.time} min(s)</span>
                </div>
              </div>
              
              <div className="meta-badge meta-badge--servings">
                <span className="meta-badge__icon">👥</span>
                <div className="meta-badge__content">
                  <span className="meta-badge__label">Portions</span>
                  <span className="meta-badge__value">{fetchedRecipe.servings} pers.</span>
                </div>
              </div>

              <div className="meta-badge meta-badge--updated">
                <span className="meta-badge__icon">📅</span>
                <div className="meta-badge__content">
                  <span className="meta-badge__label">Mis à jour</span>
                  <span className="meta-badge__value">{new Date(fetchedRecipe.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="recipe-content">
            
            <div className="recipe-image-container">
                <Image
                  src={fetchedRecipe.image ? fetchedRecipe.image :'/default.jpg'}
                  alt={fetchedRecipe.title}
                  width={800}
                  height={600}
                  className="recipe-image"
                  onClick={()=>setShowDeleteButton(true)}
                />
                {showDeleteButton && (
                  <button 
                    className="btn btn-delete recipe-delete-btn" 
                    onClick={(e) => handleDeleteRecipe(e.target)}
                  >
                    🗑️ Supprimer la recette
                  </button>
                )}
            </div>
           
            <div className="recipe-details">

              <section className="recipe-section recipe-section--equipment">
                <h2 className="recipe-section__title">
                  <span className="recipe-section__icon">🔧</span>
                  Équipements
                </h2>
                
                <div className="equipment-row">
                  <div className="equipment-item">
                    <h3 className="equipment-item__label">Appareil principal</h3>
                    <div className="equipment-item__value">
                      {fetchedRecipe.appliances.length > 0 ? (
                        fetchedRecipe.appliances.map((applianceItem:Appliance,index:number) => (
                          <span key={`${applianceItem.name}-${index}`} className="equipment-tag">
                            {applianceItem.name}
                          </span>
                        ))
                      ) : (
                        <span className="equipment-empty">Aucun appareil</span>
                      )}
                    </div>
                  </div>

                  <div className="equipment-item">
                    <h3 className="equipment-item__label">Ustensiles à prevoir</h3>
                    <div className="equipment-item__value">
                      {fetchedRecipe.ustensils.length > 0 ? (
                        fetchedRecipe.ustensils.map((ustensilItem:Ustensil,index:number) => (
                          <span key={`${ustensilItem.name}-${index}`} className="equipment-tag">
                            {ustensilItem.name}
                          </span>
                        ))
                      ) : (
                        <span className="equipment-empty">Aucun ustensile</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
              
              {fetchedRecipe.ingredients.length > 0 && (
                <section className="recipe-section recipe-section--ingredients">
                  <h2 className="recipe-section__title">
                    <span className="recipe-section__icon">🥘</span>
                    Ingrédients
                  </h2>
                  <ul className="ingredients-list">
                    {fetchedRecipe.ingredients.map((ingredientItem:Ingredient,index:number) => (
                      <li key={`${ingredientItem.ingredient}-${index}`} className="ingredient-item">
                        <span className="ingredient-name">{ingredientItem.ingredient}</span>
                        <span className="ingredient-quantity">{ingredientItem.quantity}</span>
                        <span className="ingredient-unit">{ingredientItem.unit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
            </div>

          </div>

          <footer role="contentinfo" className="recipe-footer" aria-label="footer de la recette">
            <Link href="/" className="btn btn-back">
              <span className="btn-icon">←</span>
              Retour à l'accueil
            </Link>
          </footer>

        </article>

      </PageWrapper>
      
  </>
  )
}
export default RecipeSingle