
import {useEffect,useState} from "react";
import { useStore } from "@/hooks/dataStore";
import { Tag } from "@/types/tag.types";


interface TagProps {
  element: string;
}


const TagElement = ({element} : TagProps) => {

 const {tags,removeTag,updateResults,recipes,matchingRecipes} = useStore();
 const [tagsHasChanged, setTagsHasChanged] = useState<Boolean>(false);


  // function filteredData(type: string, value: string) {
  //    return matchingRecipes.filter((recipe: Recipe) => {
 
  //        // 1. Vérifier tous les tags existants
  //        const existTags = tags.every((tag:Tag) => {
  //                switch(tag.type) {
 
  //                    case 'ingredients':
  //                        return recipe.ingredients.some(ing => 
  //                        ing.ingredient.toLowerCase() === tag.value
  //                    );
 
  //                    case 'ustensils':
  //                    return recipe.ustensils.includes(tag.value);
 
  //                    case 'appliances':
  //                    return recipe.appliance.toLowerCase() === tag.value;
 
  //                    case 'timing':
  //                    return recipe.time === parseInt(tag.value);
 
  //                    default:
  //                    return false
  //                }
  //            });
 
  //        // 2. Vérifier le nouveau tag
  //        const newTagMatch = (() => {
  //            switch(type) {
  //                case 'ingredients':
  //                return recipe.ingredients.some(ing => 
  //                    ing.ingredient.toLowerCase() === value
  //                );
  //                case 'ustensils':
  //                return recipe.ustensils.includes(value);
 
  //                case 'appliances':
  //                return recipe.appliance.toLowerCase() === value;
 
  //                case 'timing':
  //                return recipe.time === parseInt(value);
 
  //                default:
  //                return false
  //            }
  //        })();
 

         // 3. La recette doit matcher tous les critères
         //return existTags && newTagMatch;
     //});
  //}

  //        // 3. La recette doit matcher tous les critères
  //        return existTags && newTagMatch;
  //    });
  // }


  function filterRecipesByTags(recipes: Recipe[], tags: Tag[]) {
  if (tags.length === 0) return recipes;
  return recipes.filter((recipe) =>
    tags.every((tag) => {
      switch (tag.type) {
        case 'ingredients':
          return recipe.ingredients.some(ing =>
            ing.ingredient.toLowerCase() === tag.value.toLowerCase()
          );
        case 'ustensils':
          return recipe.ustensils
            .map(u => u.toLowerCase())
            .includes(tag.value.toLowerCase());
        case 'appliances':
          return recipe.appliance.toLowerCase() === tag.value.toLowerCase();
        case 'timing':
          return recipe.time === parseInt(tag.value);
        default:
          return false;
      }
    })
  );
}

  function handleRemoveTag (tag:Tag)  {

    removeTag(tag);
    
}

   
 useEffect(() => {

  let baseSource : Recipe[] = [];

    if (tags.length === 0) {

      baseSource = recipes ;
   
    } else {

      baseSource = matchingRecipes;
      setTagsHasChanged((tagsHasChanged:Boolean) => true);
      
    }

    if (tags.length > 0 && tagsHasChanged) {

        const newMatchingRecipes = filterRecipesByTags(recipes, tags);
        updateResults(newMatchingRecipes);

    }

    const filteredResults = filterRecipesByTags(baseSource, tags);
   
    updateResults(filteredResults);

}, [tags]);


  
  return (
    <>
      {tags?.map((tag:Tag,index:number) => {
        return(
          <span key={`${tag.type}-${index}`} className="recipe-tag" data-parent={tag.type}>{tag.value}
            <i className="fa-solid fa-xmark" onClick={() => handleRemoveTag(tag)}></i>
          </span>
        )
      })}
    </>
  )
}
export default TagElement