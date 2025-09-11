import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
function HeartIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'28px'}}
        >
            <div>
                <FaRegHeart/>
            </div>
        </IconContext.Provider>
    );
}

export default HeartIconSmall