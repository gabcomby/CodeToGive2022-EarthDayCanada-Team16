import Link from "next/link"
import Image from "next/image"
import NavElement from "./nav-element"
import styles from "../styles/nav-bar.module.css"
import logo from "../images/image.png"
import { useContext } from "react"
import AuthContext from "../stores/authContext"

export default function TopBar (){
    const user = useContext(AuthContext)
    console.log(user)
    
    const NAV_ELEMENTS = [
        {name: "Home", href: "/"},
        {name: "Offers", href: "/offers"},
        {name: "Events", href: "/events"},
        {name: "Login/Sign Up", href: "/authpage"}
    ]

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <nav className={styles.main_nav}>
                        <Link href={"/"} >
                        <Image src={logo} alt="Gleanathon" width={240} height={48} className={styles.logo_2}></Image>
                        </Link>
                        <div className={styles.element_container}>
                            {NAV_ELEMENTS.map((x: {name: string, href: string}, i: number) => (
                                <NavElement {...x} key={i}></NavElement>
                            ))}
                        </div>
                    </nav>
                </header>
            </div>
            <div className={styles.offset}></div>
        </>

    )
}