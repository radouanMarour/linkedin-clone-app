import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import ErrorPage from './ErrorPage';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setLoading(true)
      }
    });
    return () => unsubscribe();
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PrivateRoute user={user}><Home loading={loading} /></PrivateRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
