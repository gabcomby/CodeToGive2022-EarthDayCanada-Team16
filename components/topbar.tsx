import Link from "next/link"
import Image from "next/image"
import NavElement from "./nav-element"
import styles from "../styles/nav-bar.module.css"
import logo from "../images/image.png"
import { useRouter } from "next/router"
import { edgeConfig } from "@ory/integrations/next"
import { signOut } from "next-auth/react"
import { signIn, useSession } from "next-auth/react"

export default function TopBar (){
    const router = useRouter()

    const NAV_ELEMENTS = [
        {name: "Home", href: "/"},
        {name: "Offers", href: "/offers"},
        {name: "Events", href: "/events"},
        //{name: "Login/Sign Up", href: edgeConfig.basePath + "/ui/login"}
        {name: "Login/Sign Up", href: "/api/auth/signin"}
    ]

    /*const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )*/

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
                            button
                        </div>
                    </nav>
                </header>
            </div>
            <div className={styles.offset}></div>
        </>
        
        )
}