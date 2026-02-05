import Image from 'next/image';
import Link from 'next/link';

import useAuth from '@/hooks/useAuth';


import Hero from '@/components/Hero/Hero';


//Styles
import './Header.scss';

type HeaderProps = {
  layout?: 'home' | 'create' | 'update' | 'login' | undefined;
}

const Header = ({ layout }: HeaderProps) => {

  const { user, LogOut } = useAuth();


  const handleLogOut = () => {

    LogOut();

  }


  return (
    <header className="main-header">

      <div className="top-header">
        <Link href="/" aria-label={"lien vers la Homepage"} tabIndex={0}>
          <Image src="/logo.svg" alt="logo de My-Recipes" width={180} height={38} priority title="V2" />
        </Link>

        {user ? (<>
          <div className="log-menu">
            <Link href="/create" aria-label={"lien vers la création de recettes"} className="btn go">Ajouter une recette</Link>
            <button type="button" className="btn go" onClick={() => handleLogOut()}>Logout</button>

          </div>
        </>) : (
          <div className="visitor-menu">
            <Link href="/login" className="btn go">Se Connecter</Link>
          </div>)
        }

      </div>

      {layout === "home" && <Hero />}

      {layout === "create" && <Hero title="Ajouter une recette" />}

      {layout === "update" && <Hero title="Modifier une recette" />}

      {layout === "login" && <Hero title="Tester CRUD" />}

    </header>
  )
}

export default Header