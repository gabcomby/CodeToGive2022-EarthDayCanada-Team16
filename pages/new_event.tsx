import Head from 'next/head';
import TopBar from '../components/topbar';
import React from 'react';
import Footer from "../components/footer"
import styles from "../styles/newEvent.module.css"
import clientPromise from "../lib/mongodb";
import main from "../database/connection"
import eventtt from "../database/schema"
import { useState } from 'react';


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
}

export default function newEvent() {
    const [name, setName] = useState("")
    const [vegetable, setvegetable] = useState("")
    const [vegetableEmoji, setvegetableEmoji] = useState("")
    const [capacity_min, setcapacity_min] = useState("")
    const [capacity_max, setcapacity_max] = useState("")
    const [address, setaddress] = useState("")
    const [date_min, setdate_min] = useState("")
    const [date_max, setdate_max] = useState("")
    const [description, setdescription] = useState("")
    
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
            name: "Farmm", vegetable, vegetableEmoji, capacity_min, capacity_max, address, distance: 5, distanceUnit: "km", date_min, date_max, description
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
                <TopBar></TopBar>
            </div>
            <div className={styles.form_container}></div>
            <form onSubmit={submit}>
            <label>Vegetable :</label>
                <input onChange={(e) => setvegetable(e.target.value)}
                className="mb-4 border-b-2"
                id="vegetable"
                name="name"
                type="text"
                required
                /><br />
            <label>Vegetable emoji :</label>
                <input onChange={(e) => setvegetableEmoji(e.target.value)}
                className="mb-4 border-b-2"
                id="vegetableEmoji"
                name="name"
                type="text"
                required
                /><br />
            <label>Minimum amount of gleaners :</label>
                <input onChange={(e) => setcapacity_min(e.target.value)}
                className="mb-4 border-b-2"
                id="capacityMin"
                min="5"
                max="999"
                name="name"
                type="number"
                required
                /><br />
            <label>Maximum amount of gleaners :</label>
                <input onChange={(e) => setcapacity_max(e.target.value)}
                className="mb-4 border-b-2"
                id="capacityMax"
                min="5"
                max="999"
                name="name"
                type="number"
                required
                /><br />
            <label>Address :</label>
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
            <label>Description: </label>
                <textarea onChange={(e) => setdescription(e.target.value)}
                className="mb-4 border-b-2"
                id="description"
                name="name"
                required
                />
            <button type="submit">Submit</button>
            </form>
            <Footer></Footer>
        </div>

    );
}
