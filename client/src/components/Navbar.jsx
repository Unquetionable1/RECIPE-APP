// src/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import chefIcon from '../images/chef.png'; // Import your icon here

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="Nav-container">
        <div className="nav-branding">
          <img src={chefIcon} alt="Chef Hat Icon" className="chef-icon" /> {/* Display your icon */}
          Recipe<span className="hub">APP</span>
        </div>
        <div className={`nav-link-container ${isOpen ? "open" : ""}`}>
          <ul>
            <li className="nav-links">
              <Link to="/" className="navs" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-links">
                  <Link to="/discover" className="navs" onClick={() => setIsOpen(false)}>
                    Discover
                  </Link>
                </li>
                <li className="nav-links">
                  <Link to="/recipes" className="navs" onClick={() => setIsOpen(false)}>
                    Recipes
                  </Link>
                </li>
                <li className="nav-links">
                  <button className="nav-button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-links">
                <Link to="/login" className="login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
            )}
            {/* Link to Meal Planner */}
            <li className="nav-links">
              <Link to="/mealplanner" className="nav-button" onClick={() => setIsOpen(false)}>
                Meal Planner
              </Link>
            </li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
