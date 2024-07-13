import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Fire() {
  const [books, setBooks] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newISBN, setNewISBN] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://library-app-3cf76-default-rtdb.europe-west1.firebasedatabase.app/books.json');
      if (response.data) {
        const filteredBooks = Object.keys(response.data)
          .filter(key => !response.data[key].isDeleted)
          .reduce((obj, key) => {
            obj[key] = response.data[key];
            return obj;
          }, {});
        setBooks(filteredBooks);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async () => {
    try {
      await axios.post('https://library-app-3cf76-default-rtdb.europe-west1.firebasedatabase.app/books.json', {
        id: 31,
        author: 'Areej Omar Abumuhfouz',
        isbn: '293847239848',
        title: 'Areej And Programming',
        isDeleted: false
      });
      fetchData();  // Fetch data again to update the list with the newly added book
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const softDeleteBook = async (bookId) => {
    try {
      await axios.patch(`https://library-app-3cf76-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json`, { isDeleted: true });
      fetchData();  // Fetch data again to update the list after soft deleting a book
      console.log(`Book ${bookId} marked as deleted`);
    } catch (error) {
      console.error('Error marking book as deleted:', error);
    }
  };

  const editBook = (bookId, title, author, isbn) => {
    setEditingBook(bookId);
    setNewTitle(title);
    setNewAuthor(author);
    setNewISBN(isbn);
  };

  const saveBook = async () => {
    try {
      await axios.patch(`https://library-app-3cf76-default-rtdb.europe-west1.firebasedatabase.app/books/${editingBook}.json`, {
        title: newTitle,
        author: newAuthor,
        isbn: newISBN
      });
      setEditingBook(null);
      setNewTitle('');
      setNewAuthor('');
      setNewISBN('');
      fetchData();  // Fetch data again to update the list with the edited book
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Books from Firebase Realtime Database</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books ? (
          Object.keys(books).map((key) => (
            <div key={key} className="bg-white rounded-lg shadow-md p-4">
              {editingBook === key ? (
                <div>
                  <input
                    className="block mb-2 p-2 border border-gray-300 rounded"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    className="block mb-2 p-2 border border-gray-300 rounded"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Author"
                  />
                  <input
                    className="block mb-2 p-2 border border-gray-300 rounded"
                    value={newISBN}
                    onChange={(e) => setNewISBN(e.target.value)}
                    placeholder="ISBN"
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={saveBook}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-2">{books[key].title}</h2>
                  <p className="text-gray-700">Author: {books[key].author}</p>
                  <p className="text-gray-700">ISBN: {books[key].isbn}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                    onClick={() => editBook(key, books[key].title, books[key].author, books[key].isbn)}
                  >
                    Edit
                  </button>
                  <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => softDeleteBook(key)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}
