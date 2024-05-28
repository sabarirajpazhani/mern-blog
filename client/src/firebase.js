// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-51883.firebaseapp.com",
  projectId: "mern-project-51883",
  storageBucket: "mern-project-51883.appspot.com",
  messagingSenderId: "509624949742",
  appId: "1:509624949742:web:7e74fa68f49b6ba2450cff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
