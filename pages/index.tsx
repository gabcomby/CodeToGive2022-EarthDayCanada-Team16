import type { NextPage } from "next";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { initFirebase } from "../firebase/firebaseApp";

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
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Please sign in to continue</div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <button style={{alignItems:'center'}} onClick={signIn}>Sign In</button>
        </div>
      </div>
  )
}
