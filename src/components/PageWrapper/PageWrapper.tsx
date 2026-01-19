
import Header from "@/components/Header/Header";


type PageWrapperProps = {
  children: React.ReactNode;
  layout?: 'home' | 'create' | 'update' | undefined;
};

const PageWrapper = ({children,layout = undefined}:PageWrapperProps) =>{


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