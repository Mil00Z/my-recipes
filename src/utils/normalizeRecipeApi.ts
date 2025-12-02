import { Recipe } from "@/types/recipe.types";
import { Ingredient } from '@/types/ingredient.types';
import { Appliance } from '@/types/appliance.types';
import { Ustensil} from '@/types/ustensil.types';

export type RawRecipe = {
  id:string;
  image?:string;
  title:string;
  description:string;
  servings:number;
  time:number;
  _RecipeIngredients: {
    Ingredients: {
      ingredient:string;
    };
    quantity:number | undefined;
    unit:string | undefined;
  }[];
  Appliances:Appliance[];
  Ustensils:Ustensil[];
  updatedAt?:string;
}

export function normalizeRecipe(rawRecipe:RawRecipe) : Recipe {


  const cleanIngredients : Ingredient[] = rawRecipe._RecipeIngredients?.map((item) => ({
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
    ingredients: cleanIngredients ?? [],
    appliances: rawRecipe.Appliances ?? [],
    ustensils: rawRecipe.Ustensils ?? [],
    updatedAt: rawRecipe.updatedAt
  }

  return cleanRecipe
}