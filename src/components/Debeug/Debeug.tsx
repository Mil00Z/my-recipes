import { useStore } from "@/hooks/dataStore";

const StoreDebbuger = () => {

 const {matchingRecipes,count} = useStore();

return(
   <div className="store-debbuger">
      <h3>Store Debug - Count: <span>{matchingRecipes.length}</span></h3>
  
      <pre>
        {JSON.stringify({ matchingRecipes }, null, 1)}
      </pre>
      
    </div>
)
};
export default StoreDebbuger;