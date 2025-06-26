# 🐞 TypeScript Error Tracking - Pre-Build Checklist

Ce fichier recense les erreurs TypeScript à corriger avant le build final du projet.  
Chaque tableau regroupe les erreurs par fichier, avec un résumé et le chemin concerné.

---

## src/components/Counter/Counter.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 18    | TS2339: `classList` does not exist on type 'never'                              | Typage du ref (useRef<HTMLDivElement>)    |
| 22    | TS18047: `counterElement.current` is possibly 'null'                            | Vérifier nullité avant d'accéder à classList |

---

## src/components/Filters/Filter.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 61    | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string' (ustensils) | S'assurer que tag.value est string        |
| 67    | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string' (time)      | S'assurer que tag.value est string        |
| 139   | TS2339: Property 'map' does not exist on type 'object' (singleUstensilArray)    | Typage correct du tableau                 |
| 163   | TS2339: Property 'map' does not exist on type 'object' (singleIngredientArray)  | Typage correct du tableau                 |
| 164   | TS2551: Property 'ingredient' does not exist on type 'Recipe'                   | Utiliser le bon type pour element         |

---

## src/components/PageWrapper/PageWrapper.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 17    | TS2322: Type 'string' is not assignable to type '"home"' (Header layout prop)   | Vérifier le type de la prop 'layout'      |

---

## src/components/RecipeCard/RecipeCard.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 7     | TS2339: Property 'recipe' does not exist on type 'Recipe' (props destructuring) | Corriger la signature du composant        |
| 23    | TS7006: Parameter 'element' implicitly has an 'any' type                        | Typage explicite de 'element'             |
| 37    | TS7006: Parameter 'ustensil' implicitly has an 'any' type                       | Typage explicite de 'ustensil'            |

---

## src/components/RecipesList/RecipesList.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 18    | TS2322: Property 'recipe' does not exist on type 'IntrinsicAttributes & Recipe' | Corriger la signature de RecipeCard       |

---

## src/components/Tag/Tag.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 19    | TS2304: Cannot find name 'Recipe'                                               | Importer le type Recipe                   |
| 26    | TS7006: Parameter 'ing' implicitly has an 'any' type                            | Typage explicite de 'ing'                 |
| 37    | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string' (time) | S'assurer que tag.value est string        |
| 48    | TS7006: Parameter 'ing' implicitly has an 'any' type                            | Typage explicite de 'ing'                 |
| 70    | TS2304: Cannot find name 'Recipe'                                               | Importer le type Recipe                   |
| 76    | TS7006: Parameter 'ing' implicitly has an 'any' type                            | Typage explicite de 'ing'                 |
| 77    | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'        | S'assurer que la valeur est string        |

---

## src/hooks/dataStore.tsx

| Ligne | Erreur / Résumé                                                                 | Correction à prévoir                      |
|-------|--------------------------------------------------------------------------------|-------------------------------------------|
| 8     | TS2307: Cannot find module '@/datas/recipes' or its corresponding type declarations | Vérifier le chemin d'import               |
| 26    | TS2345: Argument of type 'StateCreator<Store, [], [["zustand/persist", Store]]>' is not assignable to parameter of type 'StateCreator<Store, [], []>' | Vérifier la config de persist             |
| 34    | TS2339: Property 'initialRecipes' does not exist on type 'Store'                | Corriger la référence à initialRecipes     |

---

## Résumé des priorités

- [ ] Corriger tous les problèmes de typage implicite (`any`)
- [ ] Vérifier et corriger les signatures de props des composants
- [ ] S'assurer que tous les imports de types sont corrects
- [ ] Corriger les accès aux propriétés sur des types incorrects ou non typés
- [ ] Vérifier la configuration Zustand/persist et les chemins d'import

---

**À régler avant le build final pour garantir la stabilité TypeScript du projet.**