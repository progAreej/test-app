import React from "react";
import { useState } from "react";
import initState from "./values";

function Content() {
  const arr = initState.books;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Library Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {arr.map((book, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">ISBN: {book.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
