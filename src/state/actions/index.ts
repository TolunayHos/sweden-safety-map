import City from "../../models/city";
import { ActionType } from "../action-types";
import { Action, Dispatch } from "redux";
import { FetchIncidents } from "../reducers/incidentsReducer";
import Polisen from "../../Apis/Polisen";
import { Incident } from "../../map/leaflet";
import { LatLngTuple } from "leaflet";

export const selectCity = (city: City) => {
  return {
    type: ActionType.FETCH_CITY,
    payload: city,
  };
};

export const getIncidents = () => {
  return async (dispatch: Dispatch<FetchIncidents>) => {
    return await Polisen.get("./incidents", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((response) => {
        console.log(response);
        const data = response.data.incidents;
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

        dispatch({
          type: ActionType.FETCH_INCIDENTS,
          payload: incidentMarkers,
        });
      })
      .catch((err) => console.log(err));
  };
};
