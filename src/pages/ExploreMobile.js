import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './pagestyles/ExploreMobile.css'
import items from '../ramen-restaurants.json'

export default function ExploreMobile() {
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isParkingOpen, setIsParkingOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [selectedParking, setSelectedParking] = useState('All');

    const navigate = useNavigate();

    // Get unique locations from items
    const uniqueLocations = [
        'All',
        ...Array.from(new Set(items.flatMap(item => item.location).filter(loc => loc !== 'All')))
    ];
    const locations = uniqueLocations.map(loc => ({
        label: loc,
        value: loc
    }));

    const parkingAvailability = [
        { label: 'All', value: 'All' },
        { label: 'Free', value: 'Free' },
        { label: 'Paid & Free', value: 'Paid & Free' }
    ];

    const filteredItems = items.filter(item => {
        const matchLocation = selectedLocation === 'All' || item.location.includes(selectedLocation);
        const matchParking = selectedParking === 'All' || item.parking.includes(selectedParking);

        return matchLocation && matchParking;
    });

    return (
        <div id="page-wrap">
            <div className="mobile-filters">
                <button
                    id="filter-drop"
                    onClick={() => setIsMainOpen(o => !o)}
                >
                    Filter…
                </button>

                {isMainOpen && (
                    <ul id="main-drop">
                        <li id="location-drop-button">
                            <button
                                onClick={() => setIsLocationOpen(o => !o)}
                            >
                                {selectedLocation}
                            </button>
                            {isLocationOpen && (
                                <ul id="location-drop">
                                    {locations.map(loc => (
                                        //eslint-disable-next-line
                                        <li
                                            key={loc.value}
                                            id="option"
                                            onClick={() => {
                                                setSelectedLocation(loc.value);
                                                setIsLocationOpen(false);
                                            }}
                                        >
                                            {loc.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <li id="parking-drop-button">
                            <button
                                onClick={() => setIsParkingOpen(o => !o)}
                            >{selectedParking}</button>

                            {isParkingOpen && (
                                <ul>
                                    {parkingAvailability.map(pk => (
                                        //eslint-disable-next-line
                                        <li
                                            key={pk.value}
                                            id="option"
                                            onClick={() => {
                                                setSelectedParking(pk.value);
                                                setIsParkingOpen(false);
                                            }}
                                        >
                                            {pk.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </div>
            <ul className="mobile-rests">
                {filteredItems.map(item => (
                    //eslint-disable-next-line
                    <li id="rest"
                        key={item.id}
                        onClick={() => {
                            if (item.to) {
                                navigate(item.to)
                            }
                        }}
                        style={{backgroundImage: `url(${item.imageUrl})`}}
                    >
                        <div className="rest-info">
                            <h3>{item.name}</h3>
                            <p>{item.location[1]}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}