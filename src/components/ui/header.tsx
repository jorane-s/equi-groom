import { TABS_IMG } from "@/constants/tabs.constants";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useCurrentTab } from "@/hooks/use-current-tab";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";

export default function Header() {
  const { colors } = useAppTheme();
  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.secondary,
      height: "25%",
      zIndex: 1,
    },
    image: {
      width: "100%",
      height: "75%",
      position: "absolute",
      top: 15,
      resizeMode: "contain",
    },
    userButton: {
      alignSelf: "flex-end",
      margin: 10,
      padding: 8,
      borderRadius: "50%",
      backgroundColor: colors.primary,
      justifyContent: "center",
      aspectRatio: "1/1",
    },
  });

  const { currentTab } = useCurrentTab();
  return (
    <View style={styles.header}>
      <TouchableHighlight style={styles.userButton}>
        <FontAwesome name="user" size={20} color="black" />
      </TouchableHighlight>
      {TABS_IMG[currentTab.id] && (
        <Image style={styles.image} source={TABS_IMG[currentTab.id]} />
      )}
    </View>
  );
}
