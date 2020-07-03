import React, { Component } from 'react';

class BookShelfChanger extends Component {
  onSubmit = (e) => {
    // this.setState({ value: e.target.value });
    this.props.onSelectedShelf(e.target.value);
  };

  render() {
    return (
      <div className='book-shelf-changer'>
        <select value={this.props.selectedShelf} onChange={this.onSubmit}>
          <option value='move'>Move to...</option>
          <option value='currentlyReading'>Currently Reading</option>
          <option value='wantToRead'>Want to Read</option>
          <option value='read'>Read</option>
          <option value='none'>Delete</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
