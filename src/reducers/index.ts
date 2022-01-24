import { combineReducers } from "redux";
import selectedCityReducer from "./selectedCityReducer";

const reducers = combineReducers({ citySelector: selectedCityReducer });

export default reducers;

export type State = ReturnType<typeof reducers>;
