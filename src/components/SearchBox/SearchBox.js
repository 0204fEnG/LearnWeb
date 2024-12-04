import React from "react";
import './SearchBox.css'
const SearchBox = () => {
  return (
    <div className="search-box-container">
      <div className="search-box">
        
      <input className="search-box__input" type="text"/>
      <button className="search-box__button"></button>
      </div>
      </div>
  );
};
export default SearchBox;