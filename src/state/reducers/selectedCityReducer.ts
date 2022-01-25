import City from "../../models/city";
import { ActionType } from "../action-types";

interface FetchCity {
  type: ActionType.FETCH_CITY;
  payload: City;
}

const initialState = {
  name: "Stockholm",
  lat: 59.3294,
  lng: 18.0686,
};

export default (state: City = initialState, action: FetchCity): City => {
  switch (action.type) {
    case ActionType.FETCH_CITY:
      return action.payload;
    default:
      return state;
  }
};
