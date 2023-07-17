import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import './Sidebar.css'
import Bg from './img/bg.png';
import Avatar from './img/avatar.png';

function Sidebar() {

    const recentItem = (item) => (<div className="groups">
        <GroupsIcon /> <p>{item}</p>
    </div>)

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <img src={Bg} alt="" />
                <div className='avatar'><img src={Avatar} alt="" /></div>
                <p className='user__name'>radouan Marour</p>
                <p className='user__title'>Fullstack web developer</p>
            </div>
            <div className='sidebar__bottom'>
                <div>
                    <p>Connections<br /><strong>Grow your network</strong></p>
                    <p style={{ color: "blue" }}>35</p>
                </div>
                <div>
                    <p style={{ color: "#5f6163" }}>Who's viewed your profile</p>
                    <p style={{ color: "blue" }}>5</p>
                </div>
            </div>
            <div className='sidebar__recent'>
                <p className='recent'>Recent</p>
                {recentItem("Front End Developer")}
                {recentItem("Software Developer")}
                {recentItem("Laravel Developer")}
                {recentItem("Javascript")}
            </div>
        </div>
    )
}

export default Sidebar