import { StyleSheet, Text } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type FormAlertProps = {
  type?: "error" | "success";
  message: string;
};

/** Encadré de retour global d'un formulaire (erreur serveur, confirmation…) */
export function FormAlert({ type = "error", message }: FormAlertProps) {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    alert: {
      width: "100%",
      borderRadius: 12,
      padding: 12,
      marginTop: 10,
      fontFamily: "Quicksand_500Medium",
      fontSize: 14,
      textAlign: "center",
      color: type === "error" ? colors.error : colors.success,
      backgroundColor:
        type === "error" ? colors.errorLight : colors.successLight,
    },
  });

  return (
    <Text
      style={styles.alert}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {message}
    </Text>
  );
}
