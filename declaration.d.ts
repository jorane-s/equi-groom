declare module "*.svg" {
  import React from "react";
    import { SvgProps } from "react-native-svg";

  // Le transformer convertit le SVG en composant React
  const content: React.FC<SvgProps>;

  export default content;
}
