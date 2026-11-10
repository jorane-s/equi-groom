import { Pressable, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/hooks/use-app-theme";
import { AppText } from "@/components/ui/app-text";

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
    },
    error: {
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
        <AppText
          variant="small"
          color="muted"
          style={styles.label}
          onPress={toggle}
        >
          {children}
        </AppText>
      </View>
      {error?.message && (
        <AppText
          variant="caption"
          color="error"
          style={styles.error}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error.message}
        </AppText>
      )}
    </View>
  );
}
