import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
      setIsLoggedIn(true);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser("");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Library App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/AboutUs" className="hover:text-gray-300">About Us</Link>
            </li>
            <li>
              <Link to="/Contact" className="hover:text-gray-300">Contact</Link>
            </li>
            <li>
              <Link to="/Catalog" className="hover:text-gray-300">Catalog</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <span className="text-gray-300">Welcome, {loggedInUser}!</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/Signup">
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    Sign Up
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
