import React, { useState } from 'react';
import './Profile.css';
import Bg from './img/bg.png';
import Avatar from './img/avatar.png';
import Header from './Header';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import EditProfile from './components/EditProfile';
import EditPhoto from './components/EditPhoto';
import { useSelector } from 'react-redux';

function Profile() {
    // State to control the visibility of the edit profile modal
    const [showEdit, setShowEdit] = useState(false);

    // State to control the visibility of the edit photo modal
    const [showEditPhoto, setShowEditPhoto] = useState(false);

    // Get the user data from the Redux store
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            {/* Render the header */}
            <Header />
            <div className='profile'>
                <div className='profile__top'>
                    {/* Render the cover photo */}
                    <img className='profile__cover' src={Bg} alt='Cover' />

                    {/* Render the avatar and attach click handler to open the edit photo modal */}
                    <img
                        className='profile__avatar'
                        src={user?.photoUrl ? user?.photoUrl : Avatar}
                        alt='Avatar'
                        onClick={() => setShowEditPhoto(true)}
                    />

                    {/* Render the user's name and headline */}
                    <p className='profile__name'>{user?.name}</p>
                    <p className='profile__title'>{user?.headline}</p>

                    {/* Render the edit icon and attach click handler to open the edit profile modal */}
                    <span className='create__icon' onClick={() => setShowEdit(true)}>
                        <CreateOutlinedIcon />
                    </span>

                    {/* Render the edit profile and edit photo modals conditionally */}
                    {showEdit && <EditProfile setShowEdit={setShowEdit} />}
                    {showEditPhoto && <EditPhoto setShowEditPhoto={setShowEditPhoto} />}
                </div>

                <div className='profile__bottom'>
                    {/* Render the "About" section */}
                    <h3>About</h3>
                    <p>{user?.about}</p>
                </div>
            </div>
        </>
    );
}

export default Profile;
