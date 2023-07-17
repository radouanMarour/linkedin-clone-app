import React, { useState } from 'react';
import Avatar from './img/avatar.png';
import PostImg from './img/postimg.jpg';
import './Post.css';
import HeaderOption from './components/HeaderOption';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function Post(data) {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const addComment = () => setShowCommentInput(prev => !prev);
    return (
        <div className='post'>
            <div className='post__header'>
                <img src={Avatar} alt="" />
                <div className='post__user'>
                    <p className='post__user__name'>Radouan Marour</p>
                    <p className='post__user__description'>Fullstack Developer</p>
                    <p className='post__user__date'>4h</p>
                </div>
            </div>
            <p className='post__message'>API stands for Application Programming Interface. It is a set of definitions and protocols for building and integrating application software.</p>
            <img className='post__photo' src={PostImg} alt="" />
            <div className='post__options'>
                <HeaderOption Icon={ThumbUpOutlinedIcon} title="Like" />
                <HeaderOption Icon={ChatOutlinedIcon} title="Comment" callback={addComment} />
                <HeaderOption Icon={RepeatOutlinedIcon} title="Repost" />
                <HeaderOption Icon={SendOutlinedIcon} title="Send" />
            </div>
            {
                showCommentInput && <div className='add__comment'>
                    <a href="#"><img src={Avatar} alt="" /></a>
                    <form>
                        <input type="text" name="comment" placeholder='Add a comment...' />
                    </form>
                </div>
            }
        </div>
    )
}

export default Post