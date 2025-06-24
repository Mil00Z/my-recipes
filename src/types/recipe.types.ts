export type Recipe = {
  id:string;
  image ?:string;
  title:string;
  servings:number;
  ingredients: {
    ingredient:string;
    quantity:number;
    unit ?: string | null ;
  }[],
  time:number;
  description:string;
  appliance:string;
  ustensils:string[];
}