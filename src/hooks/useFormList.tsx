import {useState} from 'react';


const useFormList = <T,>(createNewItem : () => T) =>  {


  const [items,setItems] = useState<T[]>([createNewItem()]);


    const addItem = () => {

      setItems((prevItems) =>[...prevItems,createNewItem()]);
    }

    const removeItem = (index:number) => {

      const filteredItems = items.filter((_,i:number) => i !==index);

      setItems(filteredItems);
    }

    const cleanItem = () => {

      setItems([createNewItem()]);

    };

    return [items,addItem,removeItem,cleanItem] as const;

}
export default useFormList
