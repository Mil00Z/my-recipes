
import type { Filter } from "@/types/filter.types";

//Styles
import "./Filter.scss";


const FilterSearch = ({type,title,method}:Filter) => {

  return (
      <>
        <div className="filters debeug">
            <label htmlFor={type} className="labels">
                {title} <i className="fa-solid fa-angle-down"></i>
            </label>
            <input type="search" name={type} id={type} className="search-filter" onChange={(event) => method(event.target.value)}/>
            <ul className="search-results"></ul>
        </div>
    </>
)
};
export default FilterSearch;