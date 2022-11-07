import Link from "next/link"
import Image from "next/image"
import NavElement from "./nav-element"
import styles from "../styles/nav-bar.module.css"
import logo from "../images/image.png"
import { useContext } from "react"
import AuthContext from "../stores/authContext"
import { useRouter } from "next/router";
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';
import clientPromise from "../lib/mongodb";

export default function TopBar(props: {type: string}) {

    console.log(props.type)
    const { signOut } = useClerk()
    
    const router = useRouter()

    const NAV_ELEMENTS = [
        {name: "Home", href: "/"},
        {name: "Offers", href: "/offers"},
        {name: "Events", href: "/events"},
        {name: "Login/Sign Up", href: "/authpage"}
    ]

    const handleSignOut = async() =>{
        signOut()
        router.push('/')
      }

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <nav className={styles.main_nav}>
                        <Link href={"/"} >
                        <Image src={logo} alt="Gleanathon" width={240} height={48} className={styles.logo_2}></Image>
                        </Link>

                        <div className={styles.element_container}>
                            
                            <NavElement name={NAV_ELEMENTS[0].name} href={NAV_ELEMENTS[0].href}></NavElement>
                            {props.type === "Gleaners" ? <NavElement name={NAV_ELEMENTS[2].name} href={NAV_ELEMENTS[2].href}></NavElement> : <></>}
                            {props.type === "Farmers" ? <><NavElement name={NAV_ELEMENTS[2].name} href={NAV_ELEMENTS[2].href}></NavElement> <Link href="/profile" className={styles.nav__link}>My events</Link></> : <></>}
                            {props.type === "Orgs" ? <NavElement name={NAV_ELEMENTS[1].name} href={NAV_ELEMENTS[1].href}></NavElement> : <></>}
                            
                            {props.type === "None" ? (
                                <NavElement name={"Signup/Login"} href={"/loginPage"}></NavElement>
                            ) : <></>}

                            <SignedIn>
                                <a className={styles.nav__link} onClick={() => handleSignOut()}>Logout</a>
                            </SignedIn>
                        </div>
                    </nav>
                </header>
            </div>
            <div className={styles.offset}></div>
        </>

    )

}
