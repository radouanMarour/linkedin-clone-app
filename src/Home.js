import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'
import Header from './Header';
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Home() {
    const user = useSelector(state => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <>
            <Header />
            <div className='app__body'>
                <Sidebar />
                <Feed />
                <Widgets />
            </div>
        </>
    )
}

export default Home