import { StyleSheet } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";
import { AppText } from "@/components/ui/app-text";

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
      textAlign: "center",
      backgroundColor:
        type === "error" ? colors.errorLight : colors.successLight,
    },
  });

  return (
    <AppText
      variant="small"
      color={type}
      style={styles.alert}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {message}
    </AppText>
  );
}
