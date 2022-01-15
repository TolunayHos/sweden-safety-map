import { LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styling/Map.scss";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Mapside from "../components/Mapside";
import Polisen from "../Apis/Polisen";

export type Incident = {
  description: string;
  coords: LatLngTuple;
  time: undefined | string;
  type: string;
  city: string;
};

const LeafletMap = () => {
  const [position, setPosition] = useState<LatLngTuple>([59.3293, 18.0686]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  // console.log(popupRender(incidentSummary));

  const getIncidents = async () => {
    const response = await Polisen.get("./events", {});

    console.log(response);

    let incidentMarkers: Incident[] = [];
    for (let i = 0; i < response.data.length; i++) {
      const gps = response.data[i].location.gps.split(",");

      const coords: LatLngTuple = [parseFloat(gps[0]), parseFloat(gps[1])];
      const summary: string = response.data[i].summary;
      const time: string = response.data[i].datetime;
      const type: string = response.data[i].type;
      const city: string = response.data[i].location.name;

      const incident: Incident = {
        description: summary,
        coords: coords,
        time: time,
        type: type,
        city: city,
      };
      incidentMarkers.push(incident);
    }
    setIncidents(incidentMarkers);
  };

  useEffect(() => {
    getIncidents();
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
          {incidents.map((incident) => {
            return (
              <Marker
                position={incident.coords}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>
                  <h4>{incident.time?.substring(0, 19)} </h4> <br></br>{" "}
                  {incident.description}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="mapside">
        <Mapside />
      </div>
    </div>
  );
};

export default LeafletMap;
