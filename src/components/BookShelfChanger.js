import React from 'react';

const BookShelfChanger = ({ selectedShelf, onSelectedShelf }) => {
  const onSubmit = (e) => {
    onSelectedShelf(e.target.value);
  };

  return (
    <div className='book-shelf-changer'>
      <select value={selectedShelf} onChange={onSubmit}>
        <option value='move'>Move to...</option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
