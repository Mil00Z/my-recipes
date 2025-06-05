
import type { Recipe } from "@/types/recipe.types";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import Recipe from "@/app/recipe/[id]/page";

interface RecipesListProps {
  recipes: Recipe[];
  matchingRecipes: Recipe[];
}

const RecipesList = ({recipes,matchingRecipes}:RecipesListProps) => {

console.log(recipes);

  return (
    <section className="recipes-container">
      {recipes.map((recipe:Recipe) => {
        return (<RecipeCard key={recipe.id} recipe={recipe} />) 
      })}
    </section>
  )
};
export default RecipesList