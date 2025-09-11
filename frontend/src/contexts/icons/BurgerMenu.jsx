import React from 'react';
import { IconContext } from "react-icons";
import { RxHamburgerMenu } from "react-icons/rx";
function HamburgerMenu(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'34px'}}
        >
            <div>
                <RxHamburgerMenu/>
            </div>
        </IconContext.Provider>
    );
}

export default HamburgerMenu;