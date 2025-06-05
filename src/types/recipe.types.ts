export type Recipe = {
  id:string;
  image ?:string;
  title:string;
  servings:number;
  ingredients: {
    ingredient:string;
    quantity:number;
    unit ?: number
  }[],
  time:number;
  description:string;
  appliance:string;
  ustentils:string[];
}