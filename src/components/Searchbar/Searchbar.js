import React from "react";
import './Searchbar.scss'
const Searchbar = () => {
  return (
    <div className='searchbar-container'>
      <div className="searchbar-box">
        <input className="search-input"/>
        </div>
      <div className="searchbar-button">
        <button className="search-button">
          🔍︎
        </button>
        </div>
      </div>
  );
};
export default Searchbar;