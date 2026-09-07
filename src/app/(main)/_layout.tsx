import { TabsMovingBackground } from "@/components/tabs-moving-background";
import { Href } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { FC, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import Profil from "../../../assets/icons/profil.svg";
import { useAppTheme } from "../../hooks/use-app-theme";

interface Tab {
  id: string;
  label: string;
  route: Href;
  icon: FC<SvgProps>;
}
const TABS: Tab[] = [
  {
    id: "profil",
    label: "Profil",
    route: "/(main)/profil",
    icon: Profil,
  },
  {
    id: "memo",
    label: "Mémo",
    route: "/(main)/memo",
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
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TABS_COUNT = 4;
const TAB_WIDTH = SCREEN_WIDTH / TABS_COUNT;

export default function MainLayout() {
  const [currentTab, setCurrentTab] = useState("index");
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(2 * TAB_WIDTH);

  const handleTabPress = (index: number) => {
    setCurrentTab(TABS[index].id);
    translateX.value = withSpring(index * TAB_WIDTH, {
      damping: 18,
      stiffness: 130,
      mass: 0.8,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, [translateX]);

  // Dimensions de la vague
  const bandHeight = 40;
  const dropDepth = 32;
  const totalSvgHeight = bandHeight + dropDepth;

  const styles = StyleSheet.create({
    tabs: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    content: {
      flex: 1,
    },
    bottomContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 105,
      backgroundColor: "#FFFFFF",
    },
    topBandContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 40,
      backgroundColor: colors.secondary,
    },
    movingTab: {
      width: TAB_WIDTH,
      height: 72,
      position: "absolute",
      top: 0,
      left: 0,
    },
    svgContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      pointerEvents: "none",
      zIndex: 1,
    },
    circle: {
      position: "absolute",
      top: 5,
      left: TAB_WIDTH / 2 - 28,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 3,
    },
    tabList: {
      flexDirection: "row",
      height: 65,
      marginTop: 40,
      alignItems: "center",
      zIndex: 2,
    },
    trigger: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      height: 26,
      justifyContent: "center",
      alignItems: "center",
    },
    tabLabel: {
      fontSize: 11,
      fontWeight: "500",
      color: "#1E293B",
      marginTop: 2,
    },
  });

  const getCurrentTabIcon = () => {
    const currentTabIndex = TABS.findIndex((t) => t.id === currentTab);
    const IconComponent = TABS[currentTabIndex].icon;
    return <IconComponent width={28} height={28} fill={colors.primary} />;
  };

  return (
    <Tabs style={styles.tabs}>
      <View style={styles.content}>
        <TabSlot />
      </View>
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.topBandContainer} />

        <View style={styles.svgContainer}>
          <Animated.View style={[styles.movingTab, animatedStyle]}>
            <TabsMovingBackground
              width={TAB_WIDTH}
              height={totalSvgHeight}
              fillColor={colors.secondary}
            />
            <View style={styles.circle}>{getCurrentTabIcon()}</View>
          </Animated.View>
        </View>
      </View>
      <TabList style={styles.tabList}>
        {TABS.map((tab, index) => {
          return (
            <TabTrigger
              key={tab.id}
              name={tab.label}
              href={tab.route}
              style={styles.trigger}
              asChild
            >
              <Pressable
                onPress={() => handleTabPress(index)}
                style={styles.trigger}
              >
                <View style={styles.iconContainer}>
                  {currentTab !== tab.id && (
                    <Profil
                      width={24}
                      height={24}
                      fill={
                        tab.id === currentTab ? colors.primary : colors.text
                      }
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color:
                        currentTab === tab.id ? colors.primary : colors.text,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            </TabTrigger>
          );
        })}
      </TabList>
    </Tabs>
  );
}
