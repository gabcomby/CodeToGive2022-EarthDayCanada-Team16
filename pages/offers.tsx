import Head from 'next/head';
import TopBar from '../components/topbar';
import styles from '../styles/Dashboard.module.css';
import React from 'react';
import useCollapse from 'react-collapsed';
import {MDBRange} from 'mdb-react-ui-kit';

interface OfferProps {
    farm_name: string;
    vegetable: string;
    quantity: string;
    distance: string;
    description: string;
}

function Offer(props : OfferProps) {
    return (
        <div className={styles.offer}>
            <div className={styles.offer_first_row}>
                <h3 className={styles.offer_farm_name}>{props.farm_name}</h3>
                <h3>{props.vegetable}</h3>
            </div>
            <div className={styles.offer_second_row}>
                <h4 className={styles.offer_distance}>Distance: {props.distance}</h4>
                <h4 className={styles.offer_quantity}>Available quantity: {props.quantity}</h4>
            </div>
            <div className={styles.third_row}>
                <Collapsible {...props}/>
            </div>
        </div>
    );
}



function Collapsible(props: OfferProps){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const [value, setValue] = React.useState(0);

    let number_max : number = parseInt(props.quantity);

    return (
        <div className={styles.collapsible}>
            <div className={styles.header} {...getToggleProps()}>
                {isExpanded ? <button className={styles.expand_offer_button}>-</button> : <button className={styles.expand_offer_button}>+</button>}
            </div>
            <div {...getCollapseProps()}>
                <div className={styles.content}>
                    <div className={styles.description}>{props.description}</div>
                    <div className={styles.inputs}>
                    </div>
                </div>
            </div>
        </div>
        );
}


export default function Offers() {
    //Table of randomly generated offers
    const offers = [
        {
            farm_name: 'Farm 1',
            vegetable: 'Tomato',
            quantity: '10kg',
            distance: '5km',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
        },
        {
            farm_name: 'Farm 2',
            vegetable: 'Potato',
            quantity: '20kg',
            distance: '10km',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
        },
        {
            farm_name: 'Farm 3',
            vegetable: 'Cabbage',
            quantity: '30kg',
            distance: '15km',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
        },
        {
            farm_name: 'Farm 4',
            vegetable: 'Carrot',
            quantity: '40kg',
            distance: '20km',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
        },
        {
            farm_name: 'Farm 5',
            vegetable: 'Onion',
            quantity: '50kg',
            distance: '25km',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
        },
        {
            farm_name: 'Farm 6',
            vegetable: 'Cucumber',
            quantity: '60kg',
            distance: '30km',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget aliquam lacinia, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.'
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
        </div>

    );
}