import React from 'react';
import BookShelfs from './BookShelfs';
import { Link } from 'react-router-dom';

const ListBooks = ({ allBooks, onMoveShelf }) => {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <BookShelfs
            gridTitle='Currently Reading'
            allBooks={() =>
              allBooks.filter((book) => {
                return book.shelf === 'currentlyReading';
              })
            }
            onMoveShelf={onMoveShelf}
          />
          <BookShelfs
            gridTitle='Want to Read'
            allBooks={() =>
              allBooks.filter((book) => {
                return book.shelf === 'wantToRead';
              })
            }
            onMoveShelf={onMoveShelf}
          />
          <BookShelfs
            gridTitle='Read'
            allBooks={() =>
              allBooks.filter((book) => {
                return book.shelf === 'read';
              })
            }
            onMoveShelf={onMoveShelf}
          />
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default ListBooks;
