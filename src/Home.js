import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'
import Header from './Header';
import Loading from './components/Loading';

function Home({ loading }) {

    if (loading) {
        return <Loading />
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