// src/components/GoogleRating.js
import React, { useState, useEffect } from 'react';

export default function GoogleRating({ lat, lng, radius = 50 }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    setRating(null);
    fetch(`/api/rating?lat=${lat}&lng=${lng}&radius=${radius}`)
      .then(res => res.json())
      .then(data => {
        if (data.rating != null) setRating(data.rating);
        else setRating('N/A');
      })
      .catch(() => setRating('N/A'));
  }, [lat, lng, radius]);

  return <span>{rating === null ? 'Loading…' : rating}</span>;
}