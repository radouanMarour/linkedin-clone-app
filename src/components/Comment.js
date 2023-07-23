import React, { useEffect, useState } from 'react';
import Avatar from '../img/avatar.png';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import './Comment.css'

function Comment({ comment }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const userRef = doc(db, "users", comment.userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setUser(userSnap.data());
            }
        }
        getUser();
    }, [comment.userId])

    return (
        <div className='comment'>
            <img src={user?.photoUrl ? user?.photoUrl : Avatar} alt="" />
            <div className='user__info'>
                <p className='user__name'>{user?.fName}</p>
                <p className='user__desc'>{user?.headline}</p>
                <p>{comment.body}</p>
            </div>
        </div>
    )
}

export default Comment