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

  updateLibrary = () => {
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
      wantToRead: newLibrary.filter((book) => book.shelf === 'wantToRead'),
      read: newLibrary.filter((book) => book.shelf === 'read'),
    };

    this.props.onMoveShelf(allBooks);
  };

  //   Posting books to the data base
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedShelf !== this.state.selectedShelf) {
      if (this.state.selectedShelf.length > 0) {
        //   This if is used only when adding new books from the search component
        if (
          !this.props.noOrganizedListOfBooks.includes(this.state.selectedBook)
        ) {
          this.props.onSearch(this.state.selectedBook);
        }

        // Change library state so that the books can change shelfs
        this.updateLibrary();

        //   Will update the backend server with our new data and update the state
        BooksAPI.update(this.state.selectedBook, this.state.selectedShelf);
      }
    }

    if (
      prevProps.noOrganizedListOfBooks !== this.props.noOrganizedListOfBooks
    ) {
      // Making sure the new books are added to the right place
      if (this.state.selectedShelf.length > 0) {
        if (
          !this.props.noOrganizedListOfBooks.includes(this.state.selectedBook)
        ) {
          this.props.onSearch(this.state.selectedBook);
        }

        if (
          prevProps.noOrganizedListOfBooks.find(
            (book) => book.id === this.state.selectedBook.id
          ) === undefined
        ) {
          // Change library state so that the new book can be added to the new shelf
          this.updateLibrary();
        }
      }
    }
  }

  //   To get the selected shelf option
  onSelectedShelf = (selected) => {
    this.setState({ selectedShelf: selected });
  };

  render() {
    const { bookTitle, bookAuthor, imageUrl, shelf } = this.props;

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
              shelf={shelf}
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
