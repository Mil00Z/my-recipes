
import { useStore } from "@/hooks/dataStore";
import { Tag } from "@/types/tag.types";


interface TagProps {
  element: string;
}


const TagElement = ({element} : TagProps) => {

 const {tags,removeTag,updateResults,recipes,matchingRecipes} = useStore();




  function filteredData(type: string, value: string) {
     return matchingRecipes.filter((recipe: Recipe) => {
 
         // 1. Vérifier tous les tags existants
         const existTags = tags.every((tag:Tag) => {
                 switch(tag.type) {
 
                     case 'ingredients':
                         return recipe.ingredients.some(ing => 
                         ing.ingredient.toLowerCase() === tag.value
                     );
 
                     case 'ustensils':
                     return recipe.ustensils.includes(tag.value);
 
                     case 'appliances':
                     return recipe.appliance.toLowerCase() === tag.value;
 
                     case 'timing':
                     return recipe.time === parseInt(tag.value);
 
                     default:
                     return false
                 }
             });
 
         // 2. Vérifier le nouveau tag
         const newTagMatch = (() => {
             switch(type) {
                 case 'ingredients':
                 return recipe.ingredients.some(ing => 
                     ing.ingredient.toLowerCase() === value
                 );
                 case 'ustensils':
                 return recipe.ustensils.includes(value);
 
                 case 'appliances':
                 return recipe.appliance.toLowerCase() === value;
 
                 case 'timing':
                 return recipe.time === parseInt(value);
 
                 default:
                 return false
             }
         })();
 
         // 3. La recette doit matcher tous les critères
         return existTags && newTagMatch;
     });
  }


  function handleRemoveTag (tag:Tag)  {

    removeTag(tag)

  
  }

  // useEffect(() => {

  
   
  //   if(tags.length === 0){
      
  //     updateResults(recipes);

  //     return;
  //   }

   
  //   const filteredResults = matchingRecipes.filter((recipe: Recipe) => {
      
  //     return tags.every((tag:Tag) => {

  //           switch(tag.type) {

  //               case 'ingredients':
  //               return recipe.ingredients.some(ing => 
  //                       ing.ingredient.toLowerCase() === tag.value
  //                   );

  //               case 'ustensils':  
  //                return recipe.ustensils.map((ustensil : string) => ustensil.toLowerCase())
  //                .includes(tag.value);

  //               case 'appliances':
  //               return recipe.appliance.toLowerCase() === tag.value;

  //               case 'timing':
  //               return recipe.time === parseInt(tag.value);

  //               default:
  //               return false
  //             }
  //         });
  //   })

   
  //   updateResults(filteredResults);

  // },[tags])

  
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