import { create } from 'zustand';

import type { Recipe } from '@/types/recipe.types';
import {recipes} from '@/datas/recipes';

type Store = {
  initialRecipes: Recipe[];
  count:number;
  matchingRecipes: Recipe[];
  incrementCount: () => void;
};  

export const useStore = create<Store>((set) => ({
  initialRecipes: recipes,
  count:recipes.length,
  matchingRecipes: [],
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
}));

