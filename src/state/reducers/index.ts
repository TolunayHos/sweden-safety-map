import { combineReducers } from "redux";
import incidentsReducer from "./incidentsReducer";
import selectedCityReducer from "./selectedCityReducer";

const reducers = combineReducers({
  citySelector: selectedCityReducer,
  incidentsList: incidentsReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
