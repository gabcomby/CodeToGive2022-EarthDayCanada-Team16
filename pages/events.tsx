<<<<<<< Updated upstream
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
import Link from "next/link"


interface OfferProps {
    farm_name: string;
    vegetable: string;
    vegetableEmoji: string;
    capacity: {min: number, max: number};
    distance: string;
    description: string;
    address: string;
    dateRange: {min: Date, max: Date};
}


const submit = async (event:any) => {
    event.preventDefault();
    alert(event.target.range.value)
};

const USER = "farmer"


function Offer(props : OfferProps) {
    return (
        <div className={styles.offer}>
            <h1>{props.farm_name}</h1>
            <h5>{props.distance} from you</h5>
            
            <div className={styles.row}>
                <div className={styles.col}>
                    <h4 className={styles.veg_emoji}>{props.vegetableEmoji}</h4>
                    <h4 className={styles.offer_quantity}>{props.vegetable}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={location} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.address}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={clock} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.dateRange.min.toJSON().slice(0, 10)} - {props.dateRange.max.toJSON().slice(0, 10)}</h4>
                </div>
                <div className={styles.col}>
                    <Image src={people} alt="" width={50}></Image>
                    <h4 className={styles.address}>{props.capacity.min} - {props.capacity.max}</h4>
                </div>
            </div>
            <div className={styles.third_row}>
                <Collapsible {...props}/>
            </div>
        </div>
    );
}


function Collapsible(props: OfferProps){
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
                                    <label>Group size: </label>
                                    <input type="number" id="range" name="okok" min="0" max={props.capacity.max.toString()}></input>
                                </div>
                                <button type="submit" className={styles.submit} id="output">Available for gleaning</button>
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

function AddEvent () {
    return(
        <div className={styles.add_event_container}>
            <Link className={styles.add_event} href="/create">+</Link>
        </div>
    )
    
}


export default function Events() {
    //Table of randomly generated offers
    const offers = [
        {
            farm_name: 'Bear Creek Ranch',
            vegetable: 'Tomato',
            vegetableEmoji: "🍅",
            capacity: {min: 8, max: 12},
            address: "2907 Township Rd, Bonnyville, T9N2J6, AB, Canada",
            distance: '5km',
            dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
            description: 'Looking for a group of cool people willing to give their day away to gather some tomatoes for the greater cause!'
        },
        {
            farm_name: 'Iron Hill Lands',
            vegetable: 'Potato',
            vegetableEmoji: "🥔",
            capacity: {min: 5, max: 7},
            address: "2749 102nd Avenue, V1J3Y7, BC, CA",
            distance: '10km',
            dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
            description: 'Looking for a group of cool people willing to give their day away to gather some potatoes for the greater cause!'
        },
        {
            farm_name: 'Red Mountain Lands',
            vegetable: 'Cabbage',
            vegetableEmoji: "🥬",
            capacity: {min: 15, max: 20},
            address: "1031 Port Washington Road, T0K0E0, AB, CA",
            distance: '15km',
            dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
            description: 'Looking for a group of cool people willing to give their day away to gather some cabbages for the greater cause!'
        },
        {
            farm_name: 'Oak Wood Pastures',
            vegetable: 'Carrot',
            vegetableEmoji: "🥕",
            capacity: {min: 8, max: 10},
            address: "2132 Boulevard Laflèche, G5R3Y5, QC, CA",
            distance: '20km',
            dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
            description: 'Looking for a group of cool people willing to give their day away to gather some carrots for the greater cause!'
        },
        {
            farm_name: 'Deer Cove Farmstead',
            vegetable: 'Onion',
            vegetableEmoji: "🧄",
            capacity: {min: 5, max: 8},
            address: "2505 Lockhart Drive, L4M3B1, ON, CA",
            distance: '25km',
            dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
            description: 'Looking for a group of cool people willing to give their day away to gather some onions for the greater cause!'
        },
        {
            farm_name: 'Pine Valley Range',
            vegetable: 'Cucumber',
            vegetableEmoji: "🥒",
            capacity: {min: 10, max: 20},
            address: "1439 47th Avenue, Y0B1T0, YT, CA",
            distance: '30km',
            dateRange: {min: new Date(2022, 11, 1), max: new Date(2022, 11, 5)},
            description: 'Looking for a group of cool people willing to give their day away to gather some cucumbers for the greater cause!'
        },
    ];


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
            <div className={styles.dashboard}>
                <div className={styles.dashboard_header}>
                    <h4 className={styles.dashboard_title}> Offers Near You</h4>
                </div>
                <div className={styles.dashboard_content}>
                    {offers.map((x: OfferProps, i: number) => (
                        <Offer {...x} key={i}></Offer>
                    ))}
                </div>
            </div>
            {USER === "farmer" ? <AddEvent></AddEvent> : <></>}
            <Footer></Footer>
        </div>

    );
}
=======
import Head from "next/head";
import TopBar from "../components/topbar";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDLTsmW-cX8AKIrbneAEMjKyPGNyPFYp2c",
  });

  const randomFarms: Array<position> = [
    { lat: 40, lng: -80 },
    { lat: 45, lng: -80 },
    { lat: 41, lng: -80 },
  ];

  if (!isLoaded) return <div>Loading...</div>;

  return <Map></Map>;
}
interface position {
  lat: number;
  lng: number;
}

function Map() {
  const center = useMemo(() => ({ lat: 40, lng: -80 }), []);
  const positions = [
    { pos: { lat: 40, lng: -80 }, name: "ferme A" },
    { pos: { lat: 35, lng: -83 }, name: "ferme B" },
    { pos: { lat: 32, lng: -85 }, name: "ferme C" },
    { pos: { lat: 37, lng: -87 }, name: "ferme D" },
    { pos: { lat: 39, lng: -82 }, name: "ferme E" },
  ];
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      {positions.map((p) => (
        <Marker key={p.pos.lat + p.pos.lng} position={p.pos} label={p.name} />
      ))}
      <Marker position={{ lat: 40, lng: -89 }} label={"Ferme F"} />
    </GoogleMap>
  );
}
>>>>>>> Stashed changes
