import React from 'react';
import { TiShoppingCart } from "react-icons/ti";
import { IconContext } from "react-icons";
function CartIconSmall(){
    return(
        <IconContext.Provider
        value={{color: 'white', size:'34px'}}
        >
            <div>
                <TiShoppingCart/>
            </div>
        </IconContext.Provider>
    );
}

export default CartIconSmall