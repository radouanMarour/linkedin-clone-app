import React from 'react';
import './Loading.css';
import Logo from '../img/whitlogo.png';

function Loading() {
    return (
        <div className='loading'>
            <img src={Logo} alt="" />
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading