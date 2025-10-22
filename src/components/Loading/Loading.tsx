import { useStore } from '@/hooks/dataStore';

//Styles
import './Loading.scss';

const Loading = () => {

  const {recipes,isLoading} = useStore();

  console.log('start','is loading =>',isLoading);

  return (
    <>
      <h3>Loading datas...</h3>
      <div className="loader"></div>
    </>
  )

}
export default Loading;