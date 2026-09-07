import Svg, { Path } from "react-native-svg";

interface TabsMovingBackgroundProps {
  width: number;
  height: number;
  fillColor: string;
}

export function TabsMovingBackground({
  width,
  height,
  fillColor,
}: TabsMovingBackgroundProps) {
  const bandHeight = 40;
  const dropDepth = 32;
  const center = width / 2;

  const notchPath = `
    M 0,0 
    L ${width},0 
    L ${width},${bandHeight} 
    L ${center + 45},${bandHeight} 
    C ${center + 28},${bandHeight} ${center + 24},${bandHeight + dropDepth} ${center},${bandHeight + dropDepth} 
    C ${center - 24},${bandHeight + dropDepth} ${center - 28},${bandHeight} ${center - 45},${bandHeight} 
    L 0,${bandHeight} 
    Z
  `;

  return (
    <Svg width={width} height={height}>
      <Path d={notchPath} fill={fillColor} />
    </Svg>
  );
}
