
import Header from "@/components/Header/Header";

import StoreDebbuger from "../Debeug/Debeug";

type PageWrapperProps = {
  children: React.ReactNode;
  layout?: string;
};

const PageWrapper = ({children,layout =''}:PageWrapperProps) =>{


  return(
  
  <>
    <Header layout={layout} />

    <main className="wrapper content-first skeleton">

      {children}

    </main>

    <StoreDebbuger />
    
  </>
  )
}
export default PageWrapper