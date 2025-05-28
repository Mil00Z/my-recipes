'use client';

import {useState} from "react";

import Link from "next/link";
import Image from "next/image";

const Home = () => {

const [countRecipes, setCountRecipes] = useState<number>(10);

return(
<>
  <header className="main-header">

    <div className="top-header">
        <Link href="/" aria-label={"lien vers la Homepage"} tabIndex={0}>
          <Image src="/logo.svg" alt="logo de My-Recipes" width={180} height={38} priority title="V2" />
        </Link>
        <Link href="/starter" aria-label={"lien vers le starter"} className="link">
            Starter
        </Link>
    </div> 

    <div className="hero">
        <h1 className="hero-title">cherchez parmi plus de <span className="initial-count">{countRecipes}</span> recettes<br/>
            du quotidien,simples et délicieuses
        </h1>

        <form action="/" className="the-form">
            <label htmlFor="main-search" className="v-hidden">Recherche</label>
            <input type="search" name="main-search" id="main-search" placeholder="Rechercher une recette, un ingrédient..."/>
            <button type="submit" className="btn btn-search" aria-label="bouton de recherche"><i className="fa-solid fa-search"></i></button>
        </form>
    </div>

   </header>

   <main className="wrapper">

    <section className="recipes-filter">

        <form action="/" className="form-select">

            <div className="filters-group">

                <div className="filters">
                    <label htmlFor="ingredients" className="labels">Ingrédients <i className="fa-solid fa-angle-down"></i></label>
                    <input type="search" name="ingredients" id="ingredients" className="search-filter"/>

                    <ul className="search-results">
                    </ul>
                </div>

                <div className="filters">
                    <label htmlFor="appliances" className="labels">Appareils<i className="fa-solid fa-angle-down"></i></label>
                    <input type="search" name="appliances" id="appliances" className="search-filter"/>

                    <ul className="search-results">
                    </ul>
                </div>

                <div className="filters">
                    <label htmlFor="ustensils" className="labels">Ustensiles<i className="fa-solid fa-angle-down"></i></label>
                    <input type="search" name="ustensils" id="ustensils" className="search-filter"/>

                    <ul className="search-results">
                    </ul>
                </div>

                <div className="filters">
                    <label htmlFor="timing" className="labels">Minutages<i className="fa-solid fa-angle-down"></i></label>
                    <input type="search" name="timing" id="timing" className="search-filter"/>

                    <ul className="search-results">
                    </ul>
                </div>

            </div>
            
            <div className="recipe-taglist">

            </div>

        </form>

        <div className="recipes-counter" aria-label="nombre de recettes disponibles"> <span className="count">{countRecipes}</span> recette(s)</div>

    </section>

    <section className="recipes-container">
    </section>

   </main>
<div className="debeug"></div>

    <footer className="main-footer">
      <div className="copyright">&copy; 2024 - Les Petits Plats by <a href="https://github.com/Mil00Z"><span> Mil00Z </span></a></div>
    </footer>
  </>
  )
}
export default Home;