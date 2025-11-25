import Link from 'next/link';

//UI
import './FeedbackBlock.scss';

interface FeedbackBlockProps {
  type:'success' | 'error';
  message:string;
  content?:string;
  actionLink?:string; 
  actionLabel?:string;
  btnClass?:string;
}

const FeedbackBlock = ({type,message,content,actionLink= "/",actionLabel="Retour à l'accueil",btnClass=""} : FeedbackBlockProps) => {


return  (
<>
  <div className={`${type}-message`}>

    <h2>{type === "success" ? ('✅') : ('❌')} {message}</h2>
    {content && <p>{content}</p>}
    <Link href={actionLink} className={`link btn ${btnClass || 'btn-cta'}`}>
    <span className="btn-icon">←</span>{actionLabel}</Link>
  </div>
</>
  
)
}
export default FeedbackBlock;