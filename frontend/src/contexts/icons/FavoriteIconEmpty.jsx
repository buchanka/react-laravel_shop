import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";

function FavoriteIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'red', size:'28px'}}
        >
            <div>
                <FaRegHeart/>
            </div>
        </IconContext.Provider>
    );
}

export default FavoriteIconSmall