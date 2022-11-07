import Head from 'next/head';
import TopBar from '../components/topbar';
import React from 'react';
import Footer from "../components/footer"
import styles from "../styles/newEvent.module.css"
import main from "../database/connection"
import eventtt from "../database/schema"
import { useState } from 'react';
import { ClerkProvider, SignedIn , useUser, useClerk, SignIn, SignedOut} from '@clerk/clerk-react';
import clientPromise from "../lib/mongodb";


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

export default function newEvent(props: {orgs: string[], gleaners: string[], farmers: string[]}) {
    const { isSignedIn, user } = useUser()
    const EMAIL = user ? user.primaryEmailAddressId : ""
    let type = "None"
    
    if (props.orgs.includes(EMAIL || "")) {
        type = "Orgs"
    } else if (props.farmers.includes(EMAIL || "")) {
        type = "Farmers"
    } else if (props.gleaners.includes(EMAIL || "")) {
        type = "Gleaners"
    }
    const [name, setname] = useState("")
    const [vegetable, setvegetable] = useState("")
    const [vegetableEmoji, setvegetableEmoji] = useState("")
    const [capacity_min, setcapacity_min] = useState("")
    const [capacity_max, setcapacity_max] = useState("")
    const [address, setaddress] = useState("")
    const [date_min, setdate_min] = useState("")
    const [date_max, setdate_max] = useState("")
    const [description, setdescription] = useState("")
    const [weight, setweight] = useState("")
    
    async function submit(event: any) {

        
        

        /*const create = {
            name: event.target.name.value,
            vegetable: event.target.vegetable.value,
            vegetableEmoji: event.target.vegetableEmoji.value,
            capacity_min: event.target.capacity_min.value, 
            capacity_max: event.target.capacity_max.value,
            address: event.target.address.value,
            distance: 5,
            distanceUnit: "km",
            date_min: event.target.date_min.value,
            date_max: event.target.date_max.value,
            description: event.target.description.value
        }*/
        let post = {
            email: EMAIL, name, vegetable, vegetableEmoji, capacity_min, capacity_max, address, distance: 5, distanceUnit: "km", weight, weightUnit: "kg", date_min, date_max, description, requests: []
        }

        console.log(post)
        /*const client = await clientPromise;
        const db = client.db("test");
            let bodyObject = JSON.parse(JSON.stringify(create));
            let myPost = await db.collection("eventtts").insertOne(bodyObject);*/
        
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });
        
            
            
    }
    
    

    if (type === "Farmers") {
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
                <div className={styles.form_container}>
                <form onSubmit={submit}>
                <label>Farm name :</label><br />
                    <input onChange={(e) => setname(e.target.value)}
                    className="mb-4 border-b-2"
                    id="name"
                    name="name"
                    type="text"
                    required
                    /><br />
                <label>Vegetable :</label><br />
                    <input onChange={(e) => setvegetable(e.target.value)}
                    className="mb-4 border-b-2"
                    id="vegetable"
                    name="name"
                    type="text"
                    required
                    /><br />
                <label>Vegetable emoji :</label><br />
                    <input onChange={(e) => setvegetableEmoji(e.target.value)}
                    className="mb-4 border-b-2"
                    id="vegetableEmoji"
                    name="name"
                    type="text"
                    required
                    /><br />
                <label>Total weight :</label><br />
                    <input onChange={(e) => setweight(e.target.value)}
                    className="mb-4 border-b-2"
                    id="weight"
                    name="name"
                    min="0"
                    max="9999"
                    type="number"
                    required
                    /><br />
                <label>Minimum amount of gleaners :</label><br />
                    <input onChange={(e) => setcapacity_min(e.target.value)}
                    className="mb-4 border-b-2"
                    id="capacityMin"
                    min="5"
                    max="999"
                    name="name"
                    type="number"
                    required
                    /><br />
                <label>Maximum amount of gleaners :</label><br />
                    <input onChange={(e) => setcapacity_max(e.target.value)}
                    className="mb-4 border-b-2"
                    id="capacityMax"
                    min="5"
                    max="999"
                    name="name"
                    type="number"
                    required
                    /><br />
                <label>Address :</label><br />
                    <input onChange={(e) => setaddress(e.target.value)}
                    className="mb-4 border-b-2"
                    id="address"
                    name="name"
                    type="text"
                    required
                    /><br />
                <label>From: </label>
                    <input onChange={(e) => setdate_min(e.target.value)}
                    className="mb-4 border-b-2"
                    id="dateMin"
                    name="name"
                    type="date"
                    required
                    />
                <label>To: </label>
                    <input onChange={(e) => setdate_max(e.target.value)}
                    className="mb-4 border-b-2"
                    id="dateMax"
                    name="name"
                    type="date"
                    required
                    /><br />
                <label>Description : </label><br />
                    <textarea onChange={(e) => setdescription(e.target.value)}
                    className="mb-4 border-b-2"
                    id="description"
                    name="name"
                    required
                    />
                <button type="submit">Submit</button>
                </form>
                </div>
                
                <Footer></Footer>
            </div>
    
        );
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

        return {
            props: {gleaners: JSON.parse(JSON.stringify(gleaners)).map((x: any) => x.email), farmers: JSON.parse(JSON.stringify(farmers)).map((x: any) => x.email), orgs: JSON.parse(JSON.stringify(orgs)).map((x: any) => x.email) },
        };
    } catch (e) {
        console.error(e);
    }
}

