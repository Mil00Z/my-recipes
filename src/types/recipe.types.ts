import type { Ingredient } from "./ingredient.types";

export type Recipe = {
  id:string;
  image ?:string;
  title:string;
  servings:number;
  ingredients: Ingredient[],
  time:number;
  description:string;
  appliance:string;
  ustensils:string[];
}