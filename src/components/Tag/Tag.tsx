import { useStore } from "@/hooks/dataStore";
import { Tag } from "@/types/tag.types";


interface TagProps {
  element: string;
}


const TagElement = ({element} : TagProps) => {

 const {tags,removeTag} = useStore();


  function handleRemoveTag (tag:Tag)  {

    removeTag(tag)

 }


  return (
    <>
      {tags?.map((tag:Tag,index:number) => {
        return(
          <span key={`${tag.type}-${index}`} className="recipe-tag" data-parent={tag.type}>{tag.value}
            <i className="fa-solid fa-xmark" onClick={() => handleRemoveTag(tag)}></i>
          </span>
        )
      })}
    </>
  )
}
export default TagElement