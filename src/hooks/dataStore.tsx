import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Recipe } from '@/types/recipe.types';
import type { Tag	 } from '@/types/tag.types';

//Datas
import {recipes as initialRecipes} from '@/datas/recipes';


type Store = {
  recipes: Recipe[];
  count:number;
  matchingRecipes: Recipe[];
  tags: Tag[];
  incrementCount: () => void;
  updateResults: (results: Recipe[]) => void;
  resetResults: () => void;
  updateTags: (tag:Tag[]) => void;
};  

export const useStore = create<Store>(
  persist((set) => ({
    recipes: initialRecipes,
    count:initialRecipes.length,
    matchingRecipes: [],
    tags: [],
    incrementCount: () => set((state) => ({ count: state.count + 1})),
    updateResults: (results:Recipe[]) => set((state) => ({    matchingRecipes:results,
    count:results?.length ?? state.initialRecipes.length
    })),
    resetResults: () => set((state) => ({ 
    matchingRecipes: [],
    count: initialRecipes.length
    })),
    updateTags: (tag:Tag) => set((state) => ({
      tags:[...state.tags,tag]
    })),
    removeTag : (tag:Tag) => set((state) => ({
      tags:[]
    }))
  }),{
    name:'recipes-stored',
    }
  )
);

