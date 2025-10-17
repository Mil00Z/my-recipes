import { Recipe } from "@/types/recipe.types";

export type RawRecipe = {
  id:string;
  image ?:string;
  title:string;
  description:string;
  servings:number;
  time:number;
  Ingredients:any[];
  Appliances:any[];
  Ustensils:any[];
}

export function normalizeRecipe(rawRecipe:RawRecipe) : Recipe {
  
  const cleanRecipe : Recipe = {
    id: rawRecipe.id,
    image: rawRecipe.image,
    title: rawRecipe.title,
    description: rawRecipe.description,
    servings: rawRecipe.servings,
    time: rawRecipe.time,
    ingredients: rawRecipe.Ingredients,
    appliances: rawRecipe.Appliances,
    ustensils: rawRecipe.Ustensils
  }

  return cleanRecipe
}