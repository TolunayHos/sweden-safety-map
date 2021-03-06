import { Incident } from "../../map/leaflet";
import { ActionType } from "../action-types";
import { LatLngTuple } from "leaflet";
import IncidentSum from "../../models/incidentSum";
import Summary from "../../models/Summary";

const initialState = {
  description: "Stockholm",
  coords: [1, 2] as LatLngTuple,
  time: "Sometime",
  type: "danger",
  city: "working",
};

const initState = {
  incidents: [],
  summary: [],
};

export interface FetchIncidents {
  type: ActionType.FETCH_INCIDENTS;
  payload: IncidentSum;
}

export interface GetCityIncidentSummary {
  type: ActionType.GET_CITY_SUMMARY;
  payload: string;
}

export default (
  state: IncidentSum = initState,
  action: FetchIncidents | GetCityIncidentSummary
): IncidentSum => {
  switch (action.type) {
    case ActionType.FETCH_INCIDENTS:
      return action.payload;
    default:
      return state;
  }
};
