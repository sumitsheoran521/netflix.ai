// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApqMTB7zY6Wmxu2dUmMR3QMQLsYtdvI_8",
  authDomain: "netflix-b69da.firebaseapp.com",
  projectId: "netflix-b69da",
  storageBucket: "netflix-b69da.firebasestorage.app",
  messagingSenderId: "743971723107",
  appId: "1:743971723107:web:cc703157ba492bfc91e556",
  measurementId: "G-BK1LPP6DPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();