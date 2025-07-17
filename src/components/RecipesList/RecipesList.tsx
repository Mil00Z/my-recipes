
import type { Recipe } from "@/types/recipe.types";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

//Styles
import "./RecipesList.scss";


interface RecipesListProps {
  recipes: Recipe[];
  matchingRecipes: Recipe[];
}

const RecipesList = ({recipes,matchingRecipes}:RecipesListProps) => {

const displayedRecipes = matchingRecipes?.length > 0 ? matchingRecipes : recipes;

  return (
    <section className="recipes-container">
      {displayedRecipes.map((recipe:Recipe) => {
        return (<RecipeCard key={recipe.id} recipe={recipe} />) 
      })}
    </section>
  )
};
export default RecipesList