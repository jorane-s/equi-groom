import { Text, TextProps } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";
import { AppTheme } from "@/color-theme";
import { TEXT_VARIANTS, TextVariant } from "@/constants/typography";

type AppTextProps = TextProps & {
  /** Style typographique (police, taille), "body" par défaut */
  variant?: TextVariant;
  /** Couleur du thème, "heading" par défaut */
  color?: keyof AppTheme;
};

/**
 * Texte de l'app : applique la police et la couleur par défaut.
 * À utiliser à la place de `Text` ; `style` et `className` restent prioritaires.
 */
export function AppText({
  variant = "body",
  color = "heading",
  style,
  ...props
}: AppTextProps) {
  const { colors } = useAppTheme();

  return (
    <Text
      style={[TEXT_VARIANTS[variant], { color: colors[color] }, style]}
      {...props}
    />
  );
}
