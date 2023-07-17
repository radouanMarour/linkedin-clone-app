import React, { useEffect, useState } from 'react'
import PanoramaIcon from '@mui/icons-material/Panorama';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Feed.css';
import Avatar from './img/avatar.png';
import HeaderOption from './components/HeaderOption';
import Post from './Post';
import { db } from './firebase';
import { query, collection, getDocs } from "firebase/firestore";

function Feed() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const q = query(collection(db, "posts"));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setPosts(data);
            console.log(data);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching posts data");
        }
    };
    useEffect(() => {
        // if (loading) return;
        fetchPosts();
    }, []);

    return (
        <div className='feed'>
            <div className='feed__input'>
                <div className='feed__input__top'>
                    <a href="#"><img src={Avatar} alt="" /></a>
                    <button><span>Start a post</span></button>
                </div>
                <div className='feed__input__bottom'>
                    <HeaderOption Icon={PanoramaIcon} title="Photo" color="#378fe9" />
                    <HeaderOption Icon={SmartDisplayIcon} title="Video" color="#5f9b41" />
                    <HeaderOption Icon={EventAvailableIcon} title="Event" color="#c37d16" />
                    <HeaderOption Icon={EditNoteIcon} title="Write article" color="#e16745" />
                </div>
            </div>
            <button className='line'>
                <hr />
                <div className='sorting'>
                    <span>Sort by: </span>
                    <span><strong>Recent</strong></span>
                    <ArrowDropDownIcon />
                </div>
            </button>
            <div className='feed__posts'>
                <Post />
            </div>
        </div>
    )
}

export default Feed