import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg';
export default function PageNotFound() {

  const navigate = useNavigate()
    return (
      <div className="page-not-found">
        <img src={logo} alt=""/>
        <h1>Error 404 !!! Page not found</h1>
        <button className="not-found" onClick={()=>navigate(-1)}>Go Back</button>
      </div>
    );
  }