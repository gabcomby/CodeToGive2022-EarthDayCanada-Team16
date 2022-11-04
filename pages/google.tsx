import type { NextPage } from "next";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { initFirebase } from "../firebase/firebaseApp";
import { FormEvent, useState } from "react";
import React from "react";

export default function Home() {
initFirebase();
const provider = new GoogleAuthProvider();
const auth = getAuth();
const[user, loading] = useAuthState(auth);
const router = useRouter();

if (loading) {
  return <div>Loading...</div>;
}

if(user) {
  router.push('./loginPage');
}

const signIn = async() =>{
  const result = await signInWithPopup(auth, provider)
}

return (
  <div style={{display:'flex', flexDirection:'column'}}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <h1>Please Sign In With Your Google Account</h1>
    </div>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <button style={{alignItems:'center', margin:15}} onClick={signIn}>Sign In With Google</button>
    </div>
  </div>
)
}
