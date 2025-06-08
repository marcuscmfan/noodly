import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../utils/MapsLoader';
import './pagestyles/Explore.css';
import Dropdown from '../components/Dropdown';
import items from '../ramen-restaurants.json';

export default function ExploreDesktop() {
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [selectedParking, setSelectedParking] = useState('All');
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
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

    useEffect(() => {
        const initMap = async () => {
            try {
                const { Map } = await loader.importLibrary('maps');
                const { Marker } = await loader.importLibrary('marker');

                mapInstanceRef.current = new Map(mapRef.current, {
                    center: { lat: 49.2, lng: -123 },
                    zoom: 11,
                    mapId: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    draggable: false,
                    disableDefaultUI: true,
                    clickableIcons: false,
                });

                items.forEach(item => {
                    const latNum = parseFloat(item.lat);
                    const lngNum = parseFloat(item.lng);
                    const marker = new Marker({
                        position: { lat: latNum, lng: lngNum },
                        map: mapInstanceRef.current,
                        title: item.name
                    });

                    // Add click listener to marker
                    marker.addListener('click', () => {
                        if (item.to) {
                            navigate(item.to);
                        }
                    });

                    markersRef.current.push(marker);
                });
            } catch (error) {
                console.error('Error loading Google Maps:', error);
            }
        };

        initMap();
    }, [navigate]);

    useEffect(() => {
        if (!mapInstanceRef.current) return;

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        const filteredItems = items.filter(item => {
            const matchLocation = selectedLocation === 'All' || item.location.includes(selectedLocation);
            const matchParking = selectedParking === 'All' || item.parking.includes(selectedParking);

            return matchLocation && matchParking;
        });

        const updateMarkers = async () => {
            try {
                const { Marker } = await loader.importLibrary('marker');

                filteredItems.forEach(item => {
                    const latNum = parseFloat(item.lat);
                    const lngNum = parseFloat(item.lng);
                    const marker = new Marker({
                        position: { lat: latNum, lng: lngNum },
                        map: mapInstanceRef.current,
                        title: item.name
                    });

                    // Add click listener to marker
                    marker.addListener('click', () => {
                        if (item.to) {
                            navigate(item.to);
                        }
                    });

                    markersRef.current.push(marker);
                });
            } catch (error) {
                console.error('Error updating markers:', error);
            }
        };

        updateMarkers();
    }, [selectedLocation, selectedParking, navigate]);

    return (
        <div className="screen">
            <div className="filter-content">
                <ul className="filter-list">
                    <li>
                        <Dropdown
                            items={locations}
                            selected={selectedLocation}
                            setSelected={setSelectedLocation}
                        />
                    </li>
                    <li>
                        <Dropdown
                            items={parkingAvailability}
                            selected={selectedParking}
                            setSelected={setSelectedParking}
                        />
                    </li>
                </ul>
            </div>
            <div className="map-container">
                <div
                    id="map-display"
                    ref={mapRef}
                    style={{width: '100%', height: '100%'}}
                />
            </div>
        </div>
    );
}