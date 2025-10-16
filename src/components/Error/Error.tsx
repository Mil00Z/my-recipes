
interface ErrorProps {
  dataType: string;

}
const Error = ({dataType}:ErrorProps) => {

return (

  <>
    <h1>Oops !</h1>
    <p>Une erreur est survenue lors du chargement des données de type <span style={{fontWeight:"bold",color:"var(--primary-color)"
    }}>{dataType}</span>.</p>
  </>
  
)
}
export default Error;