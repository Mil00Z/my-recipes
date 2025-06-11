import { useStore } from "@/hooks/dataStore";
import { Tag } from "@/types/tag.types";


interface TagProps {
  element: string;
}


const TagElement = ({element} : TagProps) => {

 const {tags,removeTag} = useStore();

  return (
    
    <>
      {tags?.map((tag:Tag) => {
        return(
          <span key={tag.value} className="recipe-tag" data-parent={tag.type}>{tag.value}
            <i className="fa-solid fa-xmark" onClick={() => removeTag(tag.value,tag.type)}></i>
          </span>
        )
      })}
    </>
  
  )
}
export default TagElement