import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'
import Header from './Header';
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Home() {
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