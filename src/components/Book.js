import React, { Component } from 'react';
import BookSelfChanger from './BookShelfChanger';

class Book extends Component {
  render() {
    const { bookTitle, bookAuthor, imageUrl } = this.props;

    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: imageUrl,
              }}
            />
            <BookSelfChanger />
          </div>
          <div className='book-title'>{bookTitle}</div>
          <div className='book-authors'>{bookAuthor}</div>
        </div>
      </li>
    );
  }
}

export default Book;
