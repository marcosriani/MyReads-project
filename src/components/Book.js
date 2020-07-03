import React, { Component } from 'react';
import BookSelfChanger from './BookShelfChanger';
import * as BooksAPI from '../BooksAPI';

class Book extends Component {
  state = {
    selectedShelf: '',
    selectedBook: [],
  };

  //   To select the book
  onSelectedBook = () => {
    this.setState(() => ({
      selectedBook: this.props.bookDetails,
    }));
  };

  //   Posting books to the data base
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedShelf !== this.state.selectedShelf) {
      if (this.state.selectedShelf.length > 0) {
        //   Will update the backend server with our data
        BooksAPI.update(this.state.selectedBook, this.state.selectedShelf).then(
          () => {
            //   This if is used only when adding new books from the search component
            if (
              !this.props.noOrganizedListOfBooks.includes(
                this.state.selectedBook
              )
            ) {
              this.props.onSearch(this.state.selectedBook);
            }

            const newLibrary = [...this.props.noOrganizedListOfBooks];
            newLibrary.forEach((book) =>
              book.id === this.props.bookDetails.id
                ? (book.shelf = this.state.selectedShelf)
                : null
            );
            const allBooks = {
              currentlyReading: newLibrary.filter(
                (book) => book.shelf === 'currentlyReading'
              ),
              wantToRead: newLibrary.filter(
                (book) => book.shelf === 'wantToRead'
              ),
              read: newLibrary.filter((book) => book.shelf === 'read'),
            };

            this.props.onMoveShelf(allBooks);
          }
        );
      }
    }
  }

  //   To get the selected shelf option
  onSelectedShelf = (selected) => {
    this.setState({ selectedShelf: selected });
  };

  render() {
    const { bookTitle, bookAuthor, imageUrl } = this.props;
    return (
      <li onChange={this.onSelectedBook}>
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
            <BookSelfChanger
              selectedShelf={this.state.selectedShelf}
              onSelectedShelf={this.onSelectedShelf}
            />
          </div>
          <div className='book-title'>{bookTitle}</div>
          <div className='book-authors'>{bookAuthor}</div>
        </div>
      </li>
    );
  }
}

export default Book;
