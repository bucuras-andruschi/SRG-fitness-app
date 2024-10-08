import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'
import './login.css'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const errors = getLoginFormErrors(email, password)
        if (errors.length > 0) {
            setErrorMessage(errors.join('. '));
        } else {
            if (!isSigningIn) {
                setIsSigningIn(true)
                try {
                    await doSignInWithEmailAndPassword(email, password)
                    // doSendEmailVerification()
                } catch(error) {
                    setErrorMessage('Wrong credentials, or you signed in with google.')
                    setIsSigningIn(false)
                }
            }
        }
    }

    const getLoginFormErrors = (email, password) => {
        let errors = [];
        if (email === '' || email == null) errors.push('Email is required');
        if (password === '' || password == null) errors.push('Password is required');
        return errors;
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div className='wrapper'>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div>
                <h1>Log in to SRG</h1>
                <div1>Steady, ready, GO!</div1>
                <p id='error-message'>{errorMessage}</p>
                <form
                    id='form'
                    onSubmit={onSubmit}
                >
                    <div>
                        <label htmlFor='email-input'>
                            <span>@</span>
                        </label>
                        <input
                            className='input'
                            type="email"
                            name='email'
                            id='email-input'
                            placeholder='Email'
                            value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        />
                    </div>

                    <div>
                        <label>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path
                                    d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                            </svg>
                        </label>
                        <input
                            className='input'
                            type="password"
                            name='password'
                            id='password-input'
                            placeholder='Password'
                            value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSigningIn}
                    >
                        {isSigningIn ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                <p>New to SRG? <Link to='/register'>Sign up</Link></p>
                    <div>OR</div>
                <button
                    id='google-signin-button'
                    disabled={isSigningIn}
                    onClick={(e) => {
                        onGoogleSignIn(e)
                    }}
                    className={`google-signin-button ${isSigningIn ? 'cursor-not-allowed' : ''}`}
                >
                        <g clipPath="url(#clip0_17_40)">
                            <path
                                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                fill="#4285F4"/>
                            <path
                                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                fill="#34A853"/>
                            <path
                                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                fill="#FBBC04"/>
                            <path
                                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                fill="#EA4335"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white"/>
                            </clipPath>
                        </defs>
                    {isSigningIn ? 'Logging In...' : 'Continue with Google'}
                </button>
            </div>
        </div>
    )
}

export default Login