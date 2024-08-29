import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';  // Mengimpor komponen Navbar
import './public CSS/CharactersList.css';
import Footer from '../components/Footer';

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

function CharactersList() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="characters-container">
      <Navbar /> {/* Menambahkan Navbar di bagian atas */}
      <h2>Rick And Morty Character Lists</h2>
      <p className="description">
        Rick and Morty is an adventure/Sci-Fi animated series that follows the intergalactic, inter-dimensional adventures of super-genius Rick Sanchez and his less-than-average grandson Morty Smith.
      </p>
      <ul className="characters-list">
        {data.characters.results.map((character) => (
          <li key={character.id} className="character-card">
            <Link to={`/character/${character.id}`} >
              <img className="character-image" src={character.image} alt={character.name} />
              <p className="character-name">{character.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default CharactersList;
