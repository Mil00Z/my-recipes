import Image from 'next/image';
import Link from 'next/link';

import useAuth from '@/hooks/useAuth';


import Hero from '@/components/Hero/Hero';


//Styles
import './Header.scss';

type HeaderProps = {
  layout?: 'home' | 'create' | 'update' | undefined;
  user: boolean | undefined;
}

const Header = ({ layout }: HeaderProps) => {

  const { user, loading } = useAuth();

  console.table(user);


  return (
    <header className="main-header">

      <div className="top-header">
        <Link href="/" aria-label={"lien vers la Homepage"} tabIndex={0}>
          <Image src="/logo.svg" alt="logo de My-Recipes" width={180} height={38} priority title="V2" />
        </Link>
      </div>


      {layout === "home" && <Hero />}

      {layout === "create" && <Hero title="Ajouter une recette" />}

      {layout === "update" && <Hero title="Modifier une recette" />}

    </header>
  )
}

export default Header