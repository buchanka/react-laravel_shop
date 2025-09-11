import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IconContext } from "react-icons";

function FavoriteIconFullSmall(){
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

export default FavoriteIconFullSmall