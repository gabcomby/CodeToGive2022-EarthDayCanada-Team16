// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXoP5cp34JlXdlGmokGtU1r4f3qptf0Oo",
  authDomain: "gleanathon.firebaseapp.com",
  projectId: "gleanathon",
  storageBucket: "gleanathon.appspot.com",
  messagingSenderId: "865727851264",
  appId: "1:865727851264:web:080ee0bc52730e710461e5",
  measurementId: "G-0HXFB94C83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);