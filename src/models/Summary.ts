import { Incident } from "../map/leaflet";
import IncidentsPerType from "./IncidentsPerType";

interface Summary {
  city: string;
  lastReported: Incident[];
  safetyIndex: number;
  incidentsPer: number;
  incidentSum: IncidentsPerType[];
}

export default Summary;
