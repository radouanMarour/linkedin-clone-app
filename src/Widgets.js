import React from 'react'
import './Widgets.css';
import Avatar from './img/avatar.png';
import AddIcon from '@mui/icons-material/Add';

function Widgets() {
    return (
        <div className='widgets'>
            <h3>Add to your feed</h3>
            <div className='user'>
                <img src={Avatar} alt="" />
                <div className='user__info'>
                    <p className='user__name'>Hamza Marour</p>
                    <p className='user__desc'>Senior Talent Acquisition </p>
                    <button className='follow__btn'>
                        <AddIcon /> <span>Follow</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Widgets