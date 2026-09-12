import { TABS_IMG } from "@/constants/tabs.constants";
import { useCurrentTab } from "@/hooks/use-current-tab";
import { Image, View } from "react-native";
import classes from "./header.css";

export default function Header() {
  const { currentTab } = useCurrentTab();
  return (
    <View className={classes.header}>
      {TABS_IMG[currentTab.id] && (
        <Image className={classes.image} source={TABS_IMG[currentTab.id]} />
      )}
    </View>
  );
}
