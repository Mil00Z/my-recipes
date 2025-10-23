import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero/Hero';


//Styles
import './Header.scss';

type HeaderProps = {
  layout?: 'home' | undefined;
}

const Header = ({layout}:HeaderProps) => {

return (
  <header className="main-header">

    <div className="top-header">
        <Link href="/" aria-label={"lien vers la Homepage"} tabIndex={0}>
          <Image src="/logo.svg" alt="logo de My-Recipes" width={180} height={38} priority title="V2" />
        </Link>
        <Link href="/create" aria-label={"lien vers le create de recettes"} className="link">
            Ajouter recette
        </Link>
    </div> 

    {layout === "home" && <Hero />}
    
   </header>
  )
}

export default Header