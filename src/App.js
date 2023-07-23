import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import ErrorPage from './ErrorPage';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe();
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PrivateRoute user={user}><Home /></PrivateRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
