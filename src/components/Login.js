import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message)

        if (message) return;

        // signup/signin
        if (!isSignInForm) {
            // signup logic
            createUserWithEmailAndPassword(auth,
                email.current.value,
                password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "https://avatars.githubusercontent.com/u/103477560?v=4"
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL
                                })
                            );
                            navigate("/browse")
                        })
                        .catch((error) => {
                            setErrorMessage(error.message)
                        });
                    navigate("/browse")
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    navigate("/")
                    setErrorMessage(errorCode + " : " + errorMessage)
                }).then(() => {
                    navigate("/browse")
                })
        }
        else {
            // signin logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);

                    navigate("/browse");
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    navigate("/")
                    setErrorMessage(errorCode + " : " + errorMessage)
                })
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg'
                    alt='banner' />
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
            }} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1
                    className='font-bold text-3xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && <input
                    type='text'
                    placeholder='Full Name'
                    className='p-4 my-2 w-full bg-gray-700'
                    ref={name}
                />}
                <input
                    type='text'
                    placeholder='Email Address'
                    className='p-4 my-2 w-full bg-gray-700'
                    ref={email} />
                <input
                    type='password'
                    placeholder='Password'
                    className='p-4 my-2 w-full  bg-gray-700'
                    ref={password} />

                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button
                    className='p-4 my-6 bg-red-700 w-full rounded-lg'
                    onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className='py-4 cursor-pointer'
                    onClick={toggleSignInForm}>
                    New to Netflix? Sign up now.
                </p>
            </form>
        </div>
    )
}

export default Login