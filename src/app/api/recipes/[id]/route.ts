import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {

  //attention await 
  const { id } = await params;

  try {
    // Récupérer toutes les recettes depuis la table 'recipes'
    const { data: RawRecipe, error } = await supabase.from('Recipes').select('*,_RecipeIngredients(quantity,unit,Ingredients(id,ingredient,updatedAt)),Ustensils(id,name,updatedAt),Appliances(id,name,updatedAt)').eq('id', id).single();


    // Si de soucis de donnéés
    if (!RawRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
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

    return NextResponse.json(RawRecipe, { status: 200 });

  } catch (err) {

    console.error('Erreur inattendue dans la route API:', err);

    return NextResponse.json(
      { error: 'Une erreur serveur est survenue...' },
      { status: 500 }
    );
  }
}


export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {

  const { id: currentRecipeId } = await params;

  if (!currentRecipeId) {
    console.error('Error On ID recipe');
    return NextResponse.json(
      { error: "Erreure sur l'id de la recette" },
      { status: 500 }
    );
  }

  try {
    // liens Appliances
    const { error: errorAppliances, count: countAppliances } = await supabase
      .from('_RecipeAppliances')
      .delete({ count: "exact" })
      .eq('A', currentRecipeId);

    if (errorAppliances) {
      throw new Error(`Delete Jointed Appliances Failed: ${errorAppliances.message}`);
    }

    if (countAppliances === 0) {
      console.warn(`Aucun lien d'appliance trouvé pour la recette ${currentRecipeId}`);
    }
    console.log(`...Liens Appliances pour ${currentRecipeId} supprimés.`);


    // liens Ustensils 
    const { error: errorUstensils, count: countUstensils } = await supabase
      .from('_RecipeUstensils')
      .delete({ count: "exact" })
      .eq('A', currentRecipeId);

    if (errorUstensils) {
      throw new Error(`Delete Jointed Ustensils Failed: ${errorUstensils.message}`);
    }

    if (countUstensils === 0) {
      console.warn(`Aucun lien d'ustensile trouvé pour la recette ${currentRecipeId}`);
    }
    console.log(`...Liens Ustensils pour ${currentRecipeId} supprimés.`);


    //liens Ingredients
    const { error: errorIngredients, count: countIngredients } = await supabase
      .from('_RecipeIngredients')
      .delete({ count: "exact" })
      .eq('A', currentRecipeId);

    if (errorIngredients) {
      throw new Error(`Delete Jointed Ingredients Failed: ${errorIngredients.message}`);
    }

    if (countIngredients === 0) {
      console.warn(`Aucun lien d'ingrédient trouvé pour la recette ${currentRecipeId}`);
    }
    console.log(`...Liens Ingrédients pour ${currentRecipeId} supprimés.`);


    // Recipe
    const { error: errorRecipe, count: countRecipe } = await supabase
      .from('Recipes')
      .delete({ count: 'exact' })
      .eq('id', currentRecipeId);

    if (errorRecipe) {
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
      { message: `Recette ${currentRecipeId} supprimée` },
      { status: 200 }
    );

  } catch (err) {
    console.error('Erreur inattendue dans la route API:', err);

    return NextResponse.json(
      { error: 'Une erreur serveur est survenue...' },
      { status: 500 }
    );
  }
}



export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {

  const { id: currentRecipeId } = await params;

  try {

    const newRecipeDatas = await request.json();
    const { ingredients, appliances, ustensils, ...recipeDataOnly } = newRecipeDatas;
    console.log("👉 Payload reçu:", newRecipeDatas);

    const { error: updatedRecipeError } = await supabase
      .from('Recipes')
      .update(recipeDataOnly)
      .eq('id', currentRecipeId)
      .select()
      .single();


    if (updatedRecipeError) {
      throw new Error(`Update Recipe Failed: ${updatedRecipeError.message}`);
    }

    console.log(`✅ Recette ${currentRecipeId} partiellement modifiée avec succès.`);

    //Ingredients
    if (ingredients && ingredients.length > 0) {

      // Clear Existing Joints
      const { error: deleteIngredientsError } = await supabase
        .from('_RecipeIngredients')
        .delete()
        .eq('A', currentRecipeId)

      if (deleteIngredientsError) {
        throw new Error(`Update Joints Ingredients Failed`);
      }

      // Looping to Update Datas
      for (const ing of ingredients) {

        // Get Id and Name FROM Payload
        let ingredientId = ing.id;
        const ingredientName = ing.ingredient.trim().toLowerCase();
        const ingredientUnit = ing.unit;
        const ingredientQuantity = ing.quantity;

        // #1 Checking Name
        const { data: existingIngredientData, error: fetchIngredientError } = await supabase
          .from('Ingredients')
          .select('id')
          .eq('ingredient', ingredientName)
          .maybeSingle();


        if (existingIngredientData) {

          console.log('Ingrédient existant trouvé:', ingredientName);

          ingredientId = existingIngredientData.id;

        }


        //Error
        if (fetchIngredientError) {
          throw new Error(`Fetch Ingredient Failed: ${fetchIngredientError.message}`);
        }


        // #2 Checking ID exist or Create
        if (!ingredientId || ingredientId === "") {

          ingredientId = uuid();

          const { error: insertIngredientError } = await supabase
            .from('Ingredients')
            .insert({
              id: ingredientId,
              ingredient: ingredientName
            })
            .select()
            .single();

          if (insertIngredientError) {
            throw new Error(`Insert Ingredient Failed: ${insertIngredientError.message}`);
          }

        }

        // Finally Insert Link
        const { error: updateIngredientError } = await supabase
          .from('_RecipeIngredients')
          .insert({
            A: currentRecipeId,
            B: ingredientId,
            quantity: ingredientQuantity,
            unit: ingredientUnit
          })

        if (updateIngredientError) {
          throw new Error(`Update Ingredients Datas failed: ${updateIngredientError.message}`);
        }

      }

    }

    //Appliances
    if (appliances && appliances.length > 0) {

      // Clear Existing Joints
      const { error: deleteAppliancesError } = await supabase
        .from('_RecipeAppliances')
        .delete()
        .eq('A', currentRecipeId)

      if (deleteAppliancesError) {
        throw new Error(`Update Joints Appliances Failed`);
      }

      for (const app of appliances) {

        // Get Id and Name FROM Payload
        let applianceId = app.id;
        const applianceName = (app.name || "").trim().toLowerCase();

        // #1 Checking Name
        const { data: existingApplianceData, error: fetchApplianceError } = await supabase
          .from('Appliances')
          .select('id')
          .eq('name', applianceName)
          .limit(1)
          .maybeSingle();


        if (existingApplianceData) {

          console.log('Appareil existant trouvé:', applianceName);

          applianceId = existingApplianceData.id;

        }

        if (!existingApplianceData) {
          console.log('Appliance not found, will be created:', applianceName);
        }

        //Error
        if (fetchApplianceError) {
          throw new Error(`Fetch Ustensil Failed: ${fetchApplianceError.message}`);
        }



        // #2 Checking ID exist or Create
        if (!applianceId || applianceId === "") {

          applianceId = uuid();

          const { data: newApplianceData, error: insertApplianceError } = await supabase
            .from('Appliances')
            .insert({
              id: applianceId,
              name: applianceName
            })
            .select()
            .single();

          console.log('Nouvel Appareil crée :', newApplianceData);


          if (insertApplianceError) {
            throw new Error(`Insert Ingredient Failed: ${insertApplianceError.message}`);
          }

        }


        // Finally Insert Link
        const { error: updateApplianceError } = await supabase
          .from('_RecipeAppliances')
          .insert({
            A: currentRecipeId,
            B: applianceId
          })

        if (updateApplianceError) {
          throw new Error(`Update Appliance Datas failed: ${updateApplianceError.message}`);
        }
      }

    }

    //Ustensils
    if (ustensils && ustensils.length > 0) {

      // Clear Existing Joints
      const { error: deleteUstensilsError } = await supabase
        .from('_RecipeUstensils')
        .delete()
        .eq('A', currentRecipeId)

      if (deleteUstensilsError) {
        throw new Error(`Update Joints Ustensils Failed`);
      }

      for (const ust of ustensils) {

        // Get Id and Name FROM Payload
        let ustensilId = ust.id;
        const ustensilName = ust.name.trim().toLowerCase();

        // #1 Checking Name
        const { data: existingUstensilData, error: fetchUstensilError } = await supabase
          .from('Ustensils')
          .select('id')
          .eq('name', ustensilName)
          .limit(1)
          .maybeSingle();


        if (existingUstensilData) {

          console.log('Ustensil existant trouvé:', ustensilName);

          ustensilId = existingUstensilData.id;

        }

        //Error
        if (fetchUstensilError) {
          throw new Error(`Fetch Ustensil Failed: ${fetchUstensilError.message}`);
        }


        // #2 Checking ID exist or Create
        if (!ustensilId || ustensilId === "") {

          ustensilId = uuid();

          const { data: newUstensilData, error: insertUstensilError } = await supabase
            .from('Ustensils')
            .insert({
              id: ustensilId,
              name: ustensilName
            })
            .select()
            .single();

          console.log('Nouvel Ustensil crée :', newUstensilData);


          if (insertUstensilError) {
            throw new Error(`Insert Ingredient Failed: ${insertUstensilError.message}`);
          }

        }


        // Finally Insert Link
        const { error: updateUstensilError } = await supabase
          .from('_RecipeUstensils')
          .insert({
            A: currentRecipeId,
            B: ustensilId
          })

        if (updateUstensilError) {
          throw new Error(`Update Ingredients Datas failed: ${updateUstensilError.message}`);
        }

      }

    }


    // Finaly 
    return NextResponse.json(
      { message: `Recette ${currentRecipeId} modifiée !` },
      { status: 200 }
    );

  } catch (err) {
    console.error('Erreur inattendue dans la route API:', err);

    return NextResponse.json(
      { error: 'Une erreur serveur est survenue...' },
      { status: 500 }
    );
  }

}

