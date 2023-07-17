import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import ErrorPage from './ErrorPage';
import Profile from './Profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
