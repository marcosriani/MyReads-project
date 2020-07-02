import React, { Component } from 'react';
import Book from './Book';

class BookShelfs extends Component {
  render() {
    const {
      gridTitle,
      shelfsBooks,
      onMoveShelf,
      noOrganizedListOfBooks,
    } = this.props;

    // console.log(books);

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{gridTitle}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {shelfsBooks.map((book) => (
              <Book
                key={book.id}
                onMoveShelf={onMoveShelf}
                bookDetails={book}
                bookTitle={book.title}
                imageUrl={`url("${book.imageLinks.thumbnail}")`}
                bookAuthor={book.authors[0]}
                noOrganizedListOfBooks={noOrganizedListOfBooks}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelfs;
