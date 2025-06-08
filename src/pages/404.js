import { useNavigate } from "react-router-dom";
import './pagestyles/404.css'
function NotFound() {

    const navigate = useNavigate();

    return(
        <div className="nf">
            <h1>Page Not Found</h1>
            <h3>coming soon...</h3>
            <button onClick={() => {navigate('/')}}>Go Back Home</button>
        </div>
    )
}

export default NotFound;