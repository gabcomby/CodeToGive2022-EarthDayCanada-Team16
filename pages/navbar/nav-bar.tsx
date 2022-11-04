import Link from "next/link"
import Image from "next/image"
import NavElement from "./nav-element"
import styles from "../../styles/nav-bar.module.css"


const NAV_ELEMENTS = [
    {name: "Home", href: "/"},
    {name: "About", href: "/about"},
    {name: "Dashboard", href: "/dash"},
    {name: "Login", href: "/login"}
]

function Navbar() {
    return (
    <div className={styles.container}>   
        <header className={styles.header}>
            <nav className={styles.main_nav}>
                <Link href={"/"}>
                    <h1 className={styles.logo}>LOGO</h1>
                </Link>
            
                <div className={styles.element_container}>
                    {NAV_ELEMENTS.map((x: {name: string, href: string}, i: number) => (
                        <NavElement {...x}></NavElement>
                    ))}
                </div>
            </nav>
        </header>
    </div> 
    )
}

export default Navbar