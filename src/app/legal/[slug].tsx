import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAppTheme } from "@/hooks/use-app-theme";
import { LEGAL_DOCUMENTS, LegalSlug } from "@/constants/legal.constants";

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
      fontFamily: "Quicksand_500Medium",
      fontSize: 12,
      color: colors.muted,
      marginBottom: 20,
    },
    heading: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 17,
      color: colors.heading,
      marginTop: 16,
      marginBottom: 8,
    },
    paragraph: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 14,
      lineHeight: 21,
      color: colors.heading,
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
        <Text style={styles.paragraph}>Ce document n’existe pas.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: document.title }} />
      <Text style={styles.meta}>
        Version {document.version} – mise à jour le {document.updatedAt}
      </Text>

      {document.sections.map((section) => (
        <View key={section.heading}>
          <Text style={styles.heading} accessibilityRole="header">
            {section.heading}
          </Text>
          {section.paragraphs.map((paragraph) =>
            paragraph.startsWith("• ") ? (
              <View key={paragraph} style={styles.bullet}>
                <Text style={[styles.paragraph, styles.bulletMark]}>•</Text>
                <Text style={[styles.paragraph, { flex: 1 }]}>
                  {paragraph.slice(2)}
                </Text>
              </View>
            ) : (
              <Text key={paragraph} style={styles.paragraph}>
                {paragraph}
              </Text>
            ),
          )}
        </View>
      ))}
    </ScrollView>
  );
}
