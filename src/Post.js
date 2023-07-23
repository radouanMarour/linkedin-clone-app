import React, { useEffect, useState } from 'react';
import Avatar from './img/avatar.png';
import './Post.css';
import HeaderOption from './components/HeaderOption';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from './firebase';
import Comment from './components/Comment';

function Post({ post, setPosts }) {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState('');

    // Function to toggle showing/hiding the comment input field
    const addComment = () => setShowCommentInput((prev) => !prev);

    useEffect(() => {
        // Function to fetch the user data based on the post's userId
        async function getUser() {
            const userRef = doc(db, 'users', post?.userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setUser(userSnap.data());
            }
        }
        getUser();
    }, [post?.userId]);

    const likePost = async () => {
        const postRef = doc(db, 'posts', post.id);
        const liked = post?.likes.indexOf(auth.currentUser.uid);

        if (liked !== -1) {
            // Unlike the post if already liked
            await updateDoc(postRef, {
                likes: arrayRemove(auth.currentUser.uid),
            });
            setPosts((prev) => {
                return prev.map((p) => {
                    if (p.id === post.id) {
                        return {
                            ...p,
                            likes: p.likes.filter((userId) => userId !== auth.currentUser.uid),
                        };
                    } else {
                        return p;
                    }
                });
            });
        } else {
            // Like the post if not already liked
            await updateDoc(postRef, {
                likes: arrayUnion(auth.currentUser.uid),
            });
            setPosts((prev) => {
                return prev.map((p) => {
                    if (p.id === post.id) {
                        return {
                            ...p,
                            likes: [...p.likes, auth.currentUser.uid],
                        };
                    } else {
                        return p;
                    }
                });
            });
        }
    };

    const commentPost = async (e) => {
        e.preventDefault();
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
            comments: arrayUnion({
                userId: auth.currentUser.uid,
                body: comment,
            }),
        });
        setComment('');
        setPosts((prev) => {
            return prev.map((p) => {
                if (p.id === post.id) {
                    return {
                        ...p,
                        comments: [
                            ...p.comments,
                            {
                                userId: auth.currentUser.uid,
                                body: comment,
                            },
                        ],
                    };
                } else {
                    return p;
                }
            });
        });
    };

    return (
        <div className='post'>
            <div className='post__header'>
                <img src={user?.photoUrl ? user?.photoUrl : Avatar} alt='User Avatar' />
                <div className='post__user'>
                    <p className='post__user__name'>{user?.fName}</p>
                    <p className='post__user__headline'>{user?.headline}</p>
                    <p className='post__user__createdAt'>{new Date(post.timestamp).toLocaleString()}</p>
                </div>
            </div>
            <p className='post__message'>{post.message}</p>
            {post.photoUrl && <img className='post__photo' src={post.photoUrl} alt='Post Photo' />}
            <div className='stats'>
                {/* Show the number of likes if there are any */}
                {post.likes.length > 0 && (
                    <p className='likes'>
                        <span>{post.likes.length}</span> <ThumbUpAltIcon />
                    </p>
                )}
                {/* Show the number of comments if there are any */}
                {post.comments.length > 0 && <span className='comments'>{post.comments.length} comments</span>}
            </div>
            <div className='post__options'>
                {/* Like post option with a callback function */}
                <HeaderOption
                    Icon={ThumbUpOutlinedIcon}
                    title='Like'
                    callback={likePost}
                    color={post?.likes.includes(auth?.currentUser?.uid) && 'blue'}
                />
                {/* Add comment option with a callback function */}
                <HeaderOption Icon={ChatOutlinedIcon} title='Comment' callback={addComment} />
                <HeaderOption Icon={RepeatOutlinedIcon} title='Repost' />
                <HeaderOption Icon={SendOutlinedIcon} title='Send' />
            </div>
            {/* Render comment input field and comments */}
            {showCommentInput && (
                <>
                    <div className='add__comment'>
                        <a href='#'>
                            <img src={Avatar} alt='Comment Avatar' />
                        </a>
                        <form onSubmit={commentPost}>
                            <input
                                type='text'
                                name='comment'
                                placeholder='Add a comment...'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            {/* Show the "Post" button if comment is not empty */}
                            {comment && <input type='submit' value='Post' />}
                        </form>
                    </div>
                    <div className='comments'>
                        {post.comments.map((com, i) => (
                            <Comment key={i} comment={com} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Post;
