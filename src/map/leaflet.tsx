import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styling/Map.scss";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Mapside from "../components/Mapside";

const LeafletMap = () => {
  const [position, setPosition] = useState<LatLngTuple>([59.3293, 18.0686]);

  const APIKEY: string = "46385d28ffd34b6c979dd82156a68bf1";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];
      setPosition(coords as LatLngTuple);
    });
  }, []);

  return (
    <div className="LeafletWrapper">
      <div className="LeafletMap">
        <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=46385d28ffd34b6c979dd82156a68bf1"
          />
          <Marker
            position={[59.3293, 18.0686]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="mapside">
        <Mapside />
      </div>
    </div>
  );
};

export default LeafletMap;
