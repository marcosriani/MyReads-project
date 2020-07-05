import React, { Component } from 'react';

class BookShelfChanger extends Component {
  onChangeShelf = (e) => {
    this.props.onMoveShelf(this.props.book, e.target.value);
  };

  render() {
    return (
      <div className='book-shelf-changer'>
        <select value={this.props.book.shelf} onChange={this.onChangeShelf}>
          <option disabled value='move'>
            Move to...
          </option>
          <option value='currentlyReading'>Currently Reading</option>
          <option value='wantToRead'>Want to Read</option>
          <option value='read'>Read</option>
          <option value='none'>None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
