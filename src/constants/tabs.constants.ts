import { Tab } from "@/models/tabs.model";
import { ImageSourcePropType } from "react-native";
import Profil from "../../assets/icons/profil.svg";

export const TABS: Tab[] = [
  {
    id: "profil",
    label: "Profil",
    route: "/(main)/profil",
    icon: Profil,
  },
  {
    id: "sante",
    label: "Santé",
    route: "/(main)/sante",
    icon: Profil,
  },
  {
    id: "index",
    label: "Accueil",
    route: "/(main)",
    icon: Profil,
  },
  {
    id: "appointment",
    label: "Rendez-vous",
    route: "/(main)/appointment",
    icon: Profil,
  },
];

export const TABS_IMG: { [key: string]: ImageSourcePropType } = {
  index: require("@/assets/images/index.jpg"),
  sante: require("@/assets/images/sante.jpg"),
};
