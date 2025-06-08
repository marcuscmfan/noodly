import MapComponent from "./MapComponent";
import "./ui/Restaurant.css"
import PropTypes from "prop-types";
import data from '../ramen-restaurants.json'
import MenuButton from "./MenuButton";
import GoogleRating from "./GoogleRating";

export default function Restaurant({ id }){

    Restaurant.propTypes = {
        id: PropTypes.string.isRequired
    }

    const restaurant = data.find(r => r.id === id);

    if (!restaurant) {
        return <div>Restaurant not found.</div>;
    }

    const { name, number, hours, rating, price, imageUrl, lat, lng, address, menulink, description} = restaurant;

    function renderPriceLevel(price) {
        if (price[1] === undefined || price[1] === null || price[1] === "N/A" || price[1] === "") {
            return "N/A";
        }
        const n = Number(price[1]);
        if (isNaN(n) || n < 1 || n > 4) return "N/A";
        return "$".repeat(n);
    }

    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];

    return (
        <>
            <div className="header">
                    <div className="resto-info">
                    <h1>{name}</h1>
                    <h3>{number}</h3>
                    <h3>{address}</h3>
                    </div>
                    <div className="operation">
                        <h2>hours of operation:</h2>
                        {Array.isArray(hours) && hours.length === 7 ? (
                          <ul className="hours-list">
                              {hours.map((h, i) => (
                                  <li key={i}>
                                      <strong>{days[i]}: </strong>{h}
                                  </li>
                              ))}
                          </ul>
                        ) : (
                          <div>Hours not available</div>
                        )}
                    </div>


                <div className="img-holder" style={{backgroundImage: `url(${imageUrl})`}}>

                </div>

            </div>

            <div className="columns">
                <div className="words-ratings">
                    <div className="words">
                        <span className="description">{description}</span>
                        <MenuButton link={menulink} />
                    </div>
                    <div className="ratings">
                        <span>Google Rating: {rating[1]} / 5</span>
                        <span>Average Price: {renderPriceLevel(price)}</span>
                    </div>
                </div>

                <div className="map-comp">
                    <MapComponent lat={Number(lat)} lng={Number(lng)} />
                </div>

            </div>
        </>

    );
}