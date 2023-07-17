import React, { useState } from 'react'
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
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderOption from './components/HeaderOption';
import { useSelector } from 'react-redux';
import UserOptions from './components/UserOptions';

function Header() {
    const user = useSelector(state => state.auth.user);
    const [showModel, setShowModel] = useState(false);

    return (
        <div className='header'>
            <div className='header__left'>
                <img src={Logo} alt="" />

                <div className='header__search'>
                    <SearchOutlinedIcon />
                    <input type='text' />
                </div>
            </div>
            <div className='header__right'>
                <HeaderOption Icon={HomeIcon} title="Home" active={true} url="#" />
                <HeaderOption Icon={PeopleIcon} title="My Network" url="#" />
                <HeaderOption Icon={WorkIcon} title="Jobs" />
                <HeaderOption Icon={SmsRoundedIcon} title="Messaging" url="#" />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" url="#" />
                <div className='user' onClick={() => setShowModel(p => !p)}>
                    {/* <img src="" alt="" /> */}
                    <img src={Avatar} alt="" />
                    <p>
                        <span>Me</span>
                        <ArrowDropDownIcon />
                    </p>
                </div>
                {showModel && <UserOptions />}
                <HeaderOption Icon={AppsIcon} title="For Business" />
            </div>
        </div>
    )
}

export default Header