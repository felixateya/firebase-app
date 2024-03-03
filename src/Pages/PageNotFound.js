import {useNavigate} from 'react-router-dom'

export default function PageNotFound() {

  const navigate = useNavigate()
    return (
      <div className="page-not-found">
        <h1>Error 404 !!! Page not found</h1>
        <button className="not-found" onClick={()=>navigate(-1)}>Back</button>
      </div>
    );
  }