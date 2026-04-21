import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/server'


import type { Ingredient } from '@/types/ingredient.types';
import type { Appliance } from '@/types/appliance.types';
import type { Ustensil } from '@/types/ustensil.types';

import { v4 as uuid } from "uuid";



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

    const { data: RawRecipes, error } = await supabase
      .from('Recipes')
      .select('*,_RecipeIngredients(quantity,unit,Ingredients(ingredient)),Appliances(id,name),Ustensils(id,name)')
      .order('createdAt', { ascending: false });

    // Si de soucis de donnéés
    if (!RawRecipes) {
      return NextResponse.json({ error: 'Recipes not found' }, { status: 404 });
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

    // Order Fix Strategy
    if (RawRecipes) {
            RawRecipes.sort((a, b) => {
                if (a.createdAt !== b.createdAt) return 0;
                // Si les dates sont identiques, on trie par ID numérique décroissant
                return Number(b.id) - Number(a.id); 
            });
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


export async function POST(request: Request) {

  const supabase = await createClient()


  try {

    const newRecipeData = await request.json();

    const { appliances, ustensils, ingredients, ...recipeDataOnly } = newRecipeData

    //Insert Simple part of Recipe
    const { data: insertedRecipe, error: insertedRecipeError } = await supabase
      .from('Recipes')
      .insert([recipeDataOnly])
      .select()
      .single()

    if (insertedRecipeError) {
      console.error("❌ Erreur Supabase lors de l'insertion:", insertedRecipeError);
      return NextResponse.json({ message: 'Erreur lors de la création de la recette.', insertedRecipeError }, { status: 500 });
    }

    console.log(`✅ Recette créée avec ID: ${insertedRecipe.id}`);


    //Set Appliance
    if (appliances && appliances.length > 0) {

      const appliancesToInsert = appliances.map((applianceToInsert: Appliance) => ({
        id: uuid(),
        name: applianceToInsert.name
      }
      ))

      // Add new Appliance
      const { data: appliancesInserted, error: appliancesInsertedError } = await supabase.from('Appliances')
        .insert(appliancesToInsert)
        .select('id')

      if (appliancesInsertedError) throw new Error('Creation of appliance Ids Failed');


      const jointsToInsert = appliancesInserted.map((applianceInserted) => ({
        A: insertedRecipe.id,
        B: applianceInserted.id
      }))


      // Create Joints Links
      const { error: applianceJointsError } = await supabase.from('_RecipeAppliances').insert(jointsToInsert)
        .select()

      if (applianceJointsError) throw new Error('Creation of appliance joints Ids Failed');


      console.log(`〰 ${appliancesInserted.length} appareils liés.`);
    }


    //Set Ustensils
    if (ustensils && ustensils.length > 0) {

      const ustensilsToInsert = ustensils.map((ustensilToInsert: Ustensil) => ({
        id: uuid(),
        name: ustensilToInsert.name
      }))

      //Add new ustensil
      const { data: ustensilsInserted, error: ustensilsInsertedError } = await supabase.from('Ustensils').insert(ustensilsToInsert).select('id')

      if (ustensilsInsertedError) throw new Error('Creation of Ustensils Ids Failed');


      const jointsToInsert = ustensilsInserted.map((ustensilInserted) => ({
        A: insertedRecipe.id,
        B: ustensilInserted.id
      }))


      // Create Joints Links
      const { error: ustensilJointsError } = await supabase.from('_RecipeUstensils').insert(jointsToInsert)
        .select()


      if (ustensilJointsError) throw new Error('Creation of ustensils joints Ids Failed');

      console.log(`〰 ${ustensilsInserted.length} ustensiles liés.`);
    }


    //Set Ingredients
    if (ingredients && ingredients.length > 0) {

      // Get datas raws
      const ingredientsToCheck = ingredients.map((ingredientToCheck: Ingredient) => (

        ingredientToCheck.ingredient.toLowerCase().trim()

      ))

      // When : Check ingredients exist
      const { data: checkedIngredients, error: checkedIngredientsError } = await supabase
        .from('Ingredients')
        .select()
        .in('ingredient', ingredientsToCheck);


      if (checkedIngredientsError) throw new Error('Checking similary Ingredient Failed');


      //Isoler les données existantes en base
      const existingIngredients = checkedIngredients.map((checkedIngredient) => checkedIngredient.ingredient
      );

      // Filtrer les valeurs existantes en Db avec celle du formulaire
      const newIngredientsToCreate = ingredients.filter((formItem: Ingredient) => {

        // valeure fixe pour "tester" l'idée
        return !existingIngredients.includes(formItem.ingredient.toLocaleLowerCase().trim())

      });


      let insertedIngredients = [];
      // Then : Create ingredients
      if (newIngredientsToCreate.length > 0) {

        const ingredientsToInsert = newIngredientsToCreate.map((ingredientToInsert: Ingredient) => ({
          id: uuid(),
          ingredient: ingredientToInsert.ingredient.toLocaleLowerCase().trim(),
        }))

        console.log(`Ingrédients connus : ${existingIngredients} // `, 'Nouveaux Ingrédients :', newIngredientsToCreate);


        const { data: inserted, error: insertedError } = await supabase
          .from('Ingredients')
          .insert(ingredientsToInsert)
          .select()

        if (insertedError) throw new Error('Creation of Ingredients Failed');

        insertedIngredients = inserted;

        console.log(`〰 ${insertedIngredients.length} ingrédients partiellement ajouté.`);
      }

      const allIngredients = [...checkedIngredients, ...insertedIngredients];

      const jointsToInsert = ingredients.map((ingredForm: Ingredient) => {

        const matchedIngredient = allIngredients.find((element: { id: string, ingredient: string }) => {

          return element.ingredient.toLowerCase().trim() === ingredForm.ingredient.toLowerCase().trim()

        })

        return {
          A: insertedRecipe.id,
          B: matchedIngredient.id,
          quantity: ingredForm.quantity,
          unit: ingredForm.unit
        }
      })


      // Create Joints Links
      const { data: ingredientsJoints, error: ingredientsJointsError } = await supabase
        .from('_RecipeIngredients')
        .insert(jointsToInsert)
        .select()

      if (ingredientsJointsError) throw new Error('Creation of Ingredients joints Ids Failed');


      console.log(`〰 ${ingredientsJoints.length} ingrédients liés.`);

    }

    //Check Full Success
    console.log(`✅ Requête POST pour la recette ${insertedRecipe.id} terminée.`);

    return NextResponse.json(insertedRecipe ? insertedRecipe : { message: 'Recette créée' }, { status: 201 });

  } catch (insertedRecipeError) {
    console.error('Erreur inattendue dans la route POST:', insertedRecipeError);
    return NextResponse.json(
      {
        message: 'Erreur de connexion ou de requête Supabase:',
        error: insertedRecipeError
      },
      { status: 500 }
    );
  }


}
