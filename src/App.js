import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './ApolloClient';
import CharactersList from './pages/CharactersList';
import DetailCharacter from './pages/DetailCharacter';
import CharacterByLocation from './pages/CharacterByLocation';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/character/:id" element={<DetailCharacter />} />
          <Route path="/locations" element={<CharacterByLocation />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
