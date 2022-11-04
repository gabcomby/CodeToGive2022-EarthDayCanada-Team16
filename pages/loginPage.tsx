import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import {getAuth} from "firebase/auth";
import { initFirebase } from "../firebase/firebaseApp";


export default function Home() {
    initFirebase();
    const auth = getAuth();
    const[user, loading] = useAuthState(auth);
    const currentUser = auth.currentUser;
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!user) {
        router.push('./');
    }

    if (currentUser !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = currentUser.displayName;
      const email = currentUser.email;
      const photoURL = currentUser.photoURL;
      const emailVerified = currentUser.emailVerified;
      
      return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h1>Hello {displayName}, it's good to see you!</h1>
        </div>

        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <button  style={{alignItems:'center', justifyContent:'center'}} type="button" onClick={() => auth.signOut()}> Disconnect </button>
        </div>
      </div>
      )
    }
}
