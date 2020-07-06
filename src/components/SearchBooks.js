import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    results: [],
  };

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  // Search
  componentDidUpdate(prevProps, prevState) {
    // Checking to make sure the componentDidUpdate don't get in a loop
    if (
      prevState.query !== this.state.query ||
      prevProps.clickedShelf !== this.props.clickedShelf
    ) {
      // Avoid error when searching for 0 query string length
      if (this.state.query.length > 0) {
        BooksAPI.search(this.state.query).then((books) => {
          // Make sure no errors when a book dont exist on server
          if (!books.error) {
            const booksResult = [...books];
            booksResult.forEach((book) => (book.shelf = 'none'));

            for (let book of booksResult) {
              for (let item of this.props.allBooks) {
                if (book.id === item.id) {
                  book.shelf = item.shelf;
                }
              }
            }

            this.setState(() => ({
              results: booksResult,
            }));
          }
        });

        // this.props.onSearch(this.state.results);
      } else if (this.state.query.length === 0) {
        this.setState(() => ({
          results: [],
        }));
      }
    }
  }

  render() {
    const { onMoveShelf } = this.props;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              value={this.state.query}
              onChange={this.handleInputChange}
              type='text'
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.results.length > 0
              ? this.state.results.map((book) => {
                  return (
                    <Book key={book.id} book={book} onMoveShelf={onMoveShelf} />
                  );
                })
              : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
