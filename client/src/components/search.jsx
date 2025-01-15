import { CiSearch } from "react-icons/ci";
import React from "react";

const Search = ({placeholder}) => {
    return(
        <div className="flex px-4 py-3 rounded-md border-2 border-primary overflow-hidden max-w-md mx-auto">
        <input 
            type="text"
            placeholder={placeholder}
            className="outline-none bg-transparent text-gray-600 text-sm"
        />
        <CiSearch />
    </div>
    )
}

export default Search