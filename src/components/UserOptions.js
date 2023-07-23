import React from 'react';
import './UserOptions.css';
import Avatar from '../img/avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../authService';
import { useDispatch, useSelector } from 'react-redux';

function UserOptions() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate()

    const logoutUser = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div className='user__options'>
            <div className='user__options__info'>
                <img src={user?.photoUrl ? user?.photoUrl : Avatar} alt="" />
                <div className='user__info'>
                    <p className='user__name'>{user?.name}</p>
                    <p className='user__desc'>{user?.headline}</p>
                </div>
            </div>
            {/* <button className='profile__btn'> */}
            <Link to="/profile" >View Profile</Link>
            {/* </button> */}
            <p onClick={logoutUser}>Sign Out</p>
        </div>
    )
}

export default UserOptions