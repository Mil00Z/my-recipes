import { useStore } from "@/hooks/dataStore";

const StoreDebbuger = () => {

 const {matchingRecipes,tags} = useStore();

return(
   <div className="store-debbuger">

       <h3>Store Debug - tags: <span>{tags.length}</span></h3>
      <pre>
        {JSON.stringify({ tags }, null, 1)}
      </pre>


      <h3>Store Debug - Count: <span>{matchingRecipes.length}</span></h3>
  
      <pre>
        {JSON.stringify({ matchingRecipes }, null, 1)}
      </pre>


     
      
    </div>
)
};
export default StoreDebbuger;