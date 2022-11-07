import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import TopBar from '../components/topbar';
import Footer from '../components/footer';
import Image from "next/image"
import styles from "../styles/home-page.module.css"
import logo from "../images/GLEANATHON_green_600px.png"
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';
import clientPromise from "../lib/mongodb";


export default function HomePage(props: {gleaners: string[], farmers: string[], orgs: string[]}) {
    const SCORE = 723456
    const OBJECTIVE = 1000000

    const { isSignedIn, user } = useUser()
    const EMAIL = user ? user.primaryEmailAddressId : ""
    let type = "None"
    if (props.gleaners.includes(EMAIL || "")) {
        type = "Gleaners"
    } else if (props.farmers.includes(EMAIL || "")) {
        type = "Farmers"
    } else if (props.orgs.includes(EMAIL || "")) {
        type = "Orgs"
    } 

    return (
    <>
        <div className={styles.container}>
            <Head>
                <title>Gleanathon</title>
            </Head>
            <TopBar {...{type}}></TopBar>

            <div className={styles.back}>
                <div className={styles.title_logo_container}>
                    <Image src={logo} alt="Gleanathon" width={600} height={118} className={styles.title_logo}>

                    </Image>
                </div>

                <div className={styles.motto_container}>
                    <div className={styles.motto_p}>
                        Waste less.
                    </div>
                    <div className={styles.motto_p}>
                        Glean more.
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.container_2}>
            <div className={styles.why_container}>
                <div className={styles.why_title}>
                    <h1>WHY GLEAN ?</h1>
                </div>
                <div className={styles.why_p}>
                    <div className={styles.line}>
                        <h4 className={styles.left}>FIGHT FOOD WASTE</h4>
                        <h4 className={styles.right}>HELP LOCAL FARMERS</h4>
                    </div>
                    <div className={styles.line}>
                        <h4 className={styles.left}>SUPPORT FOOD BANKS IN YOUR AREA</h4>
                        <h4 className={styles.right}>HAVE A GREAT TIME TOGETHER</h4>
                    </div>
                </div>
                <div className={styles.why_footer}>
                    <div className={styles.first_line}>
                        <h2 className={styles.h2}>SO WE CREATED THE </h2>
                        <Image src={logo} alt="Gleanathon" width={360} height={72} className={styles.logo_2}></Image>
                    </div>
                    <h5>A fun team building activity with <a className={styles.colored}>environmental</a> and <a className={styles.colored}>social</a> benefits</h5>
                </div>
            </div>
        </div>
        <div className={styles.counter_container}>
            <h2>Together, we saved</h2>
            <h1>{SCORE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h1>
            <h5>{OBJECTIVE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h5>
            <div className={styles.progress_bar}>
                <div className={styles.bar} style={{width: (Math.round((SCORE/OBJECTIVE)*100)) + "%"}}></div>
            </div>
            <h2>FRUITS AND VEGETABLES</h2>
        </div>
        <Footer></Footer>
    </>
    );
}


export async function getServerSideProps() {
    
    const EMAIL = ""
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const farmers = await db
            .collection("farmers")
            .find({})
            .toArray()

        const gleaners = await db
            .collection("gleaners")
            .find({})
            .toArray()

        const orgs = await db
            .collection("orgs")
            .find({})
            .toArray()

        const events = await db
            .collection("eventtts")
            .find({})
            .limit(10)
            .toArray()
        return {
            props: { events: JSON.parse(JSON.stringify(events)), gleaners: JSON.parse(JSON.stringify(gleaners)).map((x: any) => x.email), farmers: JSON.parse(JSON.stringify(farmers)).map((x: any) => x.email), orgs: JSON.parse(JSON.stringify(orgs)).map((x: any) => x.email) },
        };
    } catch (e) {
        console.error(e);
    }
}