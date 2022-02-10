import City from "../../models/city";
import { ActionType } from "../action-types";
import { Action, Dispatch } from "redux";
import { FetchIncidents } from "../reducers/incidentsReducer";
import NodeServer from "../../Apis/NodeServer";
import { Incident } from "../../map/leaflet";
import { LatLngTuple } from "leaflet";
import IncidentSum from "../../models/incidentSum";
import Summary from "../../models/Summary";

export const selectCity = (city: City | undefined) => {
  return {
    type: ActionType.FETCH_CITY,
    payload: city,
  };
};

export const getIncidents = () => {
  return async (dispatch: Dispatch<FetchIncidents>) => {
    return await NodeServer.get("./incidents", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((response) => {
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

        const dataSummary = response.data.citySummary;
        let summaryCity: Summary[] = [];

        for (const city in dataSummary) {
          if (Object.prototype.hasOwnProperty.call(dataSummary, city)) {
            const citySummary = dataSummary[city];
            const cityIncidentSummary: Summary = {
              city: city,
              topReportingCities: citySummary.topReportingCities,
              lastReported: citySummary.lastReported,
              safetyIndex: citySummary.safetyIndex,
              incidentsPer: citySummary.incidentsPer,
              incidentSum: citySummary.incidentSum,
            };
            summaryCity.push(cityIncidentSummary);
          }
        }

        const incidentSum: IncidentSum = {
          incidents: incidentMarkers,
          summary: summaryCity,
        };

        dispatch({
          type: ActionType.FETCH_INCIDENTS,
          payload: incidentSum,
        });
      })
      .catch((err) => console.log(err));
  };
};
