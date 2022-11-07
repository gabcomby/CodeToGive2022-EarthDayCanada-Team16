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
