import React from 'react';
import BookShelfs from './BookShelfs';
import { Link } from 'react-router-dom';

const ListBooks = ({ libraryBooks, onMoveShelf, noOrganizedListOfBooks }) => {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <BookShelfs
            onMoveShelf={onMoveShelf}
            gridTitle='Currently Reading'
            shelfsBooks={libraryBooks.currentlyReading}
            noOrganizedListOfBooks={noOrganizedListOfBooks}
          />
          <BookShelfs
            onMoveShelf={onMoveShelf}
            gridTitle='Want to Read'
            shelfsBooks={libraryBooks.wantToRead}
            noOrganizedListOfBooks={noOrganizedListOfBooks}
          />
          <BookShelfs
            onMoveShelf={onMoveShelf}
            gridTitle='Read'
            shelfsBooks={libraryBooks.read}
            noOrganizedListOfBooks={noOrganizedListOfBooks}
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
