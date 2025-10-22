import type { Recipe } from "@/types/recipe.types"
import type { Tag } from "@/types/tag.types"

export const filterRecipesByTags = (sourceData:Recipe[],tags:Tag[]) : Recipe[] => {

  return sourceData.filter((recipe) =>
    tags.every((tag) => {
      switch (tag.type) {
        case 'ingredients':
          return recipe.ingredients.some(ing =>
            ing.ingredient.toLowerCase() === String(tag.value).toLowerCase()
          );

        case 'ustensils':
          return recipe.ustensils.some(ustensil => 
            ustensil.name.toLowerCase() === String(tag.value).toLowerCase()
          );
         
        case 'appliances':
          return recipe.appliances.some(appliance => 
            appliance.name.toLowerCase() === String(tag.value).toLowerCase()
          );

        case 'timing':
          return recipe.time === parseInt(String(tag.value));

        default:
          return false;
      }
    })
  );

}