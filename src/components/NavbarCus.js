import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarCus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { useCart } from '../context/CartContext'; // assuming you use context

function NavbarCus() {
  const [showCategories, setShowCategories] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // const { cartCount } = useCart(); // cart items count
  const cartCount = 0;
  const handleLogin = () => {
    setLoggedIn(true);
    setShowProfile(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowProfile(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      alert(`Searching for: ${searchTerm}`);
    } else {
      alert("Please enter a product name!");
    }
  };

  const categories = ["Product", "Item", "Sort by", "Filter"];

  return (
    <div className="navbar-container">
      {/* Top Banner */}
      <div className="top-banner">
        <p><strong>ShopMate</strong>, east or west our product is best</p>
        <div className="top-right">
          <span>Secure Delivery</span>
          <span>Call Us: +91 1234567890</span>
          <span>INDIA</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="logo">ShopMate</div>

        {/* Location Dropdown */}
        <div className="location">
          <span>Location:</span>
          <select>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Australia</option>
          </select>
        </div>

        {/* Search Bar with Button */}
        <div className="search-container">
          <input
            className="search-bar"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
        </div>

        {/* Icons */}
        <div className="nav-icons">
          {loggedIn ? (
            <div className="profile-menu">
              <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
                My Profile
              </button>
              {showProfile && (
                <div className="profile-box">
                  <ul>
                    <li>My Orders</li>
                    <li>Wishlist</li>
                    <li>My Details</li>
                    <li><button className="logout-btn" onClick={handleLogout}>Sign Out</button></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              <FontAwesomeIcon icon={faUser} /> Login / Sign Up
            </button>
          )}
          <div className="cart-icon">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>{cartCount} items</span>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
        <button className="categories-btn" onClick={() => setShowCategories(!showCategories)}>
          ALL CATEGORIES
        </button>

        {showCategories && (
          <div className="category-dropdown">
            <ul>
              {categories.map((cat, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={faChevronRight} /> {cat}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/meats">Book</Link></li>
          <li><Link to="/bakery">BAKERY</Link></li>
          <li><Link to="/beverages">BEVERAGES</Link></li>
          <li><Link to="/blog">BLOG</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarCus;
