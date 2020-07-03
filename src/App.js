import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom'; // Route

// Components
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    libraryBooks: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    noOrganizedListOfBooks: {},
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const allBooks = {
        currentlyReading: books.filter(
          (book) => book.shelf === 'currentlyReading'
        ),
        wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        read: books.filter((book) => book.shelf === 'read'),
      };

      this.setState({ libraryBooks: allBooks, noOrganizedListOfBooks: books });
    });
  }

  onMoveShelf = (allBooks) => {
    this.setState({ libraryBooks: allBooks });
  };

  onSearch = (book) => {
    this.setState((prevState) => ({
      noOrganizedListOfBooks: prevState.noOrganizedListOfBooks.concat(book),
    }));
  };

  render() {
    console.log(this.state.noOrganizedListOfBooks);

    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <ListBooks
              libraryBooks={this.state.libraryBooks}
              onMoveShelf={this.onMoveShelf}
              noOrganizedListOfBooks={this.state.noOrganizedListOfBooks}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              onMoveShelf={this.onMoveShelf}
              onSearch={this.onSearch}
              noOrganizedListOfBooks={this.state.noOrganizedListOfBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
