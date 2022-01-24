import { LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styling/Map.scss";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Mapside from "../components/Mapside";
import Polisen from "../Apis/Polisen";
// import CityDropdown from "../components/CityDropdown";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import citiesJson from "../data/cities.json";
import city from "../models/city";

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

  console.log(props.city);
  const cities: city[] = citiesJson.cities;

  // for (let i = 0; i < cities.length; i++) {
  //   cities[i].name === props.city ? cities[i].lat : "couldnt find";
  //   console.log(cities[i].lat);
  // }

  cities.find((city) => city.name === `${props.city}`);

  // console.log(popupRender(incidentSummary));

  const getIncidents = async () => {
    const response = await Polisen.get("./incidents", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    console.log(response.data);
    const data = response.data.data;

    let incidentMarkers: Incident[] = [];
    for (let i = 0; i < data.length; i++) {
      const gps = data[i].location.gps.split(",");

      const coords: LatLngTuple = [parseFloat(gps[0]), parseFloat(gps[1])];
      const summary: string = data[i].summary;
      const time: string = data[i].datetime;
      const type: string = data[i].type;
      const city: string = data[i].location.name;

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
    console.log(incidentMarkers);
  };

  useEffect(() => {
    getIncidents();
    const SelectedCity = cities.find((city) => city.name === `${props.city}`);
    const coords = [SelectedCity?.lat, SelectedCity?.lng];
    console.log(coords);
    setPosition(coords as LatLngTuple);
  }, [props.city]);

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
                key={incident.time}
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
        <Mapside />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    city: state.citySelector,
  };
};
export default connect(mapStateToProps)(LeafletMap);
