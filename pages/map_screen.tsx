import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDLTsmW-cX8AKIrbneAEMjKyPGNyPFYp2c',
        
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (<GoogleMap zoom={10} center={{lat:44,lng:-80}} mapContainerClassName='map-container'></GoogleMap>);
}

function Map() {
    return (<GoogleMap zoom={10} center={{lat:44,lng:-80}} mapContainerClassName='map-container'></GoogleMap>);
}