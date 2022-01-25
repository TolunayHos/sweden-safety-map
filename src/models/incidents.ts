import { LatLngTuple } from "leaflet";

interface IncidentModal {
  city: string;
  coords: number[];
  description: string;
  time: string;
  type: string;
}

export default IncidentModal;
