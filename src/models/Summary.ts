import { Incident } from "../map/leaflet";
import IncidentsPerType from "./IncidentsPerType";

interface lastReported {
  datetime: string;
  name: string;
  summary: string;
}

interface Summary {
  city: string;
  lastReported: lastReported[];
  safetyIndex: number;
  incidentsPer: number;
  incidentSum: IncidentsPerType[];
}

export default Summary;
