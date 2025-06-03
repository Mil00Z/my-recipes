'use client';

import {useEffect} from "react";

import Link from "next/link";
import Image from "next/image";


import Hero from "@/components/Hero/Hero";


import { useStore } from "@/hooks/dataStore";

const Home = () => {

const {initialRecipes,count,matchingRecipes,incrementCount} = useStore();

console.log(initialRecipes,count,matchingRecipes);




useEffect(() => {


}, [count]);



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

    <Hero />

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

        <div className="recipes-counter" aria-label="nombre de recettes disponibles"> <span className="count">{count}</span> recette(s)</div>

        <button className="btn btn-cta" onClick={() => incrementCount()}>one up +1</button>

    </section>

    <section className="recipes-container">
    </section>

   </main>

    <footer className="main-footer">
      <div className="copyright">&copy; {new Date().getFullYear()} - My Recipes by <a href="https://github.com/Mil00Z/my-recipes"><span> Mil00Z </span></a></div>
    </footer>

  </>
  )
}
export default Home;