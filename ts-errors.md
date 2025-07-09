# 🐞 TypeScript Error Tracking - Pre-Build Checklist

Ce fichier recense les erreurs TypeScript à corriger avant le build final du projet.
Chaque tableau regroupe les erreurs par fichier, avec un résumé et le chemin concerné.

---

 ## src/app/recipe/[id]/page.tsx ✔

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 52 | ~~TS2322: Type 'string \| undefined' is not assignable to type 'string \| StaticImport'. Type 'undefined' is not assignable to type 'string \| StaticImport'.~~ | S'assurer que `recipe.image` est toujours une chaîne de caractères définie ou gérer le cas `undefined`. Peut-être utiliser une image par défaut ou une vérification conditionnelle. |

---

## src/components/Counter/Counter.tsx ✔


| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 22 |~~TS18047: `counterElement.current` is possibly 'null'.~~ | Vérifier si `counterElement.current` n'est pas `null` avant d'y accéder (ex: `if (counterElement.current) { ... }`). |

---

## src/components/Filters/Filter.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 64 | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string' (ustensils) | S'assurer que `tag.value` est de type `string` avant de l'utiliser dans `includes()`. Peut-être convertir `tag.value` en `string` ou ajuster le type de `ustensils`. |
| 70 | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string' (time) | S'assurer que `tag.value` est de type `string` avant de le passer à `parseInt()`. |
| 141 | TS2339: Property 'map' does not exist on type 'object' (singleUstensilArray) | Typage correct du tableau `singleUstensilArray`. Il est probablement de type `any[]` ou `object`, mais devrait être `string[]` ou un tableau d'un type spécifique. |
| 165 | TS2339: Property 'map' does not exist on type 'object' (singleIngredientArray) | Typage correct du tableau `singleIngredientArray`. Il est probablement de type `any[]` ou `object`, mais devrait être `Ingredient[]` ou un tableau d'un type spécifique. |
| 166 | TS2551: Property 'ingredient' does not exist on type 'Recipe'. Did you mean 'ingredients'? | Dans la fonction de `map`, l'élément est de type `Recipe` mais vous essayez d'accéder à `element.ingredient`. Il faut accéder à `element.ingredients` (qui est un tableau) puis itérer dedans. |

---

## src/components/PageWrapper/PageWrapper.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 17 | TS2322: Type 'string' is not assignable to type '"home"' (Header layout prop) | La prop `layout` du composant `Header` attend un type littéral `"home"`, mais reçoit une `string` générique. Assurez-vous que le type de `layout` dans `HeaderProps` est `string` ou que la valeur passée est `'home'`. |

---

## src/components/RecipeCard/RecipeCard.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 7 | TS2339: Property 'recipe' does not exist on type 'Recipe' (props destructuring) | La signature de votre composant `RecipeCard` est `({recipe}:Recipe) => { ... }`. Si `RecipeCard` reçoit directement un objet `Recipe` comme prop, la signature devrait être `(recipe: Recipe) => { ... }` ou si elle reçoit une prop nommée `recipe` de type `Recipe`, cela devrait être `({ recipe }: { recipe: Recipe }) => { ... }`. |
| 23 | TS7006: Parameter 'element' implicitly has an 'any' type | Typage explicite de `element` dans le `map` des ingrédients. Il doit être de type `Ingredient`. |
| 37 | TS7006: Parameter 'ustensil' implicitly has an 'any' type | Typage explicite de `ustensil` dans le `map` des ustensiles. Il doit être de type `string`. |

---

## src/components/RecipesList/RecipesList.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 18 | TS2322: Type '{ key: string; recipe: Recipe; }' is not assignable to type 'IntrinsicAttributes & Recipe'. Property 'recipe' does not exist on type 'IntrinsicAttributes & Recipe'. | La prop `RecipeCard` ne s'attend pas à une prop `recipe` directe. Vérifier la signature des props de `RecipeCard` (voir erreur précédente pour `RecipeCard.tsx:7`). Si `RecipeCard` s'attend à la `Recipe` elle-même comme props, la ligne devrait être `<RecipeCard key={recipe.id} {...recipe} />` et la signature du composant `(recipe: Recipe) => { ... }`. |

---

## src/components/SearchForm/SearchForm.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 26 | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'. | `tag.value` est de type `string | number`, mais `toLowerCase()` n'existe que sur `string`. Il faut s'assurer que `tag.value` est une chaîne avant d'appeler `toLowerCase()`. |
| 31 | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'. | Même problème que ligne 26. |
| 33 | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'. | Même problème que ligne 26. |
| 35 | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string'. | `tag.value` est de type `string | number`, mais `parseInt()` attend une `string`. Il faut s'assurer que `tag.value` est une chaîne avant de la passer à `parseInt()`. |

---

## src/components/Tag/Tag.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 81 | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'. | `tag.value` est de type `string | number`, mais `toLowerCase()` n'existe que sur `string`. Il faut s'assurer que `tag.value` est une chaîne avant d'appeler `toLowerCase()`. |
| 86 | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'. | Même problème que ligne 81. |
| 88 | TS2339: Property 'toLowerCase' does not exist on type 'string \| number'. | Même problème que ligne 81. |
| 90 | TS2345: Argument of type 'string \| number' is not assignable to parameter of type 'string'. | `tag.value` est de type `string | number`, mais `parseInt()` attend une `string`. Il faut s'assurer que `tag.value` est une chaîne avant de la passer à `parseInt()`. |

---

## src/hooks/dataStore.tsx

| Ligne | Erreur / Résumé | Correction à prévoir |
|-------|-----------------|----------------------|
| 26 | TS2345: Argument of type 'StateCreator<Store, [], [["zustand/persist", Store]]>' is not assignable to parameter of type 'StateCreator<Store, [], []>'. | Cela indique un problème avec la configuration de `zustand/persist`. Souvent, cela signifie que le type de `Store` n'est pas correctement passé à `persist` ou que les génériques de `create` et `persist` ne sont pas alignés. Vérifier la documentation de Zustand Persist pour l'intégration de TypeScript. |
| 27 | TS2322: Type '{ id: string; image: string; title: string; servings: number; ingredients: ({ ingredient: string; quantity: number; unit: string; } | { ingredient: string; quantity: number; unit?: undefined; } | { ...; })[]; time: number; description: string; appliance: string; ustensils: string[]; } | { ...; } | { ...; } | { ...;...' is not assignable to type 'Recipe[]'. ... Types of property 'unit' are incompatible. Type 'string' is not assignable to type 'number'. | Il y a une incompatibilité de type majeure entre la structure de `initialRecipes` (telle que déduite par TypeScript à partir de votre JSON ou de son importation) et le type `Recipe[]` que vous avez défini. L'erreur `Type 'string' is not assignable to type 'number'` pour `unit` est clé : votre interface `Ingredient` semble avoir `unit?: number | undefined;` alors que le JSON contient des chaînes de caractères pour `unit` (ex: "grammes"). **Corrigez le type de `unit` dans `Ingredient` pour être `string | undefined` (ou `string` si toujours présent).** |
| 34 | TS2339: Property 'initialRecipes' does not exist on type 'Store'. | L'état de votre store Zustand (`Store`) ne semble pas contenir la propriété `initialRecipes`. Vérifier la définition de votre interface `Store` pour inclure `initialRecipes` si vous souhaitez y accéder directement via l'état du store. |

---

## Résumé des priorités (mis à jour)

- [ ] Revoir la définition de l'interface `Ingredient` (`unit` semble être `string` et non `number`).
- [ ] Corriger tous les problèmes de typage implicite (`any`) et les accès aux propriétés sur des types incorrects (en particulier `toLowerCase` sur `string | number`).
- [ ] Vérifier et corriger les signatures de props des composants (`RecipeCard`, `RecipesList`, `Header`).
- [ ] Gérer les cas où les références (`useRef`) ou les données (ex: `recipe.image`) peuvent être `null` ou `undefined`.
- [ ] S'assurer que tous les imports de types sont corrects et que les tableaux sont correctement typés pour utiliser `.map()`.
- [ ] Vérifier la configuration Zustand/persist et les génériques pour résoudre l'erreur `TS2345` sur `StateCreator`.
- [ ] Assurer la cohérence entre la structure de vos données initiales (`initialRecipes`) et vos interfaces de type (`Recipe`, `Ingredient`).

---
**Total des erreurs restantes : 21**
