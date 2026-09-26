import { useWindowDimensions, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Svg, { Path } from "react-native-svg";

export default function CurvedBottomImage({ imageSrc }: { imageSrc: any }) {
  const { width } = useWindowDimensions();
  const height = 250;
  const curveHeight = 40;

  return (
    <View style={[styles.container, { height }]}>
      <Image source={imageSrc} style={styles.image} contentFit="cover" />

      <View style={styles.svgContainer}>
        <Svg
          width={"100%"}
          height={curveHeight}
          viewBox={`0 0 350 ${curveHeight}`}
        >
          <Path
            d={`M 0 0 Q 180 ${curveHeight} 375 0 L 375 ${curveHeight} L 0 ${curveHeight} Z`}
            fill="#FDFBF7"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "25%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  svgContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
