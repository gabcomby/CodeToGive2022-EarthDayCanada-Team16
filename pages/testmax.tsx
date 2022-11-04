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
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Account settings</div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <button  style={{alignItems:'center'}} type="button" onClick={() => router.push('/')}> Disconnect </button>
        </div>
        <form action="/send-data-here" method="post">
            <label htmlFor="first">First name:</label>
            <input type="text" id="first" name="first" />
            <label htmlFor="last">Last name:</label>
            <input type="text" id="last" name="last" />
            <button type="submit">Submit</button>
        </form>
      </div>
  )
}
