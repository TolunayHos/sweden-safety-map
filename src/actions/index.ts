import city from "../models/city";

export const selectCity = (city: city) => {
  return {
    type: "FETCH_CITY",
    payload: city,
  };
};
