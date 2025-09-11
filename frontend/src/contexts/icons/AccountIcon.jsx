import React from 'react';
import { IconContext } from "react-icons";
import { RiAccountCircleFill } from "react-icons/ri";
function AccountIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'34px'}}
        >
            <div>
                <RiAccountCircleFill/>
            </div>
        </IconContext.Provider>
    );
}

export default AccountIconSmall