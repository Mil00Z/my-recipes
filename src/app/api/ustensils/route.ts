import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server'


// Récupérer les variables d'environnement.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Vérifier que les variables d'environnement sont bien définies
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes.');
}

// Créer le client Supabase avec la bonne clé de service
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Définir le gestionnaire de requête pour la méthode GET
export async function GET() {

  const supabase = await createClient()


  try {

    const { data: RawUstensils, error } = await supabase.from('Ustensils').select('*');

    // Si de soucis de donnéés
    if (!RawUstensils) {
      return NextResponse.json({ error: 'Ustensils not found' }, { status: 404 });
    }

    else if (error) {
      console.error("❌ Erreur de connexion ou de requête Supabase:", error);

      return NextResponse.json(
        {
          message: 'Erreur de connexion ou de requête Supabase:',
          error: error
        }
      );
    }

    return NextResponse.json(RawUstensils);

  } catch (err) {

    console.error('Erreur inattendue dans la route API:', err);

    return NextResponse.json(
      { error: 'Une erreur serveur est survenue...' },
      { status: 500 }
    );
  }
}
