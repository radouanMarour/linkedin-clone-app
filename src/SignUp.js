import React, { useState } from 'react'
import './SignUp.css'
import LinkedinLogo from './img/Linkedin-Logo.png';
import { Link } from 'react-router-dom';
import { signUp } from './authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signUp(fname, email, password));
        navigate("/login");
    }

    return (
        <div className='signup'>
            <header>
                <img src={LinkedinLogo} alt="" />
            </header>
            <p>Make the most of your professional life</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='fname'>Full Name</label>
                <input type="text" name="fname" value={fname} onChange={e => setFname(e.target.value)} />
                <label htmlFor='email'>Email</label>
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor='password'>Password (6+ characters)</label>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Agree & Join" />
                <div className='separator'>
                    <span>or</span>
                    <p>Already on LinkedIn? <Link to="/login">Sign in</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp