import React from 'react';
import Book from './Book';

const BookShelfs = ({ gridTitle, allBooks, onMoveShelf }) => {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{gridTitle}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {allBooks().map((book) => (
            <Book key={book.id} book={book} onMoveShelf={onMoveShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelfs;
