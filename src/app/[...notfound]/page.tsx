"use client";

import Link from 'next/link'

// import '@/styles/pages/NotFound.scss';

const PageNotFound = () => {

  return (

      <section className="not-found-container">
        <h1 className="title">404</h1>
        <p className="description">Oups! La page que vous demandez n'existe pas.</p>
        <Link href="/" className="link btn btn-cta">Retourner sur la page d'accueil</Link>
      </section>  )

  }

export default PageNotFound