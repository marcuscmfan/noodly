import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import loader from "../utils/MapsLoader";

export default function AddressLookup({ lat, lng }) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "no-results" | "error"

  useEffect(() => {
    if (lat == null || lng == null) return;

    setStatus("loading");
    loader
      .load()
      .then((google) => google.maps.importLibrary("geocoding"))
      .then(({ Geocoder }) => {
        const geocoder = new Geocoder();
        geocoder.geocode(
          { location: { lat: parseFloat(lat), lng: parseFloat(lng) } },
          (results, stat) => {
            if (stat === "OK" && results[0]) {
              setAddress(results[0].formatted_address);
              setStatus("ready");
            } else {
              console.warn("Geocode returned no results or error:", stat);
              setStatus("no-results");
            }
          }
        );
      })
      .catch((err) => {
        console.error("Error loading Maps API or Geocoder:", err);
        setStatus("error");
      });
  }, [lat, lng]);

  if (status === "loading") return <h3>Loading address…</h3>;
  if (status === "error")   return <h3>Error loading Maps API</h3>;
  if (status === "no-results") return <h3>No address found</h3>;
  return <h3>{address}</h3>;
}
