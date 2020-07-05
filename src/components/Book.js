import React, { Component } from 'react';
import BookSelfChanger from './BookShelfChanger';

class Book extends Component {
  render() {
    const { book } = this.props;
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
              }}
            />
            <BookSelfChanger book={book} onMoveShelf={this.props.onMoveShelf} />
          </div>
          <div className='book-title'>{book.title}</div>
          <div className='book-authors'>{book.authors[0]}</div>
        </div>
      </li>
    );
  }
}

export default Book;
