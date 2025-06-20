import { useStore } from "@/hooks/dataStore";


const ResetTag = () => {

const {tags,resetTags} = useStore();


  return (
    <div className="reset-tag">
      <button className="btn reset-tag" type="button" onClick={() => {resetTags()}}>Clean Tags <span> ({tags.length}) </span> </button>
    </div>
  )

} 
export default ResetTag;