"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import type { Recipe } from "@/types/recipe.types";
import type { Ingredient } from "@/types/ingredient.types";
import type { Appliance } from "@/types/appliance.types";
import type { Ustensil } from "@/types/ustensil.types";

import { normalizeRecipe } from "@/utils/normalizeRecipeApi";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Loading from "@/components/Loading/Loading";
import FeedbackBlock from "@/components/FeedbackBlock/FeedbackBlock";

import StoreDebbuger from "@/components/Debeug/Debeug";

//Styles
import "./Recipe.scss";

const RecipeSingle = () => {
  const [fetchedRecipe, setFetchedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const [deletedRecipe, setDeletedRecipe] = useState<any>();
  const [showAdminFlow, setShowAdminFlow] = useState<Boolean>(false);

  //Get Url Params
  const getParams = useParams();

  //Routing
  const router = useRouter();

  // TimeOut delay
  let timeOutTiming: number = 3000;


  const handleDeleteRecipe = async () => {
    if (
      window.confirm(
        `Suppression de la recette ${getParams.id} - ${fetchedRecipe?.title} ?`
      )
    ) {
      try {
        const response = await fetch(`/api/recipes/${getParams.id}`, {
          method: "delete",
        });

        if (!response.ok) {
          throw new Error("Failed to Delete Recipe");
        }

        const result = await response.json();
        setDeletedRecipe(result);

        //Delai for transition
        setTimeout(() => {
          //Redirect
          router.push("/");
        }, timeOutTiming);
      } catch (error) {
        console.error("Erreur réseau ou autre:", error);
      }
    }
  };

  useEffect(() => {
    if (!getParams.id) {
      setIsError(true);
      return;
    }

    const fetchSingleRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${getParams.id}`);

        if (!response.ok) {
          setIsLoading(false);
          setIsError(true);
          return;
        }

        const singleData = await response.json();

        setIsLoading(false);
        setFetchedRecipe(normalizeRecipe(singleData));
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };

    fetchSingleRecipe();

    //Prefetch le redirect
    router.prefetch("/");
  }, [getParams.id]);

  //Guard
  if (isLoading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
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
          Retour à l'accueil
        </Link>
      </PageWrapper>
    );
  }

  if (deletedRecipe && deletedRecipe.message) {
    return (
      <PageWrapper>
        <FeedbackBlock
          type={"success"}
          message={`${deletedRecipe.message}`}
          content={`Redirection dans ${timeOutTiming / 1000} sec(s)...`}
        />
      </PageWrapper>
    );
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
                  <span className="meta-badge__value">
                    {fetchedRecipe.time} min(s)
                  </span>
                </div>
              </div>

              <div className="meta-badge meta-badge--servings">
                <span className="meta-badge__icon">👥</span>
                <div className="meta-badge__content">
                  <span className="meta-badge__label">Portions</span>
                  <span className="meta-badge__value">
                    {fetchedRecipe.servings} pers.
                  </span>
                </div>
              </div>

              <div className="meta-badge meta-badge--updated">
                <span className="meta-badge__icon">📅</span>
                <div className="meta-badge__content">
                  <span className="meta-badge__label">Mis à jour</span>
                  <span className="meta-badge__value">
                    {fetchedRecipe.updatedAt ? new Date(fetchedRecipe.updatedAt).toLocaleDateString() : 'Date inconnue'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="recipe-content">
            <div className="recipe-image-container">
              <Image
                src={fetchedRecipe.image ? fetchedRecipe.image : "/default.jpg"}
                alt={fetchedRecipe.title}
                width={800}
                height={600}
                className="recipe-image"
                onClick={() => setShowAdminFlow(true)}
              />
              {showAdminFlow && (
                <>
                  <button
                    className="btn btn-delete recipe-delete-btn"
                    onClick={() => handleDeleteRecipe()}
                  >
                    🗑️ Supprimer la recette
                  </button>

                  <Link
                    className="btn link recipe-update-btn"
                    href={`/recipes/${fetchedRecipe.id}/edit`}
                  >
                    🛒 Mettre à jour la recette
                  </Link>
                </>
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
                    <h3 className="equipment-item__label">
                      Appareil principal
                    </h3>
                    <div className="equipment-item__value">
                      {fetchedRecipe.appliances.length > 0 ? (
                        fetchedRecipe.appliances.map(
                          (applianceItem: Appliance, index: number) => (
                            <span
                              key={`${applianceItem.name}-${index}`}
                              className="equipment-tag"
                            >
                              {applianceItem.name}
                            </span>
                          )
                        )
                      ) : (
                        <span className="equipment-empty">Aucun appareil</span>
                      )}
                    </div>
                  </div>

                  <div className="equipment-item">
                    <h3 className="equipment-item__label">
                      Ustensiles à prevoir
                    </h3>
                    <div className="equipment-item__value">
                      {fetchedRecipe.ustensils.length > 0 ? (
                        fetchedRecipe.ustensils.map(
                          (ustensilItem: Ustensil, index: number) => (
                            <span
                              key={`${ustensilItem.name}-${index}`}
                              className="equipment-tag"
                            >
                              {ustensilItem.name}
                            </span>
                          )
                        )
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
                    {fetchedRecipe.ingredients.map(
                      (ingredientItem: Ingredient, index: number) => (
                        <li
                          key={`${ingredientItem.ingredient}-${index}`}
                          className="ingredient-item"
                        >
                          <span className="ingredient-name">
                            {ingredientItem.ingredient}
                          </span>
                          <span className="ingredient-quantity">
                            {ingredientItem.quantity}
                          </span>
                          <span className="ingredient-unit">
                            {ingredientItem.unit}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <footer
            role="contentinfo"
            className="recipe-footer"
            aria-label="footer de la recette"
          >
            <Link href="/" className="btn btn-back">
              <span className="btn-icon">←</span>
              Retour à l'accueil
            </Link>
          </footer>
        </article>
      </PageWrapper>
    </>
  );
};
export default RecipeSingle;
