import { Incident } from "../../map/leaflet";
import { ActionType } from "../action-types";
import { LatLngTuple } from "leaflet";

const initialState = {
  description: "Stockholm",
  coords: [1, 2] as LatLngTuple,
  time: "Sometime",
  type: "danger",
  city: "working",
};

export interface FetchIncidents {
  type: ActionType.FETCH_INCIDENTS;
  payload: Incident[];
}

export default (
  state: Incident[] = [initialState],
  action: FetchIncidents
): Incident[] => {
  switch (action.type) {
    case ActionType.FETCH_INCIDENTS:
      return action.payload;
    default:
      return state;
  }
};
