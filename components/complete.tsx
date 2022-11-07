import Link from "next/link"
import styles from "../styles/nav-bar.module.css"

export default function Complete() {

    return (
        <Link className={styles.big} href = {"/loginPage"}> 
            Please complete your registration before accessing this page
        </Link>
    )
}

export {}