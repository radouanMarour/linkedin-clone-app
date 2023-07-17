import React, { useState } from 'react'
import './Login.css'
import LinkedinLogo from './img/Linkedin-Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './authService';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
        navigate("/");
    }

    return (
        <div className='login'>
            <header>
                <img src={LinkedinLogo} alt="" />
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <p>Stay updated on your professional world</p>
                <input
                    type="text"
                    name="email"
                    placeholder='Email or Phone'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} s
                />
                <input type="submit" value="Sign in" />
                <div className='separator'>
                    <span>or</span>
                    <p>New to LinkedIn? <Link to="/sign-up">Join now</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login