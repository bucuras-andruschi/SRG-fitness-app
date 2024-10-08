import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import './signup.css'

const Register = () => {

    const navigate = useNavigate()
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        const errors = getSignupFormErrors(firstname, email, password, confirmPassword);
        if (errors.length > 0) {
            setErrorMessage(errors.join('. '))
        }else {
            setErrorMessage('');
            if(!isRegistering) {
            setIsRegistering(true)
                try {
                    await doCreateUserWithEmailAndPassword(email, password)
                } catch (error) {
                    if(error.code==='auth/email-already-in-use'){
                        setErrorMessage('Email already in use')
                    }
                    setIsRegistering(false)
                }
            }
        }
    }

const getSignupFormErrors = (firstname, email, password, confirmPassword) => {
    let errors=[]
    if (firstname===''|| firstname===null) errors.push('Firstname is required');
    if (email===''|| email===null) errors.push('Email is required');
    if (password===''|| password===null) errors.push('Password is required');
    if (password.length<8) errors.push('Password must have at least 8 characters');
    if (password!==confirmPassword) errors.push('Passwords do not match');
    return errors;
}

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

                <div className='wrapper'>
                    <h1>Sign up for SRG</h1>
                    <div1>Steady, ready, GO!</div1>
                    <p id='error-message'>{errorMessage}</p>
                    <form
                        id='form'
                        onSubmit={onSubmit}
                    >
                        <div>
                            <label htmlFor="firstname-input">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
                                </svg>
                            </label>
                            <input className='input' type="text" name='firstname' id='firstname-input' placeholder='First name' value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="email-input">
                                <span>@</span>
                            </label>
                            <input
                                className='input'
                                type="email"
                                name='email'
                                id='email-input'
                                placeholder='Email'
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>

                        <div>
                            <label htmlFor="password-input">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                                </svg>
                            </label>
                            <input
                                className='input'
                                disabled={isRegistering}
                                type="password"
                                name='password'
                                id='password-input'
                                placeholder='Password'
                                value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            />
                        </div>

                        <div>
                            <label htmlFor="repeat-password-input">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                                </svg>
                            </label>
                            <input
                                className='input'
                                disabled={isRegistering}
                                type="password"
                                name='repeat-password'
                                id='repeat-password-input'
                                placeholder='Repeat Password'
                                value={confirmPassword} onChange={(e) => {
                                setconfirmPassword(e.target.value)
                            }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div >
                            Already getting healthy with us?
                            <Link to='/login' > Log in</Link>
                        </div>
                    </form>
                </div>
        </>
    )
}

export default Register