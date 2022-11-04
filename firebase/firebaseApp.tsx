// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSpAelwOlpvItdxxvUS2ba293Xqb0EAkc",
  authDomain: "hackatonmorganstanley2022.firebaseapp.com",
  projectId: "hackatonmorganstanley2022",
  storageBucket: "hackatonmorganstanley2022.appspot.com",
  messagingSenderId: "452818611453",
  appId: "1:452818611453:web:933f5b46fca7ac61e7a294"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}