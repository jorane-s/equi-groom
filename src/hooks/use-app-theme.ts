import { useColorScheme } from "nativewind";
import { AppTheme, PALETTE } from "../color-theme";

export function useAppTheme(): {
  colors: AppTheme;
  isDark: boolean;
  colorScheme: string;
} {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    isDark,
    colorScheme: colorScheme ?? "light",
    colors: isDark ? PALETTE.dark : PALETTE.light,
  };
}
