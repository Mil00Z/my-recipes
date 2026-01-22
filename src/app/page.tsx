'use client';

import { useEffect } from "react";

import { useStore } from "@/hooks/dataStore";
import type { Filter } from "@/types/filter.types";



//UI
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import FilterSearch from "@/components/Filters/Filter";
import ResetTag from "@/components/ResetTag/ResetTag";
import RecipesList from "@/components/RecipesList/RecipesList";
import TagElement from "@/components/Tag/Tag";
import Counter from "@/components/Counter/Counter";


const FiltersDatas: Filter[] = [
  {
    type: 'ingredients',
    title: 'Ingrédients',
  },
  {
    type: 'appliances',
    title: 'Appareils',
  },
  {
    type: 'ustensils',
    title: 'Ustensiles',
  },
  {
    type: 'timing',
    title: 'Minutages',
  }
]


const Home = () => {

  const { recipes, isLoading, isError, fetchRecipes, matchingRecipes } = useStore();


  useEffect(() => {

    // PATCH LOCAL : clean UI on reload | navigation
    // updateResults(recipes);
    // resetTags();

    fetchRecipes();

  }, [fetchRecipes]);


  if (isLoading) {

    return (
      <PageWrapper layout="home" >
        <Loading />
      </PageWrapper>
    )
  }

  if (isError) {
    return (
      <PageWrapper>
        <Error dataType={'recipes'} />
      </PageWrapper>
    );
  }


  return (

    <PageWrapper layout="home">

      <section className="recipes-filter">

        <form action="/" className="form-select">
          <div className="filters-group">

            {FiltersDatas.map((filter: Filter) => {
              return (<FilterSearch key={filter.type} type={filter.type} title={filter.title} />)
            })}

            <ResetTag />

          </div>

          <div className="recipe-taglist">
            <TagElement element="tag" />
          </div>

        </form>

        <Counter value={matchingRecipes.length} />

      </section>

      <RecipesList recipes={recipes} matchingRecipes={matchingRecipes} />

    </PageWrapper>

  )
}
export default Home;