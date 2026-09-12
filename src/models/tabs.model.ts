import { Href } from "expo-router";
import { FC } from "react";
import { SvgProps } from "react-native-svg";

export interface Tab {
  id: string;
  label: string;
  route: Href;
  icon: FC<SvgProps>;
}
