import L from "leaflet";
import { IconOptions } from "./types";
import libreIconUrl from "../../../assets/libre.png";
import occupeIconUrl from "../../../assets/occupe.png";
import pauseIconUrl from "../../../assets/pause.png";
import hopitalIconUrl from "../../../assets/hospital.png";

export const ambulanceIcons: IconOptions = {
  libre: new L.Icon({ iconUrl: libreIconUrl, iconSize: [32, 32] }),
  occupe: new L.Icon({ iconUrl: occupeIconUrl, iconSize: [32, 32] }),
  pause: new L.Icon({ iconUrl: pauseIconUrl, iconSize: [32, 32] }),
  hopital: new L.Icon({ iconUrl: hopitalIconUrl, iconSize: [38, 38] }),
};