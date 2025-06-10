import { create } from 'zustand';
import {persist} from 'zustand/middleware';

import type { Recipe } from '@/types/recipe.types';
import {recipes as initialRecipes} from '@/datas/recipes';


type Store = {
  recipes: Recipe[];
  count:number;
  matchingRecipes: Recipe[];
  incrementCount: () => void;
  updateResults: (results: Recipe[]) => void;
  resetResults: () => void;
};  

export const useStore = create<Store>(
  persist((set) => ({
  recipes: initialRecipes,
  count:initialRecipes.length,
  matchingRecipes: [],
  incrementCount: () => set((state) => ({ count: state.count + 1})),
  updateResults: (results:Recipe[]) => set((state) => ({    matchingRecipes:results,
  count:results?.length ?? state.initialRecipes.length
  })),
  resetResults: () => set((state) => ({ 
  matchingRecipes: [],
  count: initialRecipes.length
  })),
}),{
  name:'recipes-stored',
  }
)
);

