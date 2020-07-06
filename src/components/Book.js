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
                backgroundImage: `url("${
                  book.imageLinks.thumbnail !== undefined
                    ? book.imageLinks.thumbnail
                    : 'https://cdn.stocksnap.io/img-thumbs/960w/book-notebook_20KDRXQJNU.jpg'
                }")`,
              }}
            />
            <BookSelfChanger book={book} onMoveShelf={this.props.onMoveShelf} />
          </div>
          <div className='book-title'>{book.title}</div>
          <div className='book-authors'>
            {book.authors !== undefined ? book.authors[0] : 'unknown author'}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
