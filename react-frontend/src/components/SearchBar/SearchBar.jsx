import React from 'react'
import './SearchBar.css'

const SearchBar = (filter, setFilter) => {
  return (
    <div className="flexCenter search-bar">
      <input
        placeholder="Type what you want to serch here"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="button">Search</button>
    </div>
  )
}

export default SearchBar
