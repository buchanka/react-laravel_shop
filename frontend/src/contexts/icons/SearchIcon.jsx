import React from 'react';
import { IconContext } from "react-icons";
import { IoSearchSharp } from "react-icons/io5";
function SearchIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'30px'}}
        >
            <div>
                <IoSearchSharp/>
            </div>
        </IconContext.Provider>
    );
}

export default SearchIconSmall