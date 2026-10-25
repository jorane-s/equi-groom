import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useAppTheme } from "@/hooks/use-app-theme";
import { LegalSlug } from "@/constants/legal.constants";

type LegalLinkProps = {
  slug: LegalSlug;
  children: string;
};

export function LegalLink({ slug, children }: LegalLinkProps) {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    link: {
      color: colors.brandDarker,
      textDecorationLine: "underline",
    },
  });

  return (
    <Link
      href={{ pathname: "/legal/[slug]", params: { slug } }}
      style={styles.link}
      accessibilityRole="link"
    >
      {children}
    </Link>
  );
}
