import Image from 'next/image';
import Link from 'next/link';

import useAuth from '@/hooks/useAuth';


import Hero from '@/components/Hero/Hero';


//Styles
import './Header.scss';

type HeaderProps = {
  layout?: 'home' | 'create' | 'update' | undefined;
}

const Header = ({ layout }: HeaderProps) => {

  const { user, loading, LogOut } = useAuth();

  // console.table(user);

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {

    LogOut();

  }


  return (
    <header className="main-header">

      <div className="top-header">
        <Link href="/" aria-label={"lien vers la Homepage"} tabIndex={0}>
          <Image src="/logo.svg" alt="logo de My-Recipes" width={180} height={38} priority title="V2" />
        </Link>

        {user && (<>
          <Link href="/create" aria-label={"lien vers la création de recettes"}>Ajouter une recette</Link>
          <button type="button" onClick={(e) => handleLogOut(e)}>Logout</button>

        </>)
        }

      </div>

      {layout === "home" && <Hero />}

      {layout === "create" && <Hero title="Ajouter une recette" />}

      {layout === "update" && <Hero title="Modifier une recette" />}

    </header>
  )
}

export default Header