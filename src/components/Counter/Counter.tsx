import {useEffect,useRef} from "react";

//Styles
import "./Counter.scss";


interface CounterProps {
  value: number;
}

const Counter = ({value} : CounterProps) => {

  const counterElement = useRef(null);

  useEffect(() => {
        // Force animation reset
        if (counterElement.current) {
            counterElement.current.classList.remove('updated');

           // Petit délai pour laisser le browser "oublier" l'état précédent
            setTimeout(() => {
                counterElement.current.classList.add('updated');
            }, 0);
        }
    }, [value]);



  return (
    <div className="recipes-counter" aria-label="nombre de recettes disponibles">
      <span className={`count`} ref={counterElement}>{value}</span> recette(s)
    </div>
  )
}
export default Counter;