import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/hooks/use-app-theme";

type FormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  accessibilityLabel: string;
  children: ReactNode;
};

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  accessibilityLabel,
  children,
}: FormCheckboxProps<T>) {
  const { colors } = useAppTheme();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  const checked = !!field.value;
  const toggle = () => field.onChange(!checked);

  const styles = StyleSheet.create({
    wrapper: {
      width: "100%",
      marginVertical: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    label: {
      flex: 1,
      fontFamily: "Quicksand_500Medium",
      fontSize: 13,
      lineHeight: 19,
      color: colors.muted,
    },
    error: {
      fontFamily: "Quicksand_500Medium",
      color: colors.error,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 34,
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Pressable
          onPress={toggle}
          hitSlop={8}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          accessibilityLabel={accessibilityLabel}
        >
          <Ionicons
            name={checked ? "checkbox" : "square-outline"}
            size={24}
            color={error ? colors.error : checked ? colors.brand : colors.muted}
          />
        </Pressable>
        <Text style={styles.label} onPress={toggle}>
          {children}
        </Text>
      </View>
      {error?.message && (
        <Text
          style={styles.error}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}
