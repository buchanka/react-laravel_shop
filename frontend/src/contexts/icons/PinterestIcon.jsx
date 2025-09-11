import React from 'react';
import { IconContext } from "react-icons";
import { SiPinterest } from "react-icons/si";
function InstagramIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'34px'}}
        >
            <div>
                <SiPinterest/>
            </div>
        </IconContext.Provider>
    );
}

export default InstagramIconSmall