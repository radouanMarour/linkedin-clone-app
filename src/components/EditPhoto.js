import React, { useState } from 'react'
import './EditPhoto.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../img/avatar.png';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { setUser } from '../redux/slices/authSlice';


function EditPhoto({ setShowEditPhoto }) {
    const [imgUrl, setImgUrl] = useState("");
    const [progresspercent, setProgresspercent] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const storage = getStorage();

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setImgUrl(downloadURL)
                    await updateProfile(auth.currentUser.user, { imageUrl: downloadURL });

                    const userRef = doc(db, 'users', auth.currentUser.uid);
                    await updateDoc(userRef, { photoUrl: downloadURL });
                    dispatch(setUser({
                        ...user,
                        photoUrl: downloadURL
                    }));
                });
            }
        );
    }

    return (
        <div className='edit__photo'>
            <div className='edit'>
                <span className='close__icon' onClick={() => setShowEditPhoto(false)}>
                    <CloseOutlinedIcon />
                </span>
                <p>Edit photo</p>
                <img className='profile__avatar' src={imgUrl ? imgUrl : user.photoUrl} alt="" />

                <form onSubmit={handleSubmit}>
                    <input type="file" name="photo" />
                    <button type='submit' >Change Photo {progresspercent}</button>
                </form>

            </div>
        </div>
    )
}

export default EditPhoto