import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Recipe } from '@/types/recipe.types';
import type { Tag	 } from '@/types/tag.types';


import { normalizeRecipe } from '@/utils/normalizeRecipeApi';
import type { RawRecipe } from '@/utils/normalizeRecipe';


//Datas
// import {recipes as initialRecipes} from '@/datas/recipes.json';


type Store = {
  recipes: Recipe[];
  matchingRecipes: Recipe[];
  tags: Tag[];
  newRecipes:Recipe[]
  isLoading:boolean;
  isError:boolean;
  updateResults: (results: Recipe[]) => void;
  resetResults: () => void;
  updateTags: (tag:Tag) => void;
  removeTag: (tag:Tag) => void;
  resetTags: () => void;
  fetchRecipes: () => Promise<void>;
  addRecipe:(formRecipe: Recipe) => void;
};  


export const useStore = create<Store>()(
  persist((set) => ({
      recipes: [],
      matchingRecipes: [],
      tags: [],
      newRecipes:[],
      isLoading:true,
      isError:false,
      updateResults: (results:Recipe[]) => set(() => ({    
        matchingRecipes:results
      })),
      
      resetResults: () => set((state) => ({ 
        matchingRecipes: state.recipes
      })),
      
      updateTags: (tag:Tag) => set((state) => {
        const tagExists = state.tags.some((existantTag:Tag) => 
          existantTag.type === tag.type && 
          existantTag.value === tag.value
        );
        return {tags: tagExists ? state.tags : [...state.tags, tag]}
      }),
      
      removeTag: (tag: Tag) => set((state) => {
        const updatedTags = state.tags.filter((existantTag:Tag) => 
            existantTag.type !== tag.type || existantTag.value !== tag.value
        );
        return {tags: updatedTags}
      }),
      
      resetTags: () => set(() => ({tags: []})),
      
      fetchRecipes: async () => {
        try {
          const response = await fetch('/api/recipes');

          if (!response.ok) {
            throw new Error('Failed to fetch Recipes');
          }  

          const fetchedRecipes = await response.json();
          console.log('Données BRUTES reçues de l\'API:', fetchedRecipes);

          const cleanRecipes = fetchedRecipes.map((rawRecipe:RawRecipe) => normalizeRecipe(rawRecipe));
          
          set(() => ({
            recipes: cleanRecipes,
            matchingRecipes: cleanRecipes,
            isLoading:false,
            isError:false
          }));
          
        } catch (error) {
          set(() => ({
              isLoading:false,
              isError:true
          })); 
          console.error("Erreur lors de la récupération des recettes:", error);
        }
      },
      addRecipe: (formRecipe:Recipe) => set((state) => ({
        newRecipes:[...state.newRecipes,formRecipe]
      }))
    }),{
      name:'recipes-stored',
      getStorage: () => localStorage,
    }
  )
)



