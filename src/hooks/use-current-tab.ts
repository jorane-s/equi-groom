import { TABS } from "@/constants/tabs.constants";
import { usePathname } from "expo-router";

export function useCurrentTab() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  let currentTabIndex = TABS.findIndex((t) => segments.includes(t.id));
  // Accueil si pas trouvé
  if (currentTabIndex === -1) {
    currentTabIndex = TABS.findIndex((t) => t.id === "index");
  }

  return {
    currentIndex: currentTabIndex,
    currentTab: TABS[currentTabIndex],
  };
}
