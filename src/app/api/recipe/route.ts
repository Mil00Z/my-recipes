import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    // Récupérer toutes les recettes depuis la table 'recipes'
    const { data : recipes, error } = await supabase.from('Recipe').select('*,Ingredient(ingredient,quantity,unit),Appliance(name),Ustensil(name)').limit(3);

    // Si Supabase renvoie une erreur, retourner une réponse avec un message clair
    if (error) {
      console.error("❌ Erreur de connexion ou de requête Supabase:", error);

      return NextResponse.json(
        { message: 'Erreur lors de la récupération des données..#1',
          error : error
         }
      );
    }
   
    // Si la requête réussit, retournez les données sous forme de JSON
    // console.log("Données récupérées avec succès :", recipes);
    return NextResponse.json(recipes);

  } catch (err) {
    // Gérer les erreurs inattendues, comme un problème de connexion
    console.error('Erreur inattendue dans la route API:', err);
    
    return NextResponse.json(
      { error: 'Une erreur serveur est survenue...#2' },
      { status: 500 }
    );
  }
}
