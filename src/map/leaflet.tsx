import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styling/Map.scss";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Mapside from "../components/Mapside";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { TailSpin } from "react-loader-spinner";

export type Incident = {
  description: string;
  coords: LatLngTuple;
  time: undefined | string;
  type: string;
  city: string;
};

const LeafletMap: React.FC = () => {
  const [position, setPosition] = useState<LatLngTuple>([59.3293, 18.0686]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const city = useTypedSelector((state) => state.citySelector);
  const incidentsRedux = useTypedSelector(
    (state) => state.incidentsList.incidents
  );
  const { getIncidents } = useActions();

  useEffect(() => {
    getIncidents();
    setIncidents(incidentsRedux);
  }, [incidentsRedux.length]);

  useEffect(() => {
    const selectedCity = city;
    setPosition([selectedCity?.lat, selectedCity?.lng] as LatLngTuple);
  }, [incidentsRedux.length, city]);

  const preventOverlap = (position: LatLngTuple) => {
    const randomLat = Math.random() / 160;
    const randomLng = Math.random() / 100;

    const lat = position[0] + randomLat;
    const lng = position[1] - randomLng;
    const newPosition = [lat, lng];
    return newPosition as LatLngTuple;
  };

  return (
    <div className="LeafletWrapper">
      <div className="LeafletMap">
        <MapContainer
          key={JSON.stringify(position)} //New instance of MapContainer created which forces render
          center={position}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=46385d28ffd34b6c979dd82156a68bf1"
          />

          {incidents.map((incident) => {
            return (
              <Marker
                key={Math.random()}
                position={preventOverlap(incident.coords)}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>
                  <h4>
                    {incident.city}
                    <br></br>
                    {incident.time?.substring(0, 19)}{" "}
                  </h4>{" "}
                  <br></br> {incident.description}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      {incidents.length === 0 && (
        <div className="fullScreenOverlay">
          <div className="fetchingOverlay">
            <TailSpin color="#f95738" height={80} width={80} />
            <h4>Fetching the data</h4>
          </div>
        </div>
      )}

      <div className="mapside">
        <Mapside />
      </div>
    </div>
  );
};

export default LeafletMap;
