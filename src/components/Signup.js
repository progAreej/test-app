
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Check if the email and password combination already exists in localStorage
    const storedData = localStorage.getItem("users");
    const users = storedData ? JSON.parse(storedData) : [];

    const userExists = users.some(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      alert("You already have an account.");
      localStorage.setItem("loggedInUser", email);
      setLoggedInUser(email);
      setIsLoggedIn(true);
    } else {
      // Add new user to the list and store it in localStorage
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", email);
      alert(`Account created successfully for ${email}`);
      setLoggedInUser(email);
      setIsLoggedIn(true);
      navigate("/"); // Replace with your desired path
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser("");
    setIsLoggedIn(false);
  };

  return (
    <div className="grid justify-center items-center h-screen">
      {isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {loggedInUser}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Enter your Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Enter your Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}