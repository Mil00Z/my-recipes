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


