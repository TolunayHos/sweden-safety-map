import { combineReducers } from "redux";
import selectedCityReducer from "./selectedCityReducer";

export default combineReducers({ citySelector: selectedCityReducer });
