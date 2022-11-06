import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import SignUpForm from "../firebase/fireBaseApp2"

export default function Auth() {
    // return(
    //     <ClerkProvider appearance={{
    //         variables: {
    //             colorPrimary: '#298273',
    //             fontFamily: "Century gothic"
    //         }
    //     }}>
    //         <SignedIn>
    //             <UserButton />
    //         </SignedIn>
    //         <SignedOut>
    //             <SignIn />
    //         </SignedOut>
    //     </ClerkProvider>
    // )

    return(
        <ClerkProvider appearance={{
            variables: {
                colorPrimary: '#298273',
                fontFamily: "Century gothic"
            }
        }}>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignUpForm />
            </SignedOut>
        </ClerkProvider>
    )
}