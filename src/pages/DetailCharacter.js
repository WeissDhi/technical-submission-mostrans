import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import './public CSS/DetailCharacter.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const GET_CHARACTER_DETAIL = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
        episode
      }
    }
  }
`;

function DetailCharacter() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id },
  });
  
  const [locationName, setLocationName] = useState('');
  const [assignedLocation, setAssignedLocation] = useState(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem(`character_${id}_location`);
    if (storedLocation) {
      setAssignedLocation(JSON.parse(storedLocation));
    }
  }, [id]);

  const handleAssignLocation = () => {
    if (!locationName) return;

    const locations = JSON.parse(localStorage.getItem('locations')) || {};
    if (!locations[locationName]) {
      locations[locationName] = [];
    }
    locations[locationName].push(data.character);
    localStorage.setItem('locations', JSON.stringify(locations));
    localStorage.setItem(`character_${id}_location`, JSON.stringify(locationName));
    setAssignedLocation(locationName);
    setLocationName('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="character-container">
      <Navbar />
      <h2>{data.character.name}</h2>
      <div className="character-detail">
        <img src={data.character.image} alt={data.character.name} />
        <p>Status: {data.character.status}</p>
        <p>Species: {data.character.species}</p>
        <p>Gender: {data.character.gender}</p>
        <p>Origin: {data.character.origin.name}</p>
        <p>Location: {data.character.location.name}</p>
      </div>

      <h3>Episodes</h3>
      <ul className="episodes-list">
        {data.character.episode.map((ep) => (
          <li key={ep.episode}>
            {ep.name} ({ep.episode})
          </li>
        ))}
      </ul>

      <div className="assign-location-container">
        <h3>Assign Character to Location</h3>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="Enter location name"
        />
        <button onClick={handleAssignLocation}>Assign</button>
        {assignedLocation && (
          <p>This character is assigned to location: {assignedLocation}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DetailCharacter;
