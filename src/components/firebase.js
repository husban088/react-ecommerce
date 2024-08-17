// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVPAQoxLx6VhkHTzt2BT936aPB7z74iRg",
  authDomain: "fitness-wear-ba14e.firebaseapp.com",
  projectId: "fitness-wear-ba14e",
  storageBucket: "fitness-wear-ba14e.appspot.com",
  messagingSenderId: "678903643183",
  appId: "1:678903643183:web:b53f65a425055cffec1ada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db=getFirestore(app);

const provider = new FacebookAuthProvider();

const providers = new GoogleAuthProvider();

export {auth, provider, providers}
