import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
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
        BooksAPI.search(this.state.query).then((allBooks) => {
          if (!allBooks.error) {
            allBooks.forEach((book) => {
              book.shelf = 'none';
              this.props.noOrganizedListOfBooks.forEach((item) => {
                if (item.id === book.id) {
                  book.shelf = item.shelf;
                }
              });
            });
            this.setState({ searchResults: allBooks });
          }

          this.setState(() => ({
            searchResults: allBooks,
          }));
        });

        // this.props.onSearch(this.state.results);
      } else if (this.state.query.length === 0) {
        this.setState(() => ({
          searchResults: [],
        }));
      }
    }
  }

  // changeShelf = () => {
  //   const copySearchResults = [...this.state.searchResults];

  //   if (!copySearchResults.error) {
  //     copySearchResults.forEach((book) => {
  //       this.props.noOrganizedListOfBooks.forEach((item) => {
  //         if (item.id === book.id) {
  //           console.log('true');
  //           console.log(item.shelf);
  //         }
  //       });
  //     });
  //   }
  // };

  render() {
    const {
      onMoveShelf,
      noOrganizedListOfBooks,
      onSearch,
      onSearchMovingBook,
    } = this.props;

    // console.log(copyResults);

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
            {this.state.searchResults.length > 0
              ? this.state.searchResults.map((book) => {
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
                        shelf={book.shelf}
                        onSearchMovingBook={onSearchMovingBook}
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
