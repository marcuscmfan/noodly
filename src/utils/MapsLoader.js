// src/utils/googleMapsLoader.js
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  version: 'weekly',
  libraries: ['marker', 'places'],        // ← include marker here once
  mapId: '922a8dfa9c71fb568a42cdfe',
  id: '__googleMapsScriptId',   // ← keeps the same id
});

export default loader;
