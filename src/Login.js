import React, { useState } from 'react';
import './Login.css';
import LinkedinLogo from './img/Linkedin-Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authService';
import { auth } from './firebase';
// import { clearUser } from './redux/slices/authSlice';

function Login() {
    const navigate = useNavigate();
    // State to manage email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const error = useSelector(state => state.auth.error);

    // Create dispatcher to trigger the login action
    const dispatch = useDispatch();

    if (auth.currentUser) {
        navigate("/");
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch the login action with the entered email and password
        dispatch(login(email, password));

        // After successful login, navigate to the home page
        navigate('/');
    };

    return (
        <div className='login'>
            {/* Header with LinkedIn logo */}
            <header>
                <img src={LinkedinLogo} alt='LinkedIn Logo' />
            </header>
            {/* Login form */}
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <p>Stay updated on your professional world</p>
                <p className='error__message'>{error ? error : ""}</p>
                <input
                    type='text'
                    name='email'
                    placeholder='Email or Phone'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type='submit' value='Sign in' />
                <div className='separator'>
                    <span>or</span>
                    {/* Link to the sign-up page */}
                    <p>
                        New to LinkedIn? <Link to='/sign-up'>Join now</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
