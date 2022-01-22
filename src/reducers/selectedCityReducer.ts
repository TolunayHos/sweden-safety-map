import { Action } from "redux";
import city from "../models/city";

export default (state = "Stockholm", action: any) => {
  switch (action.type) {
    case "FETCH_CITY":
      return action.payload;
    default:
      return state;
  }
};
