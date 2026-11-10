import { ScrollView, StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAppTheme } from "@/hooks/use-app-theme";
import { LEGAL_DOCUMENTS, LegalSlug } from "@/constants/legal.constants";
import { AppText } from "@/components/ui/app-text";

export function generateStaticParams(): { slug: LegalSlug }[] {
  return (Object.keys(LEGAL_DOCUMENTS) as LegalSlug[]).map((slug) => ({
    slug,
  }));
}

export default function LegalDocumentScreen() {
  const { colors } = useAppTheme();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const document = LEGAL_DOCUMENTS[slug as LegalSlug];

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      padding: 20,
      paddingBottom: 40,
    },
    meta: {
      marginBottom: 20,
    },
    heading: {
      marginTop: 16,
      marginBottom: 8,
    },
    paragraph: {
      marginBottom: 8,
    },
    bullet: {
      flexDirection: "row",
      paddingLeft: 8,
    },
    bulletMark: {
      width: 14,
    },
  });

  if (!document) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Document introuvable" }} />
        <AppText style={styles.paragraph}>Ce document n’existe pas.</AppText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: document.title }} />
      <AppText variant="caption" color="muted" style={styles.meta}>
        Version {document.version} – mise à jour le {document.updatedAt}
      </AppText>

      {document.sections.map((section) => (
        <View key={section.heading}>
          <AppText
            variant="h3"
            style={styles.heading}
            accessibilityRole="header"
          >
            {section.heading}
          </AppText>
          {section.paragraphs.map((paragraph) =>
            paragraph.startsWith("• ") ? (
              <View key={paragraph} style={styles.bullet}>
                <AppText style={[styles.paragraph, styles.bulletMark]}>
                  •
                </AppText>
                <AppText style={[styles.paragraph, { flex: 1 }]}>
                  {paragraph.slice(2)}
                </AppText>
              </View>
            ) : (
              <AppText key={paragraph} style={styles.paragraph}>
                {paragraph}
              </AppText>
            ),
          )}
        </View>
      ))}
    </ScrollView>
  );
}
