import React from 'react'
import image from "../utils/images/netflix-profile-pictures.jpg"
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/")
            }).catch((error) => {
                navigate("/error");
            });
    }
    return (

        <div className='absolute w-full flex justify-between px-8 py-4 bg-gradient-to-b from-black z-10 text-white'>
            <img className='w-28 '
                src='https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460'
                alt='logo' />
            {
                user && (
                    <div className='flex'>
                        <img src={user?.photoURL || image} alt='user-icon' className='w-12 h-12' />
                        <button onClick={handleSignOut} className='bg-red-500 font-bold text-white'>Sign out</button>
                    </div>
                )
            }
        </div>
    )
}

export default Header