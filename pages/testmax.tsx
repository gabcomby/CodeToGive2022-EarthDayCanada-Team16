import Link from 'next/link';
import type { NextPage } from "next";
//import { initFirebase } from "../firebase/firebaseApp";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";


export default function Home() {
    const router = useRouter()
  return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Please sign in to continue</div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <button  style={{alignItems:'center'}} type="button" onClick={() => router.push('/')}> Disconnect </button>
        </div>
      </div>
  )
}
