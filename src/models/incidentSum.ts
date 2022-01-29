import { Incident } from "../map/leaflet";
import Summary from "./Summary";

interface IncidentSum {
  incidents: Incident[];
  summary: Summary[];
}

export default IncidentSum;
