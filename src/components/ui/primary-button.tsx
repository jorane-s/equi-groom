import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const { colors } = useAppTheme();
  const isDisabled = disabled || loading;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.brand,
      width: "100%",
      minHeight: 50,
      padding: 15,
      borderRadius: 12,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      fontFamily: "Fredoka_600SemiBold",
      color: "#FFFFFF",
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
