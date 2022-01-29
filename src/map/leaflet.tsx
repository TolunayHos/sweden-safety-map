import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styling/Map.scss";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Mapside from "../components/Mapside";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import { getIncidents } from "../state/actions/index";
import { Grid } from "react-loader-spinner";

export type Incident = {
  description: string;
  coords: LatLngTuple;
  time: undefined | string;
  type: string;
  city: string;
};

const LeafletMap = (props: any) => {
  const [position, setPosition] = useState<LatLngTuple>([59.3293, 18.0686]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const getIncidents = props.getIncidents;
  console.log(incidents.length);

  useEffect(() => {
    getIncidents();
    setIncidents(props.incidents);

    const selectedCity = props.city;
    setPosition([selectedCity?.lat, selectedCity?.lng] as LatLngTuple);
  }, [props.incidents.length, props.city]);

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
          {/* <ChangeMapView coords={position} /> */}
        </MapContainer>
      </div>
      <div className="mapside">
        <Mapside incidents={incidents} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    city: state.citySelector,
    incidents: state.incidentsList.incidents,
  };
};

export default connect(mapStateToProps, { getIncidents })(LeafletMap);
