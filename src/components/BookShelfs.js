import React, { Component } from 'react';
import Book from './Book';

class BookShelfs extends Component {
  render() {
    const { gridTitle, books } = this.props;

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{gridTitle}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books.map((book) => (
              <Book
                key={book.bookTitle}
                bookTitle={book.bookTitle}
                imageUrl={book.imageUrl}
                bookAuthor={book.bookAuthor}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelfs;
