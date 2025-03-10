import L from "leaflet";
import { IconOptions } from "./types";
import libreIconUrl from "../../../assets/libre.png";
import occupeIconUrl from "../../../assets/occupe.png";
import pauseIconUrl from "../../../assets/pause.png";
import hopitalIconUrl from "../../../assets/hospital.png";

export const ambulanceIcons: IconOptions = {
  libre: new L.Icon({ iconUrl: libreIconUrl, iconSize: [50, 50] }),
  occupe: new L.Icon({ iconUrl: occupeIconUrl, iconSize: [50, 50] }),
  pause: new L.Icon({ iconUrl: pauseIconUrl, iconSize: [50, 50] }),
  hopital: new L.Icon({ iconUrl: hopitalIconUrl, iconSize: [60, 60] }),
};