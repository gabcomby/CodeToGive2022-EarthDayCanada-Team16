import Link from "next/link"
import styles from "../styles/nav-bar.module.css"

export default function navElement(params: {name: string, href: string}) {

    return (
        <Link href = {params.href} legacyBehavior> 
            <a className={styles.nav__link}>{params.name}</a>
        </Link>
    )
}

export {}