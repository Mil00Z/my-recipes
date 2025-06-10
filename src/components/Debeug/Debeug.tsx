import { useStore } from "@/hooks/dataStore";

const StoreDebbuger = () => {

 const {matchingRecipes} = useStore();
  

return(
   <div className="store-debbuger debeug">
      <h3>Store Debug - Count: <span>{matchingRecipes.length}</span></h3>
      
      <pre>
        {JSON.stringify({ matchingRecipes }, null, 2)}
      </pre>
    </div>
)

};
export default StoreDebbuger;