
import Header from "@/components/Header/Header";

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
    
  </>
  )
}
export default PageWrapper