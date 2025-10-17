import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Recipe } from '@/types/recipe.types';
import type { Tag	 } from '@/types/tag.types';

import { normalizeRecipe } from '@/utils/normalizeRecipeApi';


//Datas
// import {recipes as initialRecipes} from '@/datas/recipes.json';


type Store = {
  recipes: Recipe[];
  count:number;
  matchingRecipes: Recipe[];
  tags: Tag[];
  isLoading:boolean;
  isError:boolean;
  incrementCount: () => void;
  updateResults: (results: Recipe[]) => void;
  resetResults: () => void;
  updateTags: (tag:Tag) => void;
  removeTag: (tag:Tag) => void;
  resetTags: () => void;
  fetchRecipes: () => Promise<void>;
};  


export const useStore = create<Store>()(

  persist((set) => ({
      recipes: [],
      count:0,
      matchingRecipes: [],
      tags: [],
      isLoading:true,
      isError:false,
      incrementCount: () => set((state) => ({ count: state.count + 1})),
      updateResults: (results:Recipe[]) => set((state) => ({    
      matchingRecipes:results,
      count: results?.length ?? state.recipes.length
      })),
      resetResults: () => set((state) => ({ 
      matchingRecipes: state.recipes,
      count: state.recipes.length
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
      fetchRecipes: async () => {

        try {
          const response = await fetch('/api/recipes');

          if (!response.ok) {
            throw new Error('Failed to fetch Recipes');
          }  

          const fetchedRecipes = await response.json();

          console.log('Données BRUTES reçues de l\'API:', fetchedRecipes);

          const cleanRecipes = fetchedRecipes.map((rawRecipe) => normalizeRecipe(rawRecipe))
          
          set(() => ({
            recipes: cleanRecipes,
            matchingRecipes: cleanRecipes,
            isLoading:false,
            isError:false
            }
          ));
          
        } catch (error) {

          set(() => ({
              isLoading:false,
              isError:true
              }
          )); 

          console.error("Erreur lors de la récupération des recettes:", error);
           
        }
      }
    }),{
    name:'recipes-stored',
    }
  ))


