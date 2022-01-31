import { Incident } from "../map/leaflet";
import IncidentsPerType from "./IncidentsPerType";

interface lastReported {
  datetime: string;
  name: string;
  summary: string;
}

interface topReportingCities {
  city: string;
  numberOfIncidents: number;
}

interface Summary {
  city: string;
  topReportingCities: topReportingCities[];
  lastReported: lastReported[];
  safetyIndex: number;
  incidentsPer: number;
  incidentSum: IncidentsPerType[];
}

export default Summary;
