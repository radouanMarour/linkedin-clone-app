import React, { useState } from 'react'
import './EditProfile.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { setUser } from '../redux/slices/authSlice';


function EditProfile({ setShowEdit }) {
    const userInfo = useSelector(state => state.auth.user);
    const [fname, setFname] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [headline, setHeadline] = useState(userInfo.headline);
    const [about, setAbout] = useState(userInfo.about);
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const userRef = doc(db, 'users', auth.currentUser.uid);

        await updateDoc(userRef, {
            fName: fname,
            email: email,
            headline: headline,
            about: about
        });

        const userData = {
            uid: userInfo.uid,
            name: fname,
            email: email,
            headline: headline,
            about: about,
            photoUrl: userRef.photoUrl
        }
        dispatch(setUser(userData));
        setShowEdit(false)
    }
    return (
        <div className='edit__profile'>
            <div className='edit'>
                <span className='close__icon' onClick={() => setShowEdit(false)}>
                    <CloseOutlinedIcon />
                </span>
                <p>Edit info</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='fname'>Full Name</label>
                    <input type="text" name="fname" value={fname} onChange={e => setFname(e.target.value)} />
                    <label htmlFor='email'>Email</label>
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor='headline'>Headline</label>
                    <input type="text" name="headline" value={headline} onChange={e => setHeadline(e.target.value)} />
                    <label htmlFor='about'>About</label>
                    <textarea cols={10} rows={5} value={about} onChange={e => setAbout(e.target.value)}></textarea>
                    <input type="submit" value="Save" />
                </form>
            </div>
        </div>
    )
}

export default EditProfile