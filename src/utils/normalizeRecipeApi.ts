import { Recipe } from "@/types/recipe.types";
import { Ingredient } from '@/types/ingredient.types';

export type RawRecipe = {
  id:string;
  image ?:string;
  title:string;
  description:string;
  servings:number;
  time:number;
  _RecipeIngredients: {
    Ingredients: {
      ingredient: string;
    };
    quantity: number | undefined;
    unit: string | undefined;
  }[];
  Appliances:any[];
  Ustensils:any[];
}

export function normalizeRecipe(rawRecipe:RawRecipe) : Recipe {


  const cleanIngredients : Ingredient[] = rawRecipe._RecipeIngredients.map((item) => ({
    ingredient:item.Ingredients?.ingredient ?? '',
    quantity:item.quantity,
    unit:item.unit
   }
))


  const cleanRecipe : Recipe = {
    id: rawRecipe.id,
    image: rawRecipe.image,
    title: rawRecipe.title,
    description: rawRecipe.description,
    servings: rawRecipe.servings,
    time: rawRecipe.time,
    ingredients: cleanIngredients,
    appliances: rawRecipe.Appliances,
    ustensils: rawRecipe.Ustensils
  }

  return cleanRecipe
}