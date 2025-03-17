import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, DEFAULT_USER_AVATAR } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubsribe();
  }, []);
  return (
    <div className="absolute w-full flex justify-between px-8 py-4 bg-gradient-to-b from-black z-10 text-white">
      <img className="w-28 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex">
          <img
            src={user?.photoURL || DEFAULT_USER_AVATAR}
            alt="user-icon"
            className="w-12 h-12"
          />
          <button
            onClick={handleSignOut}
            className="bg-red-500 font-bold text-white"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
