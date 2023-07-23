import React, { useEffect, useState } from 'react';
import './Widgets.css';
import Avatar from './img/avatar.png';
import AddIcon from '@mui/icons-material/Add';
import { auth, db } from './firebase';
import { collection, getDocs, query, where, limit, arrayUnion, updateDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function Widgets() {
    // State to store the list of users to follow
    const [users, setUsers] = useState([]);

    // Get the current user from the Redux store
    const user = useSelector((state) => state.auth.user);

    // Fetch users to display in the feed
    const fetchUsers = async () => {
        try {
            if (user?.uid) {
                // Create a Firestore query to get users whose uid is not equal to the current user's uid, with a limit of 3 users
                const q = query(collection(db, 'users'), where('uid', '!=', user.uid), limit(3));
                const { docs } = await getDocs(q);

                // Update the state with the fetched users' data
                setUsers(docs.map((doc) => doc.data()));
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while fetching users data');
        }
    };

    // Fetch users data when the component mounts or the user changes
    useEffect(() => {
        fetchUsers();
    }, [user]);

    // Function to follow a user
    const follow = async (userId) => {
        const userRef = doc(db, 'users', userId);

        // Update the Firestore document to add the current user to the followers array of the selected user
        await updateDoc(userRef, {
            followers: arrayUnion(auth.currentUser.uid),
        });

        // Update the state to reflect the updated user data
        setUsers((prev) => {
            return prev.map((u) => {
                if (u.uid === userId) {
                    return {
                        ...u,
                        followers: [...u.followers, auth.currentUser.uid],
                    };
                } else {
                    return u;
                }
            });
        });
    };

    return (
        <div className='widgets'>
            <h3>Add to your feed</h3>
            {users.length > 0 &&
                users.map((user) =>
                    user.followers.indexOf(auth.currentUser.uid) === -1 ? (
                        // Render the user information and follow button for users who are not followed yet
                        <div className='user' key={user.uid}>
                            <img src={user.photoUrl ? user.photoUrl : Avatar} alt='' />
                            <div className='user__info'>
                                <p className='user__name'>{user.fName}</p>
                                <p className='user__desc'>{user.headline}</p>
                                <button className='follow__btn' onClick={() => follow(user.uid)}>
                                    <AddIcon /> <span>Follow</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Render nothing for users who are already followed
                        null
                    )
                )}
        </div>
    );
}

export default Widgets;
