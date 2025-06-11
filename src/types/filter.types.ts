export type Filter = {
  type : 'ingredients' | 'appliances' | 'ustensils' | 'timing';
  title: string;
  method : (value:string) => void;  
};