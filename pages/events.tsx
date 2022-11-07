import Head from 'next/head';
import TopBar from '../components/topbar';
import styles from '../styles/Dashboard.module.css';
import React from 'react';
import useCollapse from 'react-collapsed';
import Image from "next/image"
import location from "../images/address-3.png"
import clock from "../images/clock.png"
import people from "../images/people.png"
import {MDBRange} from 'mdb-react-ui-kit';
import {useState} from 'react'
import Footer from "../components/footer"
import Complete from "../components/complete"
import Link from "next/link"
import clientPromise from "../lib/mongodb";
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';



interface OfferProps {
    farm_name: string;
    vegetable: string;
    vegetableEmoji: string;
    capacity: {min: number, max: number};
    distance: string;
    description: string;
    address: string;
    dateRange: {min: String, max: String};
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


function Offer(props : {p: any, type: string}) {
    console.log(props)
    return (
        <div className={styles.offer}>
            <h1>{props.p.name}</h1>
            <h5>{props.p.distance} {props.p.distanceUnit} from you</h5>
            
            <div className={styles.row}>
                <div className={styles.col}>
                    <h4 className={styles.veg_emoji}>{props.p.vegetableEmoji}</h4>
                    <h4 className={styles.offer_quantity}>{props.p.vegetable}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={location} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.p.address}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={clock} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.p.date_min.slice(0, 10)} - {props.p.date_max.slice(0, 10)}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={people} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.p.capacity_min} - {props.p.capacity_max}</h4>
                </div>
            </div>
            <div className={styles.third_row}>
                <Collapsible {...{props}}/>
            </div>
        </div>
    );
}


function Collapsible(props : {props: {p: EventProps, type: string}}){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const [value, setValue] = useState(0);

    return (
        <div className={styles.collapsible}>
            <div className={styles.header} {...getToggleProps()}>
                {isExpanded ? <></> : <button className={styles.expand_offer_button}>+</button>}
            </div>
            <div {...getCollapseProps()}>
                <div className={styles.content}>
                    <div className={styles.description}>{props.props.p.description}</div>
                    <div className={styles.inputs}>
                        <form onSubmit={submit}>
                            {props.props.type === "Gleaners" ? 
                            <div className={styles.col2}>
                            
                                <div className={styles.slidecontainer}>
                                    <label>Group size: </label>
                                    <input type="number" id="range" name="okok" min="0" max={props.props.p.capacity_max.toString()}></input>
                                </div>
                                <button type="submit" className={styles.submit} id="output">Available for gleaning</button>
                            </div>: <></>}
                        </form>
                    </div>
                </div>
                <div className={styles.header} {...getToggleProps()}>
                {isExpanded ? <button className={styles.expand_offer_button}>-</button> : <></>}
            </div>
            </div>
        </div> 
        );
}

function AddEvent () {
    return(
        <div className={styles.add_event_container}>
            <Link className={styles.add_event} href="/new_event">+</Link>
        </div>
    )
    
}





export default function Events(props: {events: EventProps[], gleaners: string[], farmers: string[], orgs: string[]}) {
    const { isSignedIn, user } = useUser()
    const EMAIL = user ? user.primaryEmailAddressId : ""
    let type = "None"
    let gleaner = []
    if (props.gleaners.includes(EMAIL || "")) {
        type = "Gleaners"
    } else if (props.farmers.includes(EMAIL || "")) {
        type = "Farmers"
    } else if (props.orgs.includes(EMAIL || "")) {
        type = "Orgs"
    }

    if(type == "Gleaners" || type === "Farmers") {
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
                        {props.events.length > 0 ?
                        props.events.map((p: EventProps, i: number) => (
                            <Offer {...{p, type}} key={i}></Offer>
                        )) : <></>}
                    </div>
                </div>
                {type === "Farmers" ? <AddEvent></AddEvent> : <></>}
                <Footer></Footer>
            </div>
    
        );
    } else if (type === "None") {
        return(<>
            <Head>
                <title>Gleanathon</title>
            </Head>
            <TopBar {...{type}}></TopBar>
            <Complete></Complete>
            <Footer></Footer>
        
        
        </>
            
        )
    }
    
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

















// const offers = [
//     {
//         farm_name: 'Farm 1',
//         vegetable: 'Tomato',
//         vegetableEmoji: "🍅",
//         capacity: {min: 8, max: 12},
//         address: "907 Amarantes St., H7Y 2G9, QC, CA",
//         distance: '5km',
//         dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
//     },
//     {
//         farm_name: 'Farm 2',
//         vegetable: 'Potato',
//         vegetableEmoji: "🥔",
//         capacity: {min: 5, max: 7},
//         address: "907 Amarantes St., H7Y 2G9, QC, CA",
//         distance: '10km',
//         dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
//     },
//     {
//         farm_name: 'Farm 3',
//         vegetable: 'Cabbage',
//         vegetableEmoji: "🥬",
//         capacity: {min: 15, max: 20},
//         address: "907 Amarantes St., H7Y 2G9, QC, CA",
//         distance: '15km',
//         dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
//     },
//     {
//         farm_name: 'Farm 4',
//         vegetable: 'Carrot',
//         vegetableEmoji: "🥕",
//         capacity: {min: 8, max: 10},
//         address: "907 Amarantes St., H7Y 2G9, QC, CA",
//         distance: '20km',
//         dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
//     },
//     {
//         farm_name: 'Farm 5',
//         vegetable: 'Onion',
//         vegetableEmoji: "🧄",
//         capacity: {min: 5, max: 8},
//         address: "907 Amarantes St., H7Y 2G9, QC, CA",
//         distance: '25km',
//         dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
//     },
//     {
//         farm_name: 'Farm 6',
//         vegetable: 'Cucumber',
//         vegetableEmoji: "🥒",
//         capacity: {min: 10, max: 20},
//         address: "907 Amarantes St., H7Y 2G9, QC, CA",
//         distance: '30km',
//         dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
//     },