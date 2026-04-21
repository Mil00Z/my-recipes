import type { Ingredient } from "./ingredient.types";
import type { Ustensil } from "./ustensil.types";
import type { Appliance } from "./appliance.types";

export type Recipe = {
  id:string;
  image?:string;
  title:string;
  description:string;
  servings:number;
  time:number;
  ingredients:Ingredient[];
  appliances:Appliance[];
  ustensils:Ustensil[];
  updatedAt?:string;
}