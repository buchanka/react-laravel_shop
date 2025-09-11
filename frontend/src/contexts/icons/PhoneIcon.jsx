import React from 'react';
import { IconContext } from "react-icons";
import { BsTelephone } from "react-icons/bs"; 
function PhoneIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'28px'}}
        >
            <div>
                <BsTelephone/>
            </div>
        </IconContext.Provider>
    );
}

export default PhoneIconSmall