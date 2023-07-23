import React, { useState } from 'react';
import './Header.css';
import Logo from './img/linkedin.png';
import Avatar from './img/avatar.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HeaderOption from './components/HeaderOption';
import { useSelector } from 'react-redux';
import UserOptions from './components/UserOptions';
import { auth } from './firebase';

function Header() {
    // Get user information from Redux store
    const user = useSelector((state) => state.auth.user);

    // State to control the display of the user options model
    const [showModel, setShowModel] = useState(false);

    return (
        <div className='header'>
            {/* Header Left */}
            <div className='header__left'>
                <img src={Logo} alt='LinkedIn Logo' />
                <div className='header__search' tabIndex={1}>
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='Search' />
                </div>
            </div>

            {/* Header Right */}
            <div className='header__right'>
                <HeaderOption Icon={HomeIcon} title='Home' active={true} url='/' />
                <HeaderOption Icon={PeopleIcon} title='My Network' url='#' />
                <HeaderOption Icon={WorkIcon} title='Jobs' />
                <HeaderOption Icon={SmsRoundedIcon} title='Messaging' url='#' />
                <HeaderOption Icon={NotificationsIcon} title='Notifications' url='#' />

                {/* User Profile Section */}
                <div className='user' onClick={() => setShowModel((prev) => !prev)}>
                    <img src={user?.photoUrl ? user.photoUrl : Avatar} alt='User Profile' />
                    <p>
                        <span>Me</span>
                        <ArrowDropDownIcon />
                    </p>
                </div>
                {showModel && <UserOptions />}

                <HeaderOption Icon={AppsIcon} title='For Business' />
            </div>
        </div>
    );
}

export default Header;
