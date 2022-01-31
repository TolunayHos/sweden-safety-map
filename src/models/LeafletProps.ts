import { Incident } from "../map/leaflet";
import City from "./city";

interface LeafletProps {
  city: City;
  incidents: Incident[];
  getIncidents: () => Incident[];
}

export default LeafletProps;
