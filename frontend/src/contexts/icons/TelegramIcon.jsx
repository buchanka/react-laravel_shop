import React from 'react';
import { IconContext } from "react-icons";
import { RiTelegramLine } from "react-icons/ri";
function TelegramIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'38px'}}
        >
            <div>
                <RiTelegramLine/>
            </div>
        </IconContext.Provider>
    );
}

export default TelegramIconSmall