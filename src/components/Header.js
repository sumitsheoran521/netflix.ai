import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import {
  LOGO,
  DEFAULT_USER_AVATAR,
  SUPPORTED_LANGUAGES,
} from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleGptSearchClick = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full flex justify-between px-8 py-4 bg-gradient-to-b from-black z-10 text-white">
      <img className="w-28 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.identifier}>{lang.language}</option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "GPT Search" : "Home"}
          </button>
          <img
            src={user?.photoURL || DEFAULT_USER_AVATAR}
            alt="user-icon"
            className="w-12 h-12"
          />
          <button
            onClick={handleSignOut}
            className="bg-red-500 font-bold py-2 px-4 my-2 text-white"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
