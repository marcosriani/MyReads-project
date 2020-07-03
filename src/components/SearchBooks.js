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
    if (prevState.query !== this.state.query) {
      // Avoid error when searching for 0 query string length
      if (this.state.query.length > 0) {
        BooksAPI.search(this.state.query).then((books) => {
          this.setState(() => ({
            results: books,
          }));
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
    const { onMoveShelf, noOrganizedListOfBooks, onSearch } = this.props;

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
                  if (book.authors !== undefined) {
                    return (
                      <Book
                        key={book.id}
                        onMoveShelf={onMoveShelf}
                        bookDetails={book}
                        bookTitle={book.title}
                        imageUrl={`url("${book.imageLinks.thumbnail}")`}
                        bookAuthor={book.authors[0]}
                        noOrganizedListOfBooks={noOrganizedListOfBooks}
                        onSearch={onSearch}
                      />
                    );
                  }
                  return null;
                })
              : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
