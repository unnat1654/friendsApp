import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({searchUsers}) => {
    const [search,setSearch]=useState("");
  return (
    <form className="max-w-lg mx-auto mb-7">
      <div className="relative w-72">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearch className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Find Friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={()=>searchUsers(search)}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
