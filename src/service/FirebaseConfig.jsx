// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpagx7ILDWvlu3dV3dYQ0GUDdmWHTtets",
  authDomain: "ai-trip-planner-86b50.firebaseapp.com",
  projectId: "ai-trip-planner-86b50",
  storageBucket: "ai-trip-planner-86b50.firebasestorage.app",
  messagingSenderId: "94842951249",
  appId: "1:94842951249:web:499098673a5d0120fa0a70",
  measurementId: "G-0GFGKJEP3Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);//exporetd so that we can use this throiiughout application


// const analytics = getAnalytics(app);