import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaShoppingCart, FaInfoCircle, FaPhone, FaStore, FaTags,
  FaBars, FaTimes, FaMoon, FaSun, FaUser
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Fake count
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const itemDetails = [
    { id: 1, name: 'Shoes', description: 'Stylish & comfortable.' },
    { id: 2, name: 'Watches', description: 'Elegant timepieces.' },
    { id: 3, name: 'Bags', description: 'Trendy and durable.' },
  ];

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="logo">ShopMate</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/shop"><FaStore /> Shop</Link></li>
        <li className="cart-icon">
          <Link to="/cart"><FaShoppingCart /> Cart
            <span className="badge">{cartCount}</span>
          </Link>
        </li>
        <li><Link to="/about"><FaInfoCircle /> About</Link></li>
        <li><Link to="/contact"><FaPhone /> Contact</Link></li>

        <li className="details-section"
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}>
          <button><FaTags /> Item Details</button>
          <div className={`details-dropdown ${showDetails ? 'show' : ''}`}>
            {itemDetails.map(item => (
              <div key={item.id} className="detail-item">
                <strong>{item.name}</strong>: {item.description}
              </div>
            ))}
          </div>
        </li>

        <li className="auth-toggle" onClick={() => setIsLoggedIn(!isLoggedIn)}>
          <FaUser /> {isLoggedIn ? 'Logout' : 'Login'}
        </li>
        <li className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
