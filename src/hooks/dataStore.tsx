import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Recipe } from '@/types/recipe.types';
import type { Tag	 } from '@/types/tag.types';

//Datas
import {recipes as initialRecipes} from '@/datas/recipes.json';


type Store = {
  recipes: Recipe[];
  count:number;
  matchingRecipes: Recipe[];
  tags: Tag[];
  newRecipes:Recipe[]
  incrementCount: () => void;
  updateResults: (results: Recipe[]) => void;
  resetResults: () => void;
  updateTags: (tag:Tag) => void;
  removeTag: (tag:Tag) => void;
  resetTags: () => void;
  addRecipe:(formRecipe: Recipe) => void;
};  


export const useStore = create<Store>()(

  persist((set) => ({
      recipes: initialRecipes,
      count:initialRecipes.length,
      matchingRecipes: [],
      tags: [],
      newRecipes:[],
      incrementCount: () => set((state) => ({ count: state.count + 1})),
      updateResults: (results:Recipe[]) => set((state) => ({    
      matchingRecipes:results,
      count: results?.length ?? state.recipes.length
      })),
      resetResults: () => set(() => ({ 
      matchingRecipes: [],
      count: initialRecipes.length
      })),
      updateTags: (tag:Tag) => set((state) => {

        const tagExists = state.tags.some((existantTag:Tag) => 
        existantTag.type === tag.type && 
        existantTag.value === tag.value);
    
      return {tags: tagExists ? state.tags : [...state.tags, tag]}

    }),
      removeTag: (tag: Tag) => set((state) => {

      const updatedTags = state.tags.filter((existantTag:Tag) => 
          existantTag.type !== tag.type || existantTag.value !== tag.value)

      return {tags: updatedTags}
   
      }),
      resetTags: () => set(() => ({tags: []})),
      addRecipe: (formRecipe:Recipe) => set((state) => ({
        newRecipes:[...state.newRecipes,formRecipe]
      }))
  }),{
    name:'recipes-stored',
    getStorage: () => localStorage,
    }
  ))


