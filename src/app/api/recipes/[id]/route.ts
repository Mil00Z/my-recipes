import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    const {data: RawRecipe, error} = await supabase.from('Recipes').select('*,_RecipeIngredients(quantity,unit,Ingredients(ingredient,updatedAt)),Ustensils(name,updatedAt),Appliances(name,updatedAt)').eq('id',id).single();

   
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
    const { error: errorRecipe } = await supabase
      .from('Recipes')
      .delete()
      .eq('id', currentRecipeId);

    if(errorRecipe){
      throw new Error(`Delete Recipe Failed: ${errorRecipe.message}`);
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


