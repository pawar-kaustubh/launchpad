// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-15cd5.firebaseapp.com",
  databaseURL: "https://mern-estate-15cd5-default-rtdb.firebaseio.com",
  projectId: "mern-estate-15cd5",
  storageBucket: "mern-estate-15cd5.appspot.com",
  messagingSenderId: "100174009507",
  appId: "1:100174009507:web:4e924b3d6d8fe8eac1db16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);