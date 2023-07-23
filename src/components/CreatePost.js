import React, { useState } from 'react';
import './CreatePost.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Avatar from '../img/avatar.png';

function CreatePost({ setShowCreate, setPosts }) {
    // Get the current user from the Redux store
    const user = useSelector((state) => state.auth.user);

    // State to track the user's post message and image upload progress
    const [message, setMessage] = useState('');
    const [progresspercent, setProgresspercent] = useState(0);

    // Firebase storage instance
    const storage = getStorage();

    // Function to handle form submission when creating a new post
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the uploaded image file (if any)
        const file = e.target.elements.image.files[0];

        if (file) {
            // Create a reference to the Firebase storage for the uploaded image
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Update the upload progress while the image is being uploaded
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                async () => {
                    // Get the download URL of the uploaded image
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Create a new post object with the user's data, message, and image URL
                    const newPost = {
                        userId: user.uid,
                        message: message,
                        likes: [],
                        comments: [],
                        photoUrl: downloadURL,
                        timestamp: Date.now(),
                    };

                    // Add the new post to the Firestore database
                    const doc = await addDoc(collection(db, 'posts'), newPost);

                    // Update the local state with the new post and sort the posts by timestamp
                    setPosts((prev) => [...prev, { ...newPost, id: doc.id }].sort((a, b) => b.timestamp - a.timestamp));

                    // Close the create post dialog
                    setShowCreate(false);
                }
            );
        } else {
            // Create a new post object without an image URL
            const newPost = {
                userId: user.uid,
                message: message,
                likes: [],
                comments: [],
                photoUrl: '',
                timestamp: Date.now(),
            };

            // Add the new post to the Firestore database
            const doc = await addDoc(collection(db, 'posts'), newPost);

            // Update the local state with the new post and sort the posts by timestamp
            setPosts((prev) => [...prev, { ...newPost, id: doc.id }].sort((a, b) => b.timestamp - a.timestamp));

            // Close the create post dialog
            setShowCreate(false);
        }
    };

    return (
        <div className='create__post'>
            <div className='create'>
                {/* Close icon to hide the create post dialog */}
                <span className='close__icon' onClick={() => setShowCreate(false)}>
                    <CloseOutlinedIcon />
                </span>
                <div className='user__options__info'>
                    {/* User avatar and info */}
                    <img src={user?.photoUrl ? user?.photoUrl : Avatar} alt='' />
                    <div className='user__info'>
                        <p className='user__name'>{user?.name}</p>
                        <p className='user__desc'>{user?.headline}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Textarea for entering the post message */}
                    <textarea
                        cols={10}
                        rows={10}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='What do you want to talk about?'
                    ></textarea>

                    {/* Label and input field for uploading an image */}
                    <label htmlFor='image'>
                        <p>Add a photo</p>
                        <PanoramaIcon />
                    </label>
                    <input type='file' name='image' id='image' hidden />

                    {/* Submit button to create the post */}
                    <input type='submit' value='Post' disabled={!message} />
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
