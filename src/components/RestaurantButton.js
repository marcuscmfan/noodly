import { useNavigate } from 'react-router-dom';
import './ui/RestaurantButton.css'
import data from '../ramen-restaurants.json'

export default function RestaurantButton({ id }) {

    const { to, imageUrl, name} = data.find(r => r.id === id);

    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
        // navigate to internal route
        navigate(to);
        }
    };


    return(
        <button className='restaurant-button' onClick={handleClick}>
            <div
                className="restaurant-button-bg"
                style={{ backgroundImage: `url(${imageUrl})` }}>
                <h2>{name}</h2>
            </div>
        </button>
    )
}