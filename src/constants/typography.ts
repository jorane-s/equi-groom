import { TextStyle } from "react-native";

// Polices chargées dans src/app/_layout.tsx (useFonts) — garder les deux listes
// synchronisées, ainsi que `fontFamily` dans tailwind.config.js.
export const FONTS = {
  title: "Fredoka_600SemiBold",
  titleLight: "Fredoka_300Light",
  body: "Quicksand_500Medium",
} as const;

// Avec une police personnalisée, ne pas utiliser `fontWeight` :
// chaque graisse est une police à part, changer de `fontFamily` à la place.
export const TEXT_VARIANTS = {
  h1: { fontFamily: FONTS.title, fontSize: 26 },
  h2: { fontFamily: FONTS.title, fontSize: 20 },
  h3: { fontFamily: FONTS.title, fontSize: 17 },
  label: { fontFamily: FONTS.title, fontSize: 14 },
  button: { fontFamily: FONTS.title, fontSize: 16 },
  link: { fontFamily: FONTS.titleLight, fontSize: 14 },
  body: { fontFamily: FONTS.body, fontSize: 15, lineHeight: 22 },
  small: { fontFamily: FONTS.body, fontSize: 13, lineHeight: 19 },
  caption: { fontFamily: FONTS.body, fontSize: 12 },
} satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof TEXT_VARIANTS;
