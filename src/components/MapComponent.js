import React, { useEffect, useRef } from 'react';
import loader from '../utils/MapsLoader';
import PropTypes from 'prop-types';

export default function MapComponent({

  lat = 37.7749,
  lng = -122.4194,

}) {

  MapComponent.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  const mapRef = useRef(null);
  const center = { lat, lng };
  useEffect(() => {
    loader
      .load()
      .then((google) => {
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: {lat, lng},
          zoom: 15,
          mapId: process.env.REACT_APP_MAP_ID,
          mapTypeControl: false,
          fullscreenControl: false,
          draggable: false,
          disableDefaultUI: true,
          clickableIcons: false,
        });

        // Add an advanced marker at the dynamic position
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: center,
        });
      })
      .catch((e) => {
        console.error('Google Maps API failed to load:', e);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  return <div id="map-container" style={{ width: "100%", height: "100%" }} ref={mapRef} />;
}