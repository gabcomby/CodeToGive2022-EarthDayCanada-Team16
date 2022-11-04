import type { NextPage } from "next";
//import { initFirebase } from "../firebase/firebaseApp";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import {getAuth} from "firebase/auth";


export default function Home() {
    const auth = getAuth();
    const[user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!user) {
        router.push('./');
    }

  return (
    <div>
      <h1>User logged in</h1>
      <button  style={{alignItems:'center'}} type="button" onClick={() => auth.signOut()}> Disconnect </button>
    </div>
  )
}
