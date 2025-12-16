import {useState} from 'react';


const useFormList = <T,>(createNewItem : () => T) =>  {


  const [items,setItems] = useState<T[]>([createNewItem()]);


    const addItem = () => {

      setItems((prevItems:T[]) =>[...prevItems,createNewItem()]);
      console.log('add item :',items.length);
    }

    const removeItem = (index:number) => {

      const filteredItems = items.filter((_,i:number) => i !==index);

      setItems(filteredItems);
      console.log('removed item at index:',index);
    }

    const cleanItem = () => {

      setItems([createNewItem()]);

    };

    return [items,addItem,removeItem,cleanItem,setItems] as const;

}
export default useFormList
