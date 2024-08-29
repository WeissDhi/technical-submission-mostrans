import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Menghubungkan ke CSS untuk styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/locations">Location</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
