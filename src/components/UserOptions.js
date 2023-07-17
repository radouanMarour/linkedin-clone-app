import React from 'react';
import './UserOptions.css';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { logout } from '../authService';
import { useDispatch } from 'react-redux';

function UserOptions() {
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    }

    return (
        <div className='user__options'>
            <div className='user__options__info'>
                <img src={Avatar} alt="" />
                <div className='user__info'>
                    <p className='user__name'>Hamza Marour</p>
                    <p className='user__desc'>Senior Talent Acquisition </p>
                </div>
            </div>
            <button className='profile__btn'>
                <Link to="/profile" >View Profile</Link>
            </button>
            <p onClick={logoutUser}>Sign Out</p>
        </div>
    )
}

export default UserOptions