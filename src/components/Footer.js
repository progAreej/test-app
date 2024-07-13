import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p>&copy; 2024 Library App. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-gray-400">Facebook</a>
          <a href="https://twitter.com" className="hover:text-gray-400">Twitter</a>
          <a href="https://instagram.com" className="hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
