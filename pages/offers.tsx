import Head from 'next/head';
import TopBar from '../components/topbar';
import styles from '../styles/Dashboard.module.css';

interface OfferProps {
    title: string;
    description: string;
    location: string;
    date: string;
}


function Offer({ title, description, location, date }: OfferProps) {
    return (
        <div className={styles.offer}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{location}</p>
            <p>{date}</p>
            <button>+</button>
        </div>
    );
}

export default function Offers() {
    //Table of randomly generated offers
    const offers = [
        {
            title: "Offer 1",
            description: "Description 1",
            location: "Location 1",
            date: "Date 1"
        },
        {
            title: "Offer 2",
            description: "Description 2",
            location: "Location 2",
            date: "Date 2"
        },
        {
            title: "Offer 3",
            description: "Description 3",
            location: "Location 3",
            date: "Date 3"
        },
        {
            title: "Offer 4",
            description: "Description 4",
            location: "Location 4",
            date: "Date 4"
        },
        {
            title: "Offer 5",
            description: "Description 5",
            location: "Location 5",
            date: "Date 5"
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
                    <Offer {...offers[0]}></Offer>
                    <Offer {...offers[1]}></Offer>
                    <Offer {...offers[2]}></Offer>
                    <Offer {...offers[3]}></Offer>
                    <Offer {...offers[4]}></Offer>
                </div>
            </div>
        </div>

    );
}