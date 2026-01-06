import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import type { Appliance } from '@/types/appliance.types';
import type { Ustensil } from '@/types/ustensil.types';
import type { Ingredient } from '@/types/ingredient.types';

import { v4 as uuid } from 'uuid';


// Faire un fichier utils "supabaseConfig.ts"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Vérifier que les variables d'environnement sont bien définies
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes.');
}

// Créer le client Supabase avec la bonne clé de service
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Définir le gestionnaire de requête pour la méthode GET
export async function GET(request: Request, { params } : {params: {id:string}}) {

  //attention await 
  const { id } = await params;

  try {
    // Récupérer toutes les recettes depuis la table 'recipes'
    const {data: RawRecipe, error} = await supabase.from('Recipes').select('*,_RecipeIngredients(quantity,unit,Ingredients(id,ingredient,updatedAt)),Ustensils(id,name,updatedAt),Appliances(id,name,updatedAt)').eq('id',id).single();

   
      // Si de soucis de donnéés
      if (!RawRecipe) {
        return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
      }

      else if (error) {
         console.error("❌ Erreur de connexion ou de requête Supabase:", error);

        return NextResponse.json(
          { message: 'Erreur de connexion ou de requête Supabase:',
          error : error
         } 
        );
      }
    
    return NextResponse.json(RawRecipe, { status: 200 }); 

  } catch (err) {
   
    console.error('Erreur inattendue dans la route API:', err);
    
    return NextResponse.json(
      {error:'Une erreur serveur est survenue...'},
      {status:500}
    );
  }
}


export async function DELETE(request: Request, context: { params: { id: string } } 
  ){

  const params = await context.params;
  const currentRecipeId = params.id;

  if(!currentRecipeId) {
    console.error('Error On ID recipe');
    return NextResponse.json(
      {error:"Erreure sur l'id de la recette"},
      {status:500}
    ); 
  }

  try{
    // liens Appliances
    const { error: errorAppliances, count } = await supabase
      .from('_RecipeAppliances')
      .delete({count:"exact"})
      .eq('A', currentRecipeId);
      
    if(errorAppliances){
      throw new Error(`Delete Jointed Appliances Failed: ${errorAppliances.message}`);
    }

    if (count === 0) {
      console.warn(`Aucun lien d'appliance trouvé pour la recette ${currentRecipeId}`);
    }
    console.log(`...Liens Appliances pour ${currentRecipeId} supprimés.`);


    // liens Ustensils 
    const { error: errorUstensils } = await supabase
      .from('_RecipeUstensils')
      .delete({count:"exact"})
      .eq('A', currentRecipeId);
      
    if(errorUstensils){
      throw new Error(`Delete Jointed Ustensils Failed: ${errorUstensils.message}`);
    }

    if (count === 0) {
      console.warn(`Aucun lien d'ustensile trouvé pour la recette ${currentRecipeId}`);
    }
    console.log(`...Liens Ustensils pour ${currentRecipeId} supprimés.`);


    //liens Ingredients
    const { error: errorIngredients } = await supabase
      .from('_RecipeIngredients')
      .delete({count:"exact"})
      .eq('A', currentRecipeId);
      
    if(errorIngredients){
      throw new Error(`Delete Jointed Ingredients Failed: ${errorIngredients.message}`);
    }

    if(count === 0) {
      console.warn(`Aucun lien d'ingrédient trouvé pour la recette ${currentRecipeId}`);
    }
    console.log(`...Liens Ingrédients pour ${currentRecipeId} supprimés.`);


    // Recipe
    const { error: errorRecipe, countRecipe } = await supabase
      .from('Recipes')
      .delete({ count: 'exact' })
      .eq('id', currentRecipeId);

    if(errorRecipe){
      throw new Error(`Delete Recipe Failed: ${errorRecipe.message}`);
    }

    if (countRecipe === 0) {
       return NextResponse.json(
         { message: "Recette introuvable ou déjà supprimée." }, 
         { status: 404 }
       );
    }



    // Finaly 
    console.log(`✅ Recette ${currentRecipeId} supprimée avec succès.`);
    
    return NextResponse.json(
      {message:`Recette ${currentRecipeId} supprimée`},
      {status:200}
    );

  } catch(err){
    console.error('Erreur inattendue dans la route API:', err);
    
    return NextResponse.json(
      {error:'Une erreur serveur est survenue...'},
      {status:500}
    );
  }
}



 export async function PATCH(request: Request, context: { params: { id: string } } ){

  const params = await context.params;
  const currentRecipeId = params.id;


  try{

    const newRecipeDatas = await request.json();
    const {ingredients,appliances,ustensils,...recipeDataOnly} = newRecipeDatas;
    console.log("👉 Payload reçu:", newRecipeDatas);

    const {data:updatedRecipeData,error:updatedRecipeError} = await supabase
      .from('Recipes')
      .update(recipeDataOnly)
      .eq('id',currentRecipeId)
      .select()
      .single();


    if(updatedRecipeError){
      throw new Error(`Update Recipe Failed: ${updatedRecipeError.message}`);
    }

    console.log(`✅ Recette ${currentRecipeId} partiellement modifiée avec succès.`);

      //Appliances
      if(appliances && appliances.length > 0){

        // Clear Existing Joints
        const {error:deleteAppliancesError} = await supabase
        .from('_RecipeAppliances')
        .delete()
        .eq('A',currentRecipeId)

        if(deleteAppliancesError){
          throw new Error(`Update Joints Appliances Failed`);
        }   

        const appliancesToInsert = appliances.map((appliance:Appliance) => ({
          A:currentRecipeId,
          B:appliance.id
        }))

        // Insert new Link Appliances
        const {error:appliancesInsertError} = await supabase
        .from('_RecipeAppliances')
        .insert(appliancesToInsert)
        
        
        if(appliancesInsertError){
          throw new Error(`Insert Joints Appliances Failed`);
        }

        console.log(`〰 ${appliancesToInsert.length} appareils liés.`);
      }

      //Ustensils
      if(ustensils && ustensils.length > 0){

        // Clear Existing Joints
        const {error:deleteUstensilsError} = await supabase
        .from('_RecipeUstensils')
        .delete()
        .eq('A',currentRecipeId)

        if(deleteUstensilsError){
          throw new Error(`Update Joints Ustensils Failed`);
        }   

        const ustensilsToInsert = ustensils.map((ustensil:Ustensil) => ({
          A:currentRecipeId,
          B:ustensil.id
        }))

        // Insert new Link Appliances
        const {error:ustensilsInsertError} = await supabase
        .from('_RecipeUstensils')
        .insert(ustensilsToInsert)
        
        
        if(ustensilsInsertError){
          throw new Error(`Insert Joints Ustensils Failed`);
        }

        console.log(`〰 ${ustensilsToInsert.length} appareils liés.`);

      }
      
      //Ingredients
      if(ingredients && ingredients.length > 0){

        console.log("👉 Entrée dans le bloc ingrédients");
       
        // Clear Existing Joints
        const {error:deleteIngredientsError} = await supabase
        .from('_RecipeIngredients')
        .delete()
        .eq('A',currentRecipeId)

        if(deleteIngredientsError){
          throw new Error(`Update Joints Ingredients Failed`);
        }   


        const ingredientsToInsert: Ingredient[] = [];

        for( const item of ingredients ){

          // Si l'ingrédient n'a pas d'ID, on le crée
          let ingredientId = item.id;
          
          if(!ingredientId || ingredientId === ""){

            console.log('ingrédient ID = ', ingredientId || 'no ID');
            const generatedId = uuid();
            
            const { data: newIngredientData, error: insertIngredientError } = await supabase
              .from('Ingredients')
              .insert({ 
                id: generatedId,
                ingredient: item.ingredient 
              })
              .select()
              .single();

            if (insertIngredientError) {
              throw new Error(`Insert Ingredient Failed: ${insertIngredientError.message}`);
            }

            console.log(newIngredientData);
          }
        }

        // const ingredientsToInsert = ingredients.map((ingredient:Ingredient) => ({
        //   A:currentRecipeId,
        //   B:ingredient.id,
        //   quantity:ingredient.quantity,
        //   unit:ingredient.unit
        // }))

        // Insert new Link Ingredients
        // const {error:ingredientsInsertError} = await supabase
        // .from('_RecipeIngredients')
        // .insert(ingredientsToInsert)
        
        
        // if(ingredientsInsertError){
        //   throw new Error(`Insert Joints Ingredients Failed`);
        // }

        // console.log(`〰 ${ingredientsToInsert.length} ingrédients liés.`);
        
      }

    // Finaly 
    return NextResponse.json(
      {message:`Recette ${currentRecipeId} modifiée !`},
      {status:200}
    );

  }catch(err){
    console.error('Erreur inattendue dans la route API:', err);
    
    return NextResponse.json(
      {error:'Une erreur serveur est survenue...'},
      {status:500}
    );
  }

}

