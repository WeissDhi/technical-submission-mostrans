import React, { useState, useEffect } from 'react';
import './public CSS/CharacterByLocation.css';
import Navbar from '../components/NavBar';  // Mengimpor komponen Navbar
import Footer from '../components/Footer';

function CharacterByLocation() {
  const [locations, setLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || {};
    setLocations(storedLocations);
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="characters-container">
      <Navbar /> {/* Menambahkan Navbar di bagian atas */}
      <h2>Characters by Location</h2>
      <ul className="location-list">
        {Object.keys(locations).map((location) => (
          <li key={location} onClick={() => handleLocationClick(location)}>
            {location}
          </li>
        ))}
      </ul>

      {selectedLocation && (
        <div className="characters-by-location">
          <h3>Characters in {selectedLocation}</h3>
          <ul className="characters-list">
            {locations[selectedLocation].map((character) => (
              <li key={character.id} className="character-card">
                <img className="character-image" src={character.image} alt={character.name} />
                <p className="character-name">{character.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
            <Footer/>
    </div>
  );
}

export default CharacterByLocation;
