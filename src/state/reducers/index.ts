import { combineReducers } from "redux";
// import commonIncidentsReducer from "./commonIncidentsReducer";
import incidentsReducer from "./incidentsReducer";
import selectedCityReducer from "./selectedCityReducer";

const reducers = combineReducers({
  citySelector: selectedCityReducer,
  incidentsList: incidentsReducer,
  // incidentSum: commonIncidentsReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
