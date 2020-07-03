import React, { Component } from 'react';

class BookShelfChanger extends Component {
  onSubmit = (e) => {
    this.props.onSelectedShelf(e.target.value);
  };

  render() {
    // console.log(this.props.shelf);

    return (
      <div className='book-shelf-changer'>
        <select value={this.props.shelf} onChange={this.onSubmit}>
          <option value='move'>Move to...</option>
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
