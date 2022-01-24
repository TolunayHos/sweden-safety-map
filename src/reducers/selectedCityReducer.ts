import City from "../models/city";

type Action = {
  type: string;
  payload: City;
};

export default (state = "Stockholm", action: Action) => {
  switch (action.type) {
    case "FETCH_CITY":
      return action.payload;
    default:
      return state;
  }
};
