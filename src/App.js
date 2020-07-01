import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom'; // Route

// Components
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    libraryBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ libraryBooks: books });
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => <ListBooks />} />
        <Route
          path='/search'
          render={() => <SearchBooks books={this.state.libraryBooks} />}
        />
      </div>
    );
  }
}

export default BooksApp;
