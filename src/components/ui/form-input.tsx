import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Image, ImageSource } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/hooks/use-app-theme";

type FormInputProps<T extends FieldValues> = Omit<
  TextInputProps,
  "value" | "onChangeText" | "style"
> & {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  icon?: ImageSource | number;
  /** Texte d'aide affiché sous le champ quand il n'y a pas d'erreur */
  hint?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Champ texte relié à react-hook-form : libellé, icône, état d'erreur et,
 * avec `secureTextEntry`, bouton afficher / masquer.
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  icon,
  hint,
  style,
  secureTextEntry,
  onFocus,
  onBlur,
  ...inputProps
}: FormInputProps<T>) {
  const { colors } = useAppTheme();
  const {
    field: { ref, value, onChange, onBlur: onFieldBlur },
    fieldState: { error },
  } = useController({ control, name });
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const styles = StyleSheet.create({
    wrapper: {
      width: "100%",
      marginBottom: 12,
    },
    label: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 14,
      color: colors.heading,
      marginBottom: 6,
      marginLeft: 2,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      height: 48,
      paddingHorizontal: 8,
    },
    inputFocused: {
      borderColor: colors.brand,
    },
    inputError: {
      borderColor: colors.error,
      backgroundColor: colors.errorLight,
    },
    icon: {
      height: 22,
      width: 22,
      marginHorizontal: 4,
    },
    input: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 15,
      color: colors.heading,
      flex: 1,
      height: "100%",
      paddingHorizontal: 8,
    },
    toggle: {
      padding: 6,
    },
    hint: {
      fontFamily: "Quicksand_500Medium",
      color: colors.muted,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    error: {
      fontFamily: "Quicksand_500Medium",
      color: colors.error,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
  });

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.label} importantForAccessibility="no">
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {icon && (
          <Image
            source={icon}
            style={styles.icon}
            contentFit="contain"
            accessible={false}
          />
        )}
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={colors.muted}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry && hidden}
          accessibilityLabel={label}
          accessibilityHint={error?.message ?? hint}
          aria-invalid={!!error}
          {...inputProps}
          value={value ?? ""}
          onChangeText={onChange}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onFieldBlur();
            onBlur?.(e);
          }}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setHidden((value) => !value)}
            style={styles.toggle}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              hidden ? "Afficher le mot de passe" : "Masquer le mot de passe"
            }
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>
      {error?.message ? (
        <Text
          style={styles.error}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error.message}
        </Text>
      ) : (
        hint && <Text style={styles.hint}>{hint}</Text>
      )}
    </View>
  );
}
