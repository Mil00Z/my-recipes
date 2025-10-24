import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Recipe } from '@/types/recipe.types';


 

// Récupérer les variables d'environnement.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Vérifier que les variables d'environnement sont bien définies
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes.');
}

// Créer le client Supabase avec la bonne clé de service
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Définir le gestionnaire de requête pour la méthode GET
export async function GET(request : Request) {

  try {
   
    const { data : RawRecipes, error } = await supabase
    .from('Recipes')
    .select('*,Ingredients(ingredient,quantity,unit),Appliances(name),Ustensils(name)')
    // .order('createdAt',{ascending:false});

    // Si de soucis de donnéés
    if (!RawRecipes) {
      return NextResponse.json({ error: 'Recipes not found' }, { status: 404 });
    }

    else if (error) {
      console.error("❌ Erreur de connexion ou de requête Supabase:", error);

      return NextResponse.json(
        { message: 'Erreur de connexion ou de requête Supabase:',
          error : error
         }  
      );
    }
   
    return NextResponse.json(RawRecipes);
    
  } catch (err) {
 
    console.error('Erreur inattendue dans la route API:', err);

    return NextResponse.json(
      { error: 'Une erreur serveur est survenue...' },
      { status: 500 }
    );
  }
}


export async function POST(request : Request) {

  try{

    const newRecipeData = await request.json();

    const { data : insertedRecipe, error } = await supabase
    .from('Recipes')
    .insert([newRecipeData])
    .select()
    .single()

    if(error){
      console.error("❌ Erreur Supabase lors de l'insertion:", error);
      return NextResponse.json({ message: 'Erreur lors de la création de la recette.', error }, { status: 500 });
    }

  console.log("Recette créée avec succès :", insertedRecipe);
  return NextResponse.json(insertedRecipe ? insertedRecipe : { message: 'Recette créée' }, { status: 201 });

  } catch(error){
      console.error('Erreur inattendue dans la route POST:', error);
      return NextResponse.json(
          { message: 'Erreur de connexion ou de requête Supabase:',
            error : error
          },
          { status: 500 }
        );
    }


}
