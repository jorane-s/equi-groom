import { DarkTheme, DefaultTheme } from "expo-router";
import { vars } from "nativewind";

export const PALETTE = {
  light: {
    primary: "#70C1B3",
    primaryLight: "#aef7eb",
    primaryDarker: "#56A395",
    secondary: "#FFF2E6",
    secondaryLight: "#fffaf5",
    secondaryDarker: "#e2d4c7",
    accent: "#F2D3C7",
    card: "#FFFFFF",
    text: "#1E293B",
    subText: "#64748B",
  },
  dark: {
    primary: "#70C1B3",
    primaryLight: "#aef7eb",
    primaryDarker: "#56A395",
    secondary: "#FFF2E6",
    secondaryLight: "#fffaf5",
    secondaryDarker: "#e2d4c7",
    accent: "#F2D3C7",
    card: "#FFFFFF",
    text: "#1E293B",
    subText: "#64748B",
  },
};

export const themes = {
  light: vars({
    "--primary-color-default": PALETTE.light.primary,
    "--primary-color-light": PALETTE.light.primaryLight,
    "--primary-color-darker": PALETTE.light.primaryDarker,
    "--secondary-color-default": PALETTE.light.secondary,
    "--secondary-color-light": PALETTE.light.secondaryLight,
    "--secondary-color-darker": PALETTE.light.secondaryDarker,
    "--accent-color-default": PALETTE.light.accent,
    "--card-color-default": PALETTE.light.card,
    "--text-color-default": PALETTE.light.text,
    "--text-sub-color-default": PALETTE.light.subText,
  }),
  dark: vars({
    "--primary-color-default": PALETTE.dark.primary,
    "--primary-color-light": PALETTE.dark.primaryLight,
    "--primary-color-darker": PALETTE.dark.primaryDarker,
    "--secondary-color-default": PALETTE.dark.secondary,
    "--secondary-color-light": PALETTE.dark.secondaryLight,
    "--secondary-color-darker": PALETTE.dark.secondaryDarker,
    "--accent-color-default": PALETTE.dark.accent,
    "--card-color-default": PALETTE.dark.card,
    "--text-color-default": PALETTE.dark.text,
    "--text-sub-color-default": PALETTE.dark.subText,
  }),
};

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: PALETTE.light.card,
    primary: PALETTE.light.primary,
    text: PALETTE.light.text,
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: PALETTE.dark.card,
    primary: PALETTE.dark.primary,
    text: PALETTE.dark.text,
  },
};
