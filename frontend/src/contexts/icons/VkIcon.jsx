import React from 'react';
import { IconContext } from "react-icons";
import { FaVk } from "react-icons/fa6";
function VkIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'31px'}}
        >
            <div>
                <FaVk/>
            </div>
        </IconContext.Provider>
    );
}

export default VkIconSmall