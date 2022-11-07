import Head from 'next/head';
import TopBar from '../components/topbar';
import styles from '../styles/Dashboard.module.css';
import React from 'react';
import useCollapse from 'react-collapsed';
import Image from "next/image"
import location from "../images/address-3.png"
import clock from "../images/clock.png"
import {MDBRange} from 'mdb-react-ui-kit';
import {useState} from 'react'
import Footer from "../components/footer"
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';
import clientPromise from "../lib/mongodb";

interface OfferProps {
    farm_name: string;
    vegetable: string;
    vegetableEmoji: string;
    quantity: number;
    quantityUnit: string
    distance: string;
    description: string;
    address: string;
    dateRange: {min: Date, max: Date};
}

interface EventProps {
    name: string;
    vegetable: string;
    vegetableEmoji: string;
    capacity_min: number;
    capacity_max: number;
    distance: Number;
    distanceUnit: String;
    description: string;
    address: string;
    date_min: String;
    date_max: String;
    weight: number;
    weightUnit: string;
    email: string
    requests: {groupName: string, groupSize: string, profileUrl: string}[]
}

const submit = async (event:any) => {
    event.preventDefault();
    alert(event.target.range.value)
};


function Offer(props : EventProps) {
    return (
        <div className={styles.offer}>
            <h1>{props.name}</h1>
            <h5>{String(props.distance)} {props.distanceUnit} from you</h5>
            <div className={styles.row}>
                <div className={styles.col}>
                    <h4 className={styles.veg_emoji}>{props.vegetableEmoji}</h4>
                    <h4 className={styles.offer_quantity}>{props.vegetable}</h4>
                    <h4>Quantity: {props.weight}{props.weightUnit}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={location} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.address}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={clock} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.date_min.slice(0, 10)} - {props.date_max.slice(0, 10)}</h4>
                </div>
            </div>
            <div className={styles.third_row}>
                <Collapsible {...props}/>
            </div>
        </div>
    );
}



function Collapsible(props: EventProps){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const [value, setValue] = useState(0);

    return (
        <div className={styles.collapsible}>
            <div className={styles.header} {...getToggleProps()}>
                {isExpanded ? <></> : <button className={styles.expand_offer_button}>+</button>}
            </div>
            <div {...getCollapseProps()}>
                <div className={styles.content}>
                    <div className={styles.description}>{props.description}</div>
                    <div className={styles.inputs}>
                        <form onSubmit={submit}>
                            <div className={styles.col2}>
                            
                                <div className={styles.slidecontainer}>
                                    <label>Quantity in {props.weightUnit}: </label>
                                    <input type="number" id="range" name="okok" min="0" max={props.weight}></input>
                                </div>
                                <button type="submit" className={styles.submit} id="output">Available for pickup</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.header} {...getToggleProps()}>
                {isExpanded ? <button className={styles.expand_offer_button}>-</button> : <></>}
            </div>
            </div>
            <script type="text/javascript" src="/static/script.js" async></script>
        </div> 
        );
}


export default function Offers(props: {events: EventProps[], gleaners: string[], farmers: string[], orgs: string[]}) {
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
        <div>
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    height: 100%;
                }
            `}</style>
            <div>
                <Head>
                    <title>Gleanathon</title>
                </Head>
                <TopBar {...{type}}></TopBar>
            </div>
            <div className={styles.dashboard}>
                <div className={styles.dashboard_header}>
                    <h4 className={styles.dashboard_title}> Offers Near You</h4>
                </div>
                <div className={styles.dashboard_content}>
                    {props.events.map((x: EventProps, i: number) => (
                        <Offer {...x} key={i}></Offer>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>

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