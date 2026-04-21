
import { useStore } from "@/hooks/dataStore";
import { useSyncDataTabs } from "@/hooks/syncDataTabs";

//Styles
import "./Debeug.scss"

const StoreDebbuger = () => {

  const { matchingRecipes, tags, newRecipes } = useStore();

  //Live Reload Store Update
  useSyncDataTabs('recipes-stored');


  return (
    <div className="store-debbuger">

      <h3>Store - Added New Recipes: <span>{newRecipes.length}</span></ h3>
      <pre>
        {JSON.stringify({ newRecipes }, null, 1)}
      </pre>

      <h3>Store - Activ tags: <span>{tags.length}</span></h3>
      <pre>
        {JSON.stringify({ tags }, null, 1)}
      </pre>

      <h3>Store - Active Recipes: <span>{matchingRecipes.length}</span></h3>
      <pre>
        {JSON.stringify({ matchingRecipes }, null, 1)}
      </pre>

      <span className="title">Debeug Store</span>
    </div>
  )
};
export default StoreDebbuger;