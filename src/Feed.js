import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { collection, getDocs, orderBy } from 'firebase/firestore';
import CreatePost from './components/CreatePost';
import { Link } from 'react-router-dom';

function Feed() {
    // State to hold posts and show/hide create post form
    const [posts, setPosts] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // Get user information from Redux store
    const user = useSelector((state) => state.auth.user);

    // Function to fetch posts from the database
    const fetchPosts = async () => {
        try {
            // Get all posts from the "posts" collection and order them by timestamp in descending order
            const { docs } = await getDocs(collection(db, 'posts'), orderBy('timestamp', 'desc'));

            // Map and transform the data to include the document ID
            const transformedPosts = docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            // Update the state with the sorted posts
            setPosts(transformedPosts);
        } catch (err) {
            console.error(err);
            alert('An error occurred while fetching posts data');
        }
    };

    // Fetch posts on component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='feed'>
            {/* Create Post Section */}
            <div className='feed__input'>
                <div className='feed__input__top'>
                    {/* Display the user's profile picture and link to their profile page */}
                    <Link to='profile'>
                        <img src={user?.photoUrl ? user?.photoUrl : Avatar} alt='User Profile' />
                    </Link>
                    <button onClick={() => setShowCreate(true)}>
                        <span>Start a post</span>
                    </button>
                </div>
                {showCreate && <CreatePost setShowCreate={setShowCreate} setPosts={setPosts} />}
                <div className='feed__input__bottom'>
                    {/* Header options for creating different types of posts */}
                    <HeaderOption Icon={PanoramaIcon} title='Photo' color='#378fe9' />
                    <HeaderOption Icon={SmartDisplayIcon} title='Video' color='#5f9b41' />
                    <HeaderOption Icon={EventAvailableIcon} title='Event' color='#c37d16' />
                    <HeaderOption Icon={EditNoteIcon} title='Write article' color='#e16745' />
                </div>
            </div>
            {/* Sorting and Feed Posts */}
            <button className='line'>
                <hr />
                <div className='sorting'>
                    <span>Sort by: </span>
                    <span>
                        <strong>Recent</strong>
                    </span>
                    <ArrowDropDownIcon />
                </div>
            </button>
            <div className='feed__posts'>
                {/* Display all posts */}
                {posts?.length > 0 &&
                    posts.map((post) => <Post key={post.id} post={post} setPosts={setPosts} />)}
            </div>
        </div>
    );
}

export default Feed;
