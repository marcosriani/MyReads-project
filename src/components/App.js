import React from 'react';
import * as BooksAPI from '../BooksAPI';
import '../App.css';
import { Route } from 'react-router-dom'; // Route

// Components
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    clickedBook: {},
    clickedShelf: '',
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        if (book.shelf === undefined) {
          book.shelf = 'none';
        }
      });

      this.setState({ allBooks: books });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.clickedShelf !== this.state.clickedShelf ||
      prevState.clickedBook !== this.state.clickedBook
    ) {
      // Make sure to remove books from allBooks when there shelf is none
      this.state.allBooks.forEach((book) => {
        if (book.shelf === 'none') {
          this.setState((prevState) => ({
            allBooks: prevState.allBooks.filter((item) => item !== book),
          }));
        }
      });
      BooksAPI.update(this.state.clickedBook, this.state.clickedShelf);
    }
  }

  onMoveShelf = (book, newShelf) => {
    const chosenBook = { ...book };

    const newShelfState = this.state.allBooks.map((item) => {
      if (item.id === chosenBook.id) {
        item.shelf = newShelf;
      }

      return item;
    });

    this.setState({
      allBooks: newShelfState,
      clickedBook: book,
      clickedShelf: newShelf,
    });

    // To add new books
    for (let item of this.state.allBooks) {
      // Make sure the new book wont be duplicate
      if (chosenBook.shelf === 'none' && item.id !== chosenBook.id) {
        chosenBook.shelf = newShelf;

        this.setState((prevState) => ({
          allBooks: prevState.allBooks.concat(chosenBook),
          clickedBook: book,
          clickedShelf: newShelf,
        }));
      }
    }
  };

  onAddBook = (book) => {
    console.log(book);

    // this.state.allBooks.forEach((book) => {
    //   if (book.shelf === 'none') {
    //     this.setState((prevState) => ({
    //       allBooks: prevState.allBooks.filter((item) => item !== book),
    //     }));
    //   }
    // });
  };

  render() {
    console.log(this.state.allBooks);

    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <ListBooks
              allBooks={this.state.allBooks}
              onMoveShelf={this.onMoveShelf}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              allBooks={this.state.allBooks}
              onMoveShelf={this.onMoveShelf}
              onAddBook={this.onAddBook}
              clickedBook={this.state.clickedBook}
              clickedShelf={this.state.clickedShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
