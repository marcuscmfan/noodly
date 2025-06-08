import React, { useState, useMemo } from 'react';
import './pagestyles/Search.css';
import RestaurantButton from '../components/RestaurantButton';
import items from '../ramen-restaurants.json';
import SearchBar from '../components/SearchBar';

export default function Search() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="search">
      <h2>SEARCH FOR RESTAURANTS</h2>
      <SearchBar value={query} onChange={setQuery} />
      {/* Only show results once the user starts typing */}
      {query.length > 0 && (
        filtered.length > 0 ? (
          <ul className="restaurant-list">
            {filtered.map(item => (
              <li key={item.id} className="restaurant-item">
                <RestaurantButton id={item.id} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )
      )}
    </div>
  );
}
