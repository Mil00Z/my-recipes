# Les Petits Plats 2.0 - Next.js Refactor

## 🎯 Mon challenge
Refonte architecturale complète d'un projet legacy (initialement en **JavaScript procédural**) vers une application Web plus moderne, typée et évolutive.
L'objectif n'est pas seulement de reproduire l'interface, mais de construire une véritable architecture **Fullstack** (API, BDD...).

🔗 **Projet original (Legacy) :** [https://github.com/Mil00Z/les-petits-plats](https://github.com/Mil00Z/les-petits-plats)

## � Historique & Versions

Ce projet a évolué à travers plusieures phases distinctes :

| Version | Stack Technique | Accès |
| :--- | :--- | :--- |
| **V0 (Originale)** | JavaScript Vanilla (Algorithmes natifs) | [Repo original](https://github.com/Mil00Z/les-petits-plats) |
| **V1 (Refacto)** | Next.js + Zustand + TS (Données JSON locales) | [Branche `main`](https://my-recipes-v1.vercel.app) |
| **V2 (Fullstack)** | Next.js 15 + API Routes + Supabase | [Branche `develop`](https://my-recipes-fs.vercel.app) |

## �🛠 Stack choisie
Ce projet a servi de support pour approfondir la maîtrise de l'écosystème Next.js :

* **Framework :** Next.js (App Router, Server Components)
* **Langage :** TypeScript (Typage strict des Props et API)
* **State Management :** Zustand (Gestion globale et asynchrone)
* **Database :** Supabase (PostgreSQL) + API Routes Next.js
* **Styles :** SCSS (Architecture modulaire)

## 🚧 Contexte de Réalisation & Défis
Ce projet est développé en parallèle d'une recherche d'emploi active et d'une activité musicale bien remplie, servant de **laboratoire d'apprentissage intensif**.

Le cycle de développement a intégré plusieurs challenges techniques majeurs :

1. **Refactorisation de code :** Transformer un projet de formation (single page, code procédural), en une petite application personnelle, en appliquant de nouveaux paradigmes (Composants, Hooks, Store, États locaux).
2. **Montée en compétence Fullstack :** Première implémentation complète d'une API, conception de base de données relationnelle et normalisation des données API vs UI.
3. **Contraintes d'Environnement :** Développement réalisé initialement sous contraintes matérielles fortes (instabilité WSL/Node, matériel informatique obsolète), imposant une rigueur accrue sur l'optimisation des builds et du workflow.
4. **Approche "From Scratch" :** Volonté de ne pas utiliser de solutions "magiques" (comme les hooks tout faits de Supabase au début) pour comprendre la mécanique interne du fetching et du state management.

## ✨ Fonctionnalités Clés
*  **Moteur de Recherche :** Algorithme de filtrage croisé (Texte + Tags multiples).
*  **Performance :** Optimisation des rendus via React Server Components et gestion fine du client-side state.
*  **CRUD Complet :** Création, Lecture, Mise à jour et Suppression de recettes connectées à la BDD.
*  **Normalisation :** Pattern de transformation des données Back-end (Jointures SQL) vers Front-end (UI simplifiée).
*  **Interface d'Administration (Back-office) :** Feature "Porte", actuellement simplifiée pour la gestion CRUD des recettes.

## 🚀 État du projet
* **Statut :** 🟢 **Simple V2 online**

