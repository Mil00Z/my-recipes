import { useEffect } from "react";
import { useStore } from "@/hooks/dataStore";

import { filterRecipesByTags } from '@/utils/filterRecipesByTags';

import type { Tag } from "@/types/tag.types";
import type { Recipe } from "@/types/recipe.types";


interface TagProps {
  element: string;
}


const TagElement = ({ element }: TagProps) => {

  const { tags, removeTag, updateResults, recipes, matchingRecipes } = useStore();


  function handleRemoveTag(tag: Tag) {

    removeTag(tag);

    // Je ne sais pas pourquoi cet update forcé ici permets la résolution du soucis : recalcul + update dans le flow B to A
    updateResults(recipes);

  }

  useEffect(() => {

    const getDataSource = (tags: Tag[], matchingRecipes: Recipe[], recipes: Recipe[]) => {

      if (tags.length === 0) {
        // console.log('source tags null',recipes);
        return recipes;
      } else if (matchingRecipes.length !== 0 || tags.length !== 0) {
        // console.log('source tags not null || matchiongRecipes not exist ',matchingRecipes);
        return matchingRecipes;
      } else {
        // console.log('fallback of shit',recipes);
        return recipes;
      }
    };

    const source = getDataSource(tags, matchingRecipes, recipes);

    const filteredResults = filterRecipesByTags(source, tags);

    updateResults(filteredResults);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);




  return (
    <>
      {tags?.map((tag: Tag, index: number) => {
        return (
          <span key={`${tag.type}-${index}`} className={`recipe-${element}`} data-parent={tag.type}>{tag.value}
            <i className="fa-solid fa-xmark" onClick={() => handleRemoveTag(tag)}></i>
          </span>
        )
      })}
    </>
  )
}
export default TagElement